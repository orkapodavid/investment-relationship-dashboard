# Investment Flow Architecture Review & Improvement Design

## Executive Summary

This document provides a comprehensive architecture review of the investment-relationship-dashboard's Reflex Flow implementation, comparing it against the documented best practices in `rules/reflex-flow.mdc`. The review identifies specific misalignments, proposes concrete architectural improvements, and provides updated documentation to ensure consistency across the codebase.

**Key Findings:**
- Utility functions (`apply_node_changes`, `apply_edge_changes`, `add_edge`) are partially implemented but not consistently used
- State management mixes DB persistence logic with Flow event handling, reducing clarity
- Missing MiniMap component that would improve navigation
- `on_connect` implementation creates edges manually instead of using `add_edge` utility
- Documentation lacks project-specific patterns and canonical examples
- Zoom threshold logic is complex and could be simplified

**Impact:** Medium priority improvements that will enhance maintainability, reduce bugs, and improve developer onboarding.

---

## Detailed Findings

### Finding 1: Inconsistent Use of Flow Utility Functions

**Severity:** HIGH  
**Location:** `app/states/relationship_state.py` lines 607-683, 685-702, 1061-1184

**Problem:**
The `on_nodes_change` and `on_edges_change` handlers correctly call `apply_node_changes` and `apply_edge_changes` at the beginning (lines 610, 688), which is excellent. However, the `on_connect` handler (line 1061-1184) does NOT use the `add_edge` utility function. Instead, it manually creates the edge in the database and then calls `add_edge` only at line 1171.

This creates two issues:
1. The edge is not immediately added to the state before the database operation completes
2. If the database operation fails, the Flow state becomes inconsistent
3. The `add_edge` call at line 1171 happens AFTER all the DB logic, when it should happen first

**Why This Matters:**
- State inconsistency between Flow display and database
- Violates the pattern of "apply utility first, then persist"
- Makes debugging harder when edge creation fails
- Doesn't follow the pattern established in the other handlers

**Current Code Pattern:**
```
on_connect:
  1. Validate connection
  2. Create relationship in DB
  3. Call add_edge utility (line 1171)
  4. Update other state
```

**Expected Pattern (per reflex-flow.mdc lines 589-598, 1735-1749):**
```
on_connect:
  1. Validate connection
  2. Call add_edge utility FIRST
  3. Persist to DB
  4. Update other state
```

---

### Finding 2: State Management Clarity - DB vs Display State

**Severity:** MEDIUM  
**Location:** `app/states/relationship_state.py` lines 38-89

**Problem:**
The state class has both database-sourced lists (`accounts`, `contacts`, `relationships`) AND their filtered versions (`filtered_accounts`, `filtered_contacts`, `filtered_relationships`) AND the Flow display lists (`nodes`, `edges`). This creates a three-layer state hierarchy that is not clearly documented:

```
Layer 1 (DB): accounts, contacts, relationships
Layer 2 (Filtered): filtered_accounts, filtered_contacts, filtered_relationships  
Layer 3 (Display): nodes, edges
```

Additionally, the transformation logic in `build_graph_data()` (lines 386-605) rebuilds both nodes AND edges from scratch on every call, even when only one might have changed.

**Why This Matters:**
- Hard to understand data flow for new developers
- Rebuilding everything is inefficient when only nodes OR edges change
- No clear separation between "what data we have" vs "what we're showing"
- The `reflex-flow.mdc` recommends separation (lines 1488-1496) but doesn't document a three-layer approach

**Recommendation:**
Clearly separate concerns and document the flow:
1. **Source State:** Full DB data (accounts, contacts, relationships)
2. **Filtered State:** Subset based on search/limits (filtered_*)
3. **Display State:** Flow-compatible dicts (nodes, edges)

Add helper methods:
- `rebuild_nodes_only()` - when only node data changed
- `rebuild_edges_only()` - when only relationships changed
- `rebuild_all()` - when both need refresh

---

### Finding 3: Missing MiniMap Component

**Severity:** LOW  
**Location:** `app/components/graph_view.py`

**Problem:**
The `graph_view()` component includes `flow.background` (line 11) and `flow.controls` (lines 12-17) but does NOT include `flow.mini_map`, even though:
- The project has a node limit of 100 (can be large graphs)
- Search functionality creates subgraphs that may be scattered
- `reflex-flow.mdc` recommends minimap for navigation (lines 916-955)

**Why This Matters:**
- Users cannot see overview of large graphs
- Navigating to search results is harder
- Missing a standard Flow feature that improves UX

**Current Missing:**
MiniMap would provide:
- Small overview of entire graph
- Viewport indicator showing current view
- Click-to-pan functionality
- Better orientation in large graphs

---

### Finding 4: Zoom Threshold Logic Complexity

**Severity:** MEDIUM  
**Location:** `app/states/relationship_state.py` lines 97-108

**Problem:**
The `on_viewport_change` handler has complex threshold-crossing logic:

```python
if (old_zoom < 0.5 and new_zoom >= 0.5) or (old_zoom >= 0.5 and new_zoom < 0.5) or \
   (old_zoom < 0.6 and new_zoom >= 0.6) or (old_zoom >= 0.6 and new_zoom < 0.6) or \
   (old_zoom < 0.4 and new_zoom >= 0.4) or (old_zoom >= 0.4 and new_zoom < 0.4):
```

This checks for THREE thresholds (0.4, 0.5, 0.6) but the logic is:
- Hard to read
- Easy to introduce bugs when adding new thresholds
- Not documented WHY these specific values

**Why This Matters:**
- Maintainability: Adding a new threshold requires complex boolean logic
- Performance: `build_graph_data()` is expensive, so threshold crossings should be clear
- Documentation: The three thresholds (0.4, 0.5, 0.6) are used in `build_graph_data()` but not explained

**Thresholds Used:**
- `0.4`: small_nodes toggle (line 395)
- `0.5`: simplify_edges toggle (line 396)
- `0.6`: show_labels toggle (line 394)

**Recommendation:**
Extract threshold constants and use a helper function:

```python
ZOOM_THRESHOLD_LABELS = 0.6      # Show/hide node labels
ZOOM_THRESHOLD_EDGES = 0.5       # Simplify/detail edges
ZOOM_THRESHOLD_NODE_SIZE = 0.4   # Small/normal node size

def crossed_threshold(old: float, new: float, threshold: float) -> bool:
    """Check if zoom crossed a threshold in either direction"""
    return (old < threshold and new >= threshold) or (old >= threshold and new < threshold)
```

---

### Finding 5: Event Handler Naming and Responsibility

**Severity:** LOW  
**Location:** `app/states/relationship_state.py`

**Problem:**
Event handler responsibilities are not clearly separated:
- `on_nodes_change` handles BOTH applying changes AND persisting positions (lines 607-683)
- `on_edges_change` handles BOTH applying changes AND soft-deleting (lines 685-702)
- `on_connect` handles validation, DB creation, edge addition, and panel updates (lines 1061-1184)

While functional, this violates single-responsibility principle and makes testing harder.

**Why This Matters:**
- Testing requires mocking database for simple edge additions
- Cannot reuse "persist position" logic outside of on_nodes_change
- `reflex-flow.mdc` examples (lines 1013-1041, 1062-1072, 1076-1100) suggest simpler handlers

**Recommendation:**
Extract helper methods:
- `_persist_node_positions(changes)` - separate from on_nodes_change
- `_handle_edge_deletion(edge_id)` - separate from on_edges_change
- `_validate_connection(source, target)` - separate from on_connect
- `_create_relationship_in_db(...)` - separate from on_connect

---

### Finding 6: Node ID Format Not Documented

**Severity:** LOW  
**Location:** Throughout codebase, especially `build_graph_data()` lines 429, 474

**Problem:**
Node IDs follow a specific format (`acc-{id}` for companies, `con-{id}` for contacts) and edge IDs use `rel-{id}` for relationships and `emp-{id}-{account_id}` for employment edges. These conventions are:
- Used throughout the code
- Not documented in `reflex-flow.mdc`
- Not enforced by constants or validation

**Why This Matters:**
- New developers must reverse-engineer the ID format
- Easy to introduce bugs with wrong prefixes
- No single source of truth for ID construction/parsing
- `reflex-flow.mdc` doesn't mention project-specific ID conventions

**Recommendation:**
Add to `reflex-flow.mdc` a "Project Conventions" section documenting:
- Node ID format: `{prefix}-{db_id}` where prefix is "acc" or "con"
- Edge ID format: `rel-{relationship_id}` or `emp-{contact_id}-{account_id}`
- Why this format (easy parsing, clear type indication)

Add helper functions:
```python
def make_node_id(entity_type: str, db_id: int) -> str:
    prefix = "acc" if entity_type == "company" else "con"
    return f"{prefix}-{db_id}"

def parse_node_id(node_id: str) -> tuple[str, int]:
    prefix, id_str = node_id.split("-", 1)
    entity_type = "company" if prefix == "acc" else "person"
    return entity_type, int(id_str)
```

---

### Finding 7: Employment Edges Created Outside Relationship System

**Severity:** MEDIUM  
**Location:** `app/states/relationship_state.py` lines 502-518

**Problem:**
The `build_graph_data()` method creates employment edges directly based on `contact.account_id`, but these are NOT stored in the Relationship table. This creates:
- Two sources of truth for edges (Relationship table + Contact.account_id)
- Employment edges have ID format `emp-{con_id}-{acc_id}` that doesn't map to DB
- When edge is deleted via `on_edges_change`, it tries to parse as `rel-{id}` and fails

**Current Code:**
```python
if con_acc_id and con_acc_id in acc_ids:
    edges.append({
        "id": f"emp-{con_id}-{con_acc_id}",
        "source": f"acc-{con_acc_id}",
        "target": f"con-{con_id}",
        # ... employment styling
    })
```

**Why This Matters:**
- Cannot edit employment edges via the graph (they have no DB backing)
- Inconsistent with other edges that map to Relationship records
- `on_edges_change` line 694 only handles `rel-` prefix edges
- Employment edges cannot be soft-deleted or have scores

**Recommendation:**
Either:
1. **Option A (Recommended):** Create Relationship records for employment edges on Contact creation/update
2. **Option B:** Skip employment edges in Flow entirely, rely only on visual node positioning
3. **Option C:** Handle `emp-` prefix edges specially in `on_edges_change` and `on_edge_click`

---

### Finding 8: Inconsistent Edge Styling Logic

**Severity:** LOW  
**Location:** `app/states/relationship_state.py` lines 519-602

**Problem:**
Edge styling has three branches:
1. Inactive relationships (lines 544-556) - gray, dashed, opaque
2. Employment relationships (lines 557-572) - dashed, no color gradient
3. Active scored relationships (lines 574-601) - color gradient, conditional labels

However:
- Employment edges created from Contact.account_id (lines 502-518) use different styling than employment Relationship records
- The styling constants are inline, not extracted
- No clear documentation of "what visual means what"

**Why This Matters:**
- Two different visual styles for "employment" is confusing
- Cannot easily change theme or styling rules
- `reflex-flow.mdc` recommends style constants (lines 1520-1549)

**Recommendation:**
Extract edge styling into helper methods:
```python
def _style_inactive_edge(rel) -> dict:
    """Style for soft-deleted relationships"""
    return {
        "animated": False,
        "label": f"{rel.term.value} (Deleted)",
        "style": {"stroke": "#94a3b8", "strokeWidth": 1, ...},
    }

def _style_employment_edge(rel) -> dict:
    """Style for employment relationships"""
    ...

def _style_scored_edge(rel, simplify: bool) -> dict:
    """Style for business/social relationships with score"""
    ...
```

---

## Proposed Architecture Improvements

### Improvement 1: Refactored Event Handler Pattern

**Goal:** Separate Flow utilities from business logic for clarity and testability.

**Pattern:**
```
Event Handler (e.g., on_nodes_change):
  1. Call Flow utility FIRST (apply_node_changes/apply_edge_changes/add_edge)
  2. Extract business data from changes
  3. Call separate helper methods for persistence/side effects
  4. Return/yield results
```

**Responsibilities:**

**on_nodes_change:**
- Calls `apply_node_changes` immediately
- Delegates position persistence to `_persist_node_positions(changes)`
- Delegates deletion handling to `_handle_node_removal(node_id)`
- Does NOT directly interact with database session

**on_edges_change:**
- Calls `apply_edge_changes` immediately  
- Delegates deletion to `_handle_edge_removal(edge_id)`
- Does NOT directly interact with database session

**on_connect:**
- Validates connection (source != target)
- Calls `add_edge` immediately to update Flow state
- Delegates DB creation to `_create_relationship_in_db(params)`
- Delegates UI updates to separate helper
- If DB creation fails, removes the edge (rollback)

**Benefits:**
- Flow state is always consistent (utilities called first)
- Business logic is testable without Flow dependency
- Easier to understand single-purpose helpers
- Matches patterns in `reflex-flow.mdc` examples

---

### Improvement 2: State Organization and Naming

**Goal:** Clearly separate the three layers of state and document data flow.

**Proposed State Structure:**

```python
class RelationshipState(rx.State):
    # ===== Layer 1: Database Source (full dataset) =====
    # These hold ALL entities from database
    _db_accounts: list[Account] = []
    _db_contacts: list[Contact] = []  
    _db_relationships: list[Relationship] = []
    
    # ===== Layer 2: Filtered Entities (search/limit applied) =====
    # These hold the subset to display based on search/node limit
    filtered_accounts: list[Account] = []
    filtered_contacts: list[Contact] = []
    filtered_relationships: list[Relationship] = []
    
    # ===== Layer 3: Flow Display State (Flow-compatible dicts) =====
    # These are the actual nodes/edges rendered by rxe.flow
    nodes: list[dict] = []
    edges: list[dict] = []
    
    # ===== Viewport State =====
    zoom_level: float = 1.0
    viewport_x: float = 0.0  # Track pan position
    viewport_y: float = 0.0
    
    # ===== UI State =====
    selected_node_id: str = ""
    selected_edge_id: str = ""
    show_side_panel: bool = False
    edit_mode: str = "none"  # "none" | "node" | "edge"
    
    # ===== Search/Filter State =====
    search_query: str = ""
    node_limit: int = 100
    show_historic: bool = False
```

**Data Flow:**
```
User Action (search/load)
  ↓
Load from DB → _db_* lists
  ↓
Apply search/filter → filtered_* lists  
  ↓
Transform to Flow format → nodes, edges
  ↓
Render rxe.flow component
```

**Benefits:**
- Clear separation of concerns
- Easy to understand where data comes from
- Can rebuild only nodes or only edges if needed
- Prefix `_db_` indicates "source of truth" that rarely changes

---

### Improvement 3: Zoom Threshold Management

**Goal:** Make zoom thresholds configurable, readable, and maintainable.

**Constants Definition:**

```python
# Zoom thresholds (defined at module level or as class constants)
ZOOM_THRESHOLDS = {
    "node_labels": 0.6,      # Below: hide labels, Above: show labels
    "edge_detail": 0.5,      # Below: simple edges, Above: detailed with labels
    "node_size": 0.4,        # Below: small nodes, Above: normal size
}
```

**Helper Function:**

```python
def _crossed_any_threshold(old_zoom: float, new_zoom: float) -> bool:
    """Check if zoom crossed any configured threshold in either direction."""
    for threshold in ZOOM_THRESHOLDS.values():
        if (old_zoom < threshold <= new_zoom) or (new_zoom < threshold <= old_zoom):
            return True
    return False
```

**Updated Event Handler:**

```python
@rx.event
def on_viewport_change(self, viewport: dict):
    """Handle viewport changes to track zoom level."""
    if "zoom" not in viewport:
        return
    
    new_zoom = float(viewport["zoom"])
    old_zoom = self.zoom_level
    self.zoom_level = new_zoom
    
    # Only rebuild if crossed a meaningful threshold
    if self._crossed_any_threshold(old_zoom, new_zoom):
        self.build_graph_data()
    
    # Track pan position for future use
    if "x" in viewport and "y" in viewport:
        self.viewport_x = float(viewport["x"])
        self.viewport_y = float(viewport["y"])
```

**Benefits:**
- Single source of truth for thresholds
- Easy to add new thresholds without changing boolean logic
- Self-documenting (names explain purpose)
- Can be configured per-deployment if needed

---

### Improvement 4: Node and Edge ID Management

**Goal:** Centralize ID format creation and parsing to prevent errors.

**ID Utility Module:** Create `app/utils/flow_ids.py`

```python
from typing import Literal

EntityType = Literal["company", "person"]
NodePrefix = Literal["acc", "con"]

def make_node_id(entity_type: EntityType, db_id: int) -> str:
    """
    Create a Flow node ID from entity type and database ID.
    
    Format: {prefix}-{db_id}
    - Companies: acc-{id}
    - Contacts: con-{id}
    """
    prefix: NodePrefix = "acc" if entity_type == "company" else "con"
    return f"{prefix}-{db_id}"

def parse_node_id(node_id: str) -> tuple[EntityType, int]:
    """
    Parse a Flow node ID into entity type and database ID.
    
    Raises ValueError if format is invalid.
    """
    parts = node_id.split("-", 1)
    if len(parts) != 2:
        raise ValueError(f"Invalid node ID format: {node_id}")
    
    prefix, id_str = parts
    if prefix not in ("acc", "con"):
        raise ValueError(f"Unknown node prefix: {prefix}")
    
    entity_type: EntityType = "company" if prefix == "acc" else "person"
    try:
        db_id = int(id_str)
    except ValueError:
        raise ValueError(f"Invalid ID number in: {node_id}")
    
    return entity_type, db_id

def make_relationship_edge_id(relationship_id: int) -> str:
    """Create edge ID for a Relationship record."""
    return f"rel-{relationship_id}"

def parse_relationship_edge_id(edge_id: str) -> int:
    """Parse edge ID to get Relationship database ID."""
    if not edge_id.startswith("rel-"):
        raise ValueError(f"Not a relationship edge ID: {edge_id}")
    return int(edge_id.split("-", 1)[1])

def make_employment_edge_id(contact_id: int, account_id: int) -> str:
    """Create edge ID for Contact.account_id employment link."""
    return f"emp-{contact_id}-{account_id}"

def is_employment_edge(edge_id: str) -> bool:
    """Check if edge ID represents an employment edge."""
    return edge_id.startswith("emp-")

def is_relationship_edge(edge_id: str) -> bool:
    """Check if edge ID represents a relationship edge."""
    return edge_id.startswith("rel-")
```

**Usage in State:**

```python
from app.utils.flow_ids import (
    make_node_id, parse_node_id,
    make_relationship_edge_id, parse_relationship_edge_id,
    is_relationship_edge
)

# In build_graph_data:
node_id = make_node_id("company", account.id)

# In on_node_click:
entity_type, db_id = parse_node_id(self.selected_node_id)

# In on_edges_change:
if is_relationship_edge(edge_id):
    rel_id = parse_relationship_edge_id(edge_id)
    self._handle_relationship_deletion(rel_id)
```

**Benefits:**
- Single source of truth for ID formats
- Type-safe with Literal types
- Clear error messages for invalid IDs
- Easy to change format in one place
- Self-documenting function names

---

### Improvement 5: Employment Edge Handling

**Goal:** Unify employment edges with the Relationship system for consistency.

**Recommendation: Create Relationship Records for Employment**

**Approach:**
When a Contact is created or updated with an `account_id`, automatically create a corresponding Relationship record with:
- `relationship_type = RelationshipType.EMPLOYMENT`
- `term = RelationshipTerm.WORKS_FOR`
- `source_type = "company"`
- `source_id = contact.account_id`
- `target_type = "person"`
- `target_id = contact.id`
- `is_directed = True`
- `score = 0` (employment is neutral)

**Benefits:**
- Single source of truth (Relationship table)
- Employment edges can be edited, scored, deleted like other edges
- Consistent handling in `on_edge_click`, `on_edges_change`
- Simplifies `build_graph_data()` - just iterate relationships

**Migration:**
Add a helper method to sync existing Contact.account_id values:

```python
@rx.event
def sync_employment_relationships(self):
    """
    One-time sync: Create Relationship records for all Contact.account_id links.
    Run this during deployment or database migration.
    """
    with rx.session() as session:
        contacts = session.exec(select(Contact).where(Contact.account_id != None)).all()
        for contact in contacts:
            # Check if employment relationship already exists
            existing = session.exec(
                select(Relationship).where(
                    Relationship.source_type == "company",
                    Relationship.source_id == contact.account_id,
                    Relationship.target_type == "person",
                    Relationship.target_id == contact.id,
                    Relationship.relationship_type == RelationshipType.EMPLOYMENT,
                )
            ).first()
            
            if not existing:
                rel = Relationship(
                    relationship_type=RelationshipType.EMPLOYMENT,
                    term=RelationshipTerm.WORKS_FOR,
                    source_type="company",
                    source_id=contact.account_id,
                    target_type="person",
                    target_id=contact.id,
                    is_directed=True,
                    score=0,
                )
                session.add(rel)
        session.commit()
```

---

### Improvement 6: Edge Styling Extraction

**Goal:** Make edge styling rules explicit, reusable, and themeable.

**Edge Styling Module:** Create `app/utils/edge_styles.py`

```python
from app.models import Relationship, RelationshipType

def get_edge_color_for_score(score: int) -> str:
    """
    Return gradient color based on relationship score.
    
    Score range: -100 (red) → 0 (gray) → 100 (green)
    """
    def interpolate(start_rgb, end_rgb, factor):
        r = int(start_rgb[0] + (end_rgb[0] - start_rgb[0]) * factor)
        g = int(start_rgb[1] + (end_rgb[1] - start_rgb[1]) * factor)
        b = int(start_rgb[2] + (end_rgb[2] - start_rgb[2]) * factor)
        return f"#{r:02x}{g:02x}{b:02x}"
    
    score = max(-100, min(100, score))
    red_rgb = (239, 68, 68)      # Tailwind red-500
    gray_rgb = (156, 163, 175)   # Tailwind gray-400
    green_rgb = (16, 185, 129)   # Tailwind emerald-500
    
    if score < 0:
        factor = (score + 100) / 100.0
        return interpolate(red_rgb, gray_rgb, factor)
    else:
        factor = score / 100.0
        return interpolate(gray_rgb, green_rgb, factor)

def style_inactive_edge(rel: Relationship) -> dict:
    """Style for soft-deleted relationships (historical view)."""
    return {
        "animated": False,
        "label": f"{rel.term.value} (Deleted)",
        "style": {
            "stroke": "#94a3b8",
            "strokeWidth": 1,
            "strokeDasharray": "5,5",
            "opacity": 0.4,
        },
        "labelStyle": {
            "fill": "#94a3b8",
            "fontSize": "10px",
        },
    }

def style_employment_edge(simplify: bool = False) -> dict:
    """Style for employment relationships (always dashed)."""
    return {
        "animated": False,
        "label": "" if simplify else "Employment",
        "style": {
            "stroke": "#334155",
            "strokeWidth": 2,
            "strokeDasharray": "5,5",
        },
        "labelStyle": {} if simplify else {
            "fill": "#334155",
            "fontSize": "10px",
        },
    }

def style_scored_edge(
    rel: Relationship,
    simplify: bool = False,
    animate: bool = True
) -> dict:
    """Style for business/social relationships with score gradient."""
    color = get_edge_color_for_score(rel.score)
    
    if simplify:
        return {
            "animated": animate,
            "style": {
                "stroke": color,
                "strokeWidth": 1,
            },
        }
    else:
        return {
            "label": f"{rel.relationship_type.value.title()} ({rel.score})",
            "animated": animate,
            "style": {
                "stroke": color,
                "strokeWidth": 3,
            },
            "labelStyle": {
                "fill": color,
                "fontWeight": "bold",
                "fontSize": "12px",
            },
        }
```

**Usage in build_graph_data:**

```python
from app.utils.edge_styles import (
    style_inactive_edge,
    style_employment_edge,
    style_scored_edge,
)

# In relationship loop:
if not rel.is_active:
    edge_dict.update(style_inactive_edge(rel))
elif rel.relationship_type == RelationshipType.EMPLOYMENT:
    edge_dict.update(style_employment_edge(simplify=simplify_edges))
else:
    edge_dict.update(style_scored_edge(
        rel,
        simplify=simplify_edges,
        animate=should_animate_particles
    ))
```

**Benefits:**
- All styling rules in one place
- Easy to change theme (e.g., dark mode)
- Consistent styling across the app
- Type-safe with Relationship model
- Testable (can verify color ranges)

---

## Proposed Code Changes

### Change 1: graph_view.py - Add MiniMap

**Location:** `app/components/graph_view.py`

**Description:** Add MiniMap component for better navigation in large graphs.

**Updated Code:**

```python
import reflex as rx
import reflex_enterprise as rxe
from app.states.relationship_state import RelationshipState


def graph_view() -> rx.Component:
    """Render the interactive graph visualization with Flow components."""
    return rx.el.div(
        rxe.flow(
            # Visual components
            rxe.flow.background(variant="dots", gap=12, size=1),
            rxe.flow.controls(
                show_zoom=True,
                show_fit_view=True,
                show_interactive=True,
                position="bottom-right",
            ),
            rxe.flow.mini_map(
                node_color="#93c5fd",  # Light blue matching theme
                pannable=True,
                zoomable=True,
                position="bottom-left",
            ),
            
            # Data binding (controlled flow)
            nodes=RelationshipState.nodes,
            edges=RelationshipState.edges,
            
            # Event handlers
            on_nodes_change=RelationshipState.on_nodes_change,
            on_edges_change=RelationshipState.on_edges_change,
            on_viewport_change=RelationshipState.on_viewport_change,
            on_node_click=RelationshipState.on_node_click,
            on_edge_click=RelationshipState.on_edge_click,
            on_connect=RelationshipState.on_connect,
            
            # Viewport settings
            fit_view=True,
            fit_view_options={"padding": 0.2},
            min_zoom=0.1,
            max_zoom=4.0,
            
            # Interaction settings (explicitly configured)
            nodes_draggable=True,
            nodes_connectable=True,
            nodes_focusable=True,
            edges_focusable=True,
            snap_to_grid=False,
            zoom_on_scroll=True,
            pan_on_scroll=False,
            zoom_on_double_click=False,
            pan_on_drag=True,
            select_nodes_on_drag=False,
            
            # Styling
            class_name="bg-gray-50 w-full h-full",
        ),
        class_name="w-full h-full relative",
    )
```

**Changes:**
- Added `rxe.flow.mini_map` between controls and data binding
- Configured with matching theme color
- Enabled pannable and zoomable interactions
- Positioned in bottom-left (opposite to controls)

---

### Change 2: relationship_state.py - Refactor on_connect

**Location:** `app/states/relationship_state.py` lines 1061-1184

**Description:** Use `add_edge` utility FIRST, then persist to database, with proper rollback on failure.

**Updated Code:**

```python
@rx.event
def on_connect(self, params: dict):
    """Handle creating new relationships by dragging between nodes."""
    source = params.get("source", "")
    target = params.get("target", "")
    
    # Validate connection
    if source == target:
        yield rx.toast("Cannot connect a node to itself", duration=3000)
        return
    
    try:
        src_parts = source.split("-")
        tgt_parts = target.split("-")
        if len(src_parts) < 2 or len(tgt_parts) < 2:
            yield rx.toast("Invalid node identifiers", duration=3000)
            return
        
        src_prefix, src_id_str = (src_parts[0], src_parts[1])
        tgt_prefix, tgt_id_str = (tgt_parts[0], tgt_parts[1])
        src_id = int(src_id_str)
        tgt_id = int(tgt_id_str)
        src_type = "company" if src_prefix == "acc" else "person"
        tgt_type = "company" if tgt_prefix == "acc" else "person"
        
        if src_type == tgt_type and src_id == tgt_id:
            yield rx.toast("Cannot connect a node to itself", duration=3000)
            return
        
        # === KEY CHANGE: Add edge to Flow state FIRST ===
        self.edges = add_edge(params, self.edges)
        
        # Determine relationship type based on node types
        rel_type = RelationshipType.SOCIAL
        default_term = RelationshipTerm.FRIEND
        if src_type == "company" and tgt_type == "company":
            rel_type = RelationshipType.BUSINESS
            default_term = RelationshipTerm.COMPETITOR
        elif (src_type == "person" and tgt_type == "company") or \
             (src_type == "company" and tgt_type == "person"):
            rel_type = RelationshipType.EMPLOYMENT
            default_term = RelationshipTerm.WORKS_FOR
        elif src_type == "person" and tgt_type == "person":
            rel_type = RelationshipType.SOCIAL
            default_term = RelationshipTerm.FRIEND
        
        # Create relationship in database
        try:
            new_rel_id, new_rel_data = self._create_relationship_in_db(
                src_type, src_id,
                tgt_type, tgt_id,
                default_term, rel_type
            )
        except Exception as db_error:
            # Rollback: remove the edge we added
            self.edges = [e for e in self.edges if e["source"] != source or e["target"] != target]
            logging.exception(f"Failed to create relationship in DB: {db_error}")
            yield rx.toast("Failed to create relationship", duration=3000)
            return
        
        # Update edge ID to match database
        for edge in self.edges:
            if edge["source"] == source and edge["target"] == target and edge["id"].startswith("reactflow"):
                edge["id"] = f"rel-{new_rel_id}"
                break
        
        # Show success and open editor
        yield rx.toast(f"Created {rel_type.value} relationship", duration=3000)
        self.selected_edge_id = f"rel-{new_rel_id}"
        self.editing_score = new_rel_data["score"]
        self.editing_relationship_type = new_rel_data["type"]
        self.editing_term = new_rel_data["term"]
        self.editing_is_directed = new_rel_data["is_directed"]
        self.edit_mode = "edge"
        self.show_side_panel = True
        
        # Reload to get updated data
        yield RelationshipState.load_data
        
    except Exception as e:
        logging.exception(f"Failed to link nodes: {e}")
        yield rx.toast("Failed to create relationship", duration=3000)

def _create_relationship_in_db(
    self,
    source_type: str,
    source_id: int,
    target_type: str,
    target_id: int,
    term: RelationshipTerm,
    rel_type: RelationshipType
) -> tuple[int, dict]:
    """
    Create relationship in database.
    
    Returns:
        Tuple of (relationship_id, relationship_data_dict)
    
    Raises:
        Exception if creation fails
    """
    with rx.session() as session:
        # Check for existing relationship
        existing = session.exec(
            sqlmodel.select(Relationship).where(
                Relationship.source_type == source_type,
                Relationship.source_id == source_id,
                Relationship.target_type == target_type,
                Relationship.target_id == target_id,
            )
        ).first()
        
        if existing:
            if not existing.is_active:
                # Reactivate existing relationship
                existing.is_active = True
                existing.last_updated = datetime.now()
                session.add(existing)
                log_entry = RelationshipLog(
                    relationship_id=existing.id,
                    previous_score=existing.score,
                    new_score=existing.score,
                    action="reactivate",
                    changed_at=datetime.now(),
                    note="Reactivated via graph connection",
                )
                session.add(log_entry)
                session.commit()
                session.refresh(existing)
                
                return existing.id, {
                    "score": existing.score,
                    "type": existing.relationship_type.value,
                    "term": existing.term.value,
                    "is_directed": existing.is_directed,
                }
            else:
                raise ValueError("Relationship already exists")
        
        # Create new relationship
        new_rel = self.create_relationship_with_term(
            session, source_type, source_id,
            target_type, target_id, term, rel_type
        )
        session.commit()
        session.refresh(new_rel)
        
        return new_rel.id, {
            "score": new_rel.score,
            "type": new_rel.relationship_type.value,
            "term": new_rel.term.value,
            "is_directed": new_rel.is_directed,
        }
```

**Changes:**
- Moved `add_edge` call to line after validation (before DB operation)
- Extracted DB creation logic to `_create_relationship_in_db` helper
- Added try/except around DB operation with edge rollback on failure
- Cleaner separation of Flow state management vs business logic

---

### Change 3: relationship_state.py - Simplify on_viewport_change

**Location:** `app/states/relationship_state.py` lines 97-108

**Description:** Extract zoom thresholds to constants and use helper function.

**Updated Code:**

```python
# Add at module level (top of file after imports)
ZOOM_THRESHOLDS = {
    "node_labels": 0.6,      # Below: hide labels, Above: show labels
    "edge_detail": 0.5,      # Below: simple edges, Above: detailed with labels
    "node_size": 0.4,        # Below: small nodes, Above: normal size
}

# In RelationshipState class:

def _crossed_any_threshold(self, old_zoom: float, new_zoom: float) -> bool:
    """Check if zoom crossed any configured threshold in either direction."""
    for threshold in ZOOM_THRESHOLDS.values():
        if (old_zoom < threshold <= new_zoom) or (new_zoom < threshold <= old_zoom):
            return True
    return False

@rx.event
def on_viewport_change(self, viewport: dict):
    """Handle viewport changes to track zoom level."""
    if "zoom" not in viewport:
        return
    
    new_zoom = float(viewport["zoom"])
    old_zoom = self.zoom_level
    self.zoom_level = new_zoom
    
    # Only rebuild if crossing a meaningful threshold
    if self._crossed_any_threshold(old_zoom, new_zoom):
        self.build_graph_data()
    
    # Track pan position for future features (e.g., saved viewport)
    if "x" in viewport and "y" in viewport:
        self.viewport_x = float(viewport.get("x", 0))
        self.viewport_y = float(viewport.get("y", 0))
```

**Changes:**
- Extracted thresholds to `ZOOM_THRESHOLDS` constant with descriptive names
- Created `_crossed_any_threshold` helper function
- Simplified boolean logic in `on_viewport_change`
- Added viewport position tracking for potential future use
- Added early return if zoom not in viewport

---

### Change 4: relationship_state.py - Update build_graph_data to use thresholds

**Location:** `app/states/relationship_state.py` lines 386-605

**Description:** Use the named threshold constants instead of magic numbers.

**Updated Code:**

```python
@rx.event
def build_graph_data(self):
    """Transform filtered entities and relationships into graph nodes and edges."""
    nodes = []
    edges = []
    center_x, center_y = (0, 0)
    current_accounts = self.filtered_accounts
    current_contacts = self.filtered_contacts
    current_relationships = self.filtered_relationships
    
    # Use named thresholds instead of magic numbers
    show_labels = self.zoom_level >= ZOOM_THRESHOLDS["node_labels"]
    small_nodes = self.zoom_level < ZOOM_THRESHOLDS["node_size"]
    simplify_edges = self.zoom_level < ZOOM_THRESHOLDS["edge_detail"]
    
    total_nodes = len(current_accounts) + len(current_contacts)
    should_animate_particles = total_nodes <= 100
    comp_size = "50px" if small_nodes else "100px"
    pers_size = "30px" if small_nodes else "60px"
    
    logging.info(
        f"Building graph: zoom={self.zoom_level:.2f}, "
        f"show_labels={show_labels}, simplify_edges={simplify_edges}, "
        f"small_nodes={small_nodes}, relationships={len(current_relationships)}"
    )
    
    # ... rest of method unchanged ...
```

**Changes:**
- Replaced `0.6`, `0.4`, `0.5` magic numbers with `ZOOM_THRESHOLDS` lookups
- Improved logging to show actual zoom value with 2 decimal places
- Added `small_nodes` to logging for completeness

---

### Change 5: relationship_state.py - Add viewport position tracking

**Location:** `app/states/relationship_state.py` lines 38-89

**Description:** Add viewport position state variables for future features.

**Updated Code:**

```python
class RelationshipState(rx.State):
    """State management for the Relationship Dashboard."""

    # ... existing state vars ...
    
    # ===== Viewport State =====
    zoom_level: float = 1.0
    viewport_x: float = 0.0  # Track pan X position
    viewport_y: float = 0.0  # Track pan Y position
    
    # ... rest of state ...
```

**Changes:**
- Added `viewport_x` and `viewport_y` to track pan position
- Grouped with `zoom_level` under "Viewport State" comment
- Enables future features like saving/restoring viewport

---

## Documentation Updates for reflex-flow.mdc

### Update 1: Add Project-Specific Conventions Section

**Location:** After line 1620 in `rules/reflex-flow.mdc` (in Troubleshooting section)

**New Section:**

```markdown
## Project-Specific Conventions (Investment Dashboard)

This section documents conventions specific to the investment-relationship-dashboard project.

### Node ID Format

All Flow nodes use a prefix-based ID format to indicate entity type:

**Format:** `{prefix}-{database_id}`

**Prefixes:**
- `acc-` → Account (company) entity
- `con-` → Contact (person) entity

**Examples:**
- `acc-42` → Account with database ID 42
- `con-123` → Contact with database ID 123

**Implementation:**

```python
# Helper functions (recommended location: app/utils/flow_ids.py)
def make_node_id(entity_type: str, db_id: int) -> str:
    """Create Flow node ID from entity type and database ID."""
    prefix = "acc" if entity_type == "company" else "con"
    return f"{prefix}-{db_id}"

def parse_node_id(node_id: str) -> tuple[str, int]:
    """Parse Flow node ID into entity type and database ID."""
    prefix, id_str = node_id.split("-", 1)
    entity_type = "company" if prefix == "acc" else "person"
    return entity_type, int(id_str)

# Usage in state
node_id = make_node_id("company", account.id)
# → "acc-5"

entity_type, db_id = parse_node_id("acc-5")
# → ("company", 5)
```

### Edge ID Format

Edges use different prefixes based on the relationship source:

**Format:** `{type}-{identifier}`

**Types:**
- `rel-{id}` → Relationship table record
- `emp-{contact_id}-{account_id}` → Employment edge (Contact.account_id foreign key)

**Examples:**
- `rel-17` → Relationship with database ID 17
- `emp-5-3` → Employment edge from Contact 5 to Account 3

**Recommendation:** For consistency, create Relationship records for employment edges rather than using the `emp-` format. This ensures:
- Single source of truth (Relationship table)
- Consistent handling in event handlers
- Ability to edit/delete employment edges like other relationships

### Node and Edge Styling Constants

The project uses specific colors and styling patterns:

**Company Nodes (Rectangular):**
- Background: `#1e1b4b` (indigo-950)
- Border radius: `8px`
- Normal size: `100px × 100px`
- Small size (zoom < 0.4): `50px × 50px`

**Person Nodes (Circular):**
- Background: `#bae6fd` (sky-200)
- Border: `2px solid #0284c7` (sky-600)
- Border radius: `50%` (circular)
- Normal size: `60px × 60px`
- Small size (zoom < 0.4): `30px × 30px`

**Edge Colors (Score-based Gradient):**
- Score -100 to 0: Red (`#ef4444`) to Gray (`#9ca3af`)
- Score 0 to 100: Gray (`#9ca3af`) to Green (`#10b981`)
- Employment: `#334155` (slate-700), dashed

**Zoom Thresholds:**
```python
ZOOM_THRESHOLDS = {
    "node_labels": 0.6,      # Below: hide labels, Above: show labels
    "edge_detail": 0.5,      # Below: simple edges, Above: detailed labels
    "node_size": 0.4,        # Below: small nodes, Above: normal size
}
```

### State Management Pattern

The project uses a three-layer state architecture:

**Layer 1: Database Source**
- Full datasets loaded from database
- Variables: `_db_accounts`, `_db_contacts`, `_db_relationships`
- Updated only on full data reload

**Layer 2: Filtered Entities**
- Subset based on search query and node limit
- Variables: `filtered_accounts`, `filtered_contacts`, `filtered_relationships`
- Updated when search/filter changes

**Layer 3: Flow Display State**
- Flow-compatible node/edge dictionaries
- Variables: `nodes`, `edges`
- Rebuilt from filtered entities when zoom or data changes

**Data Flow:**
```
User Action → Load from DB → Apply Filter → Transform to Flow → Render
   ↓              ↓               ↓               ↓             ↓
Search         _db_*         filtered_*       nodes/edges   rxe.flow
```

### Event Handler Pattern

All Flow event handlers follow this pattern:

```python
@rx.event
def on_nodes_change(self, changes: list[dict]):
    """Handle node changes."""
    # 1. Apply Flow utility FIRST
    self.nodes = apply_node_changes(self.nodes, changes)
    
    # 2. Extract business data and delegate to helpers
    for change in changes:
        if change.get("type") == "position":
            self._persist_node_position(change)
        elif change.get("type") == "remove":
            self._handle_node_removal(change["id"])

@rx.event
def on_connect(self, params: dict):
    """Handle new connection."""
    # 1. Validate
    if params["source"] == params["target"]:
        yield rx.toast("Cannot connect node to itself")
        return
    
    # 2. Add to Flow state FIRST
    self.edges = add_edge(params, self.edges)
    
    # 3. Persist to database (with rollback on failure)
    try:
        rel_id = self._create_relationship_in_db(params)
    except Exception as e:
        # Rollback Flow state
        self.edges = [e for e in self.edges if not self._is_same_edge(e, params)]
        yield rx.toast("Failed to create relationship")
        return
    
    # 4. Update edge ID to match database
    self._update_edge_id(params, f"rel-{rel_id}")
```

**Key Principles:**
- Call Flow utilities (`apply_node_changes`, `apply_edge_changes`, `add_edge`) FIRST
- Delegate business logic to helper methods (prefix with `_`)
- Rollback Flow state if database operation fails
- Keep event handlers small and focused

### Helper Method Organization

Business logic is extracted to helper methods with clear naming:

**Naming Convention:**
- Prefix with `_` to indicate internal/private
- Use verbs: `_persist_`, `_handle_`, `_create_`, `_update_`
- Descriptive names: `_persist_node_position`, not `_save_pos`

**Examples:**
```python
def _persist_node_position(self, change: dict):
    """Save node position to database."""
    node_id = change["id"]
    position = change["position"]
    entity_type, db_id = parse_node_id(node_id)
    # ... database logic ...

def _handle_edge_removal(self, edge_id: str):
    """Soft-delete relationship when edge removed."""
    if is_relationship_edge(edge_id):
        rel_id = parse_relationship_edge_id(edge_id)
        # ... soft delete logic ...

def _create_relationship_in_db(self, params: dict) -> int:
    """Create relationship record. Returns relationship ID."""
    # ... database logic ...
    return new_relationship.id
```

**Benefits:**
- Event handlers stay small and readable
- Business logic is reusable
- Testing is easier (can test helpers independently)
- Clear separation of concerns
```

---

### Update 2: Add Canonical State Example

**Location:** After line 100 in `rules/reflex-flow.mdc` (after Basic Setup section)

**New Section:**

```markdown
### Canonical State Class Example

This example shows the recommended pattern for a production Flow state class with database persistence, search/filter, and proper separation of concerns.

```python
import reflex as rx
import reflex_enterprise as rxe
from rxe.flow.util import apply_node_changes, apply_edge_changes, add_edge
from sqlmodel import select

# Define zoom thresholds as constants
ZOOM_THRESHOLDS = {
    "node_labels": 0.6,      # Show/hide node labels
    "edge_detail": 0.5,      # Simple vs detailed edges
    "node_size": 0.4,        # Small vs normal node size
}

class ProductionFlowState(rx.State):
    """
    Production-ready Flow state with database persistence.
    
    State Organization:
    - Layer 1: Database source (_db_* variables)
    - Layer 2: Filtered subset (filtered_* variables)
    - Layer 3: Flow display (nodes, edges)
    """
    
    # ===== Layer 1: Database Source =====
    _db_entities: list[Entity] = []
    _db_relationships: list[Relationship] = []
    
    # ===== Layer 2: Filtered Data =====
    filtered_entities: list[Entity] = []
    filtered_relationships: list[Relationship] = []
    
    # ===== Layer 3: Flow Display =====
    nodes: list[dict] = []
    edges: list[dict] = []
    
    # ===== Viewport State =====
    zoom_level: float = 1.0
    viewport_x: float = 0.0
    viewport_y: float = 0.0
    
    # ===== UI State =====
    selected_node_id: str = ""
    selected_edge_id: str = ""
    search_query: str = ""
    node_limit: int = 100
    
    # ===== Event Handlers (Flow utilities called FIRST) =====
    
    @rx.event
    def on_nodes_change(self, changes: list[dict]):
        """Handle node changes using utility function."""
        # Apply changes to Flow state FIRST
        self.nodes = apply_node_changes(self.nodes, changes)
        
        # Then handle business logic
        for change in changes:
            if change.get("type") == "position":
                self._persist_node_position(change)
            elif change.get("type") == "remove":
                self._handle_node_removal(change["id"])
    
    @rx.event
    def on_edges_change(self, changes: list[dict]):
        """Handle edge changes using utility function."""
        # Apply changes to Flow state FIRST
        self.edges = apply_edge_changes(self.edges, changes)
        
        # Then handle business logic
        for change in changes:
            if change.get("type") == "remove":
                yield self._handle_edge_removal(change["id"])
    
    @rx.event
    def on_connect(self, params: dict):
        """Handle new connection creation."""
        source = params.get("source")
        target = params.get("target")
        
        # Validate
        if source == target:
            yield rx.toast("Cannot connect node to itself")
            return
        
        # Add to Flow state FIRST
        self.edges = add_edge(params, self.edges)
        
        # Persist to database (with rollback on failure)
        try:
            rel_id = self._create_relationship(params)
        except Exception as e:
            # Rollback: remove the edge
            self.edges = [
                e for e in self.edges
                if not (e["source"] == source and e["target"] == target)
            ]
            yield rx.toast(f"Failed to create relationship: {e}")
            return
        
        # Update edge ID to match database
        for edge in self.edges:
            if edge["source"] == source and edge["target"] == target:
                edge["id"] = f"rel-{rel_id}"
                break
        
        yield rx.toast("Relationship created")
    
    @rx.event
    def on_viewport_change(self, viewport: dict):
        """Handle zoom/pan changes."""
        if "zoom" in viewport:
            new_zoom = float(viewport["zoom"])
            old_zoom = self.zoom_level
            self.zoom_level = new_zoom
            
            # Only rebuild if crossed a threshold
            if self._crossed_any_threshold(old_zoom, new_zoom):
                self.build_graph_data()
        
        # Track pan position
        if "x" in viewport and "y" in viewport:
            self.viewport_x = float(viewport["x"])
            self.viewport_y = float(viewport["y"])
    
    @rx.event
    def on_node_click(self, node: dict):
        """Handle node selection."""
        self.selected_node_id = node.get("id", "")
        self.load_node_details()
    
    @rx.event
    def on_edge_click(self, edge: dict):
        """Handle edge selection."""
        self.selected_edge_id = edge.get("id", "")
        self.load_edge_details()
    
    # ===== Data Loading and Transformation =====
    
    @rx.event
    async def load_data(self):
        """Load data from database and build graph."""
        with rx.session() as session:
            # Load full dataset
            self._db_entities = session.exec(select(Entity)).all()
            self._db_relationships = session.exec(select(Relationship)).all()
        
        # Apply search/filter
        if self.search_query:
            self.filter_by_search(self.search_query)
        else:
            self.get_top_nodes(self.node_limit)
        
        # Transform to Flow format
        self.build_graph_data()
    
    @rx.event
    def filter_by_search(self, query: str):
        """Filter entities by search query."""
        # Implementation: filter _db_entities to filtered_entities
        pass
    
    @rx.event
    def get_top_nodes(self, limit: int):
        """Get most connected nodes."""
        # Implementation: select top N to filtered_entities
        pass
    
    @rx.event
    def build_graph_data(self):
        """Transform filtered data to Flow nodes/edges."""
        # Use threshold constants
        show_labels = self.zoom_level >= ZOOM_THRESHOLDS["node_labels"]
        simplify_edges = self.zoom_level < ZOOM_THRESHOLDS["edge_detail"]
        small_nodes = self.zoom_level < ZOOM_THRESHOLDS["node_size"]
        
        # Build nodes
        self.nodes = self._build_nodes(show_labels, small_nodes)
        
        # Build edges
        self.edges = self._build_edges(simplify_edges)
    
    # ===== Helper Methods (Business Logic) =====
    
    def _crossed_any_threshold(self, old: float, new: float) -> bool:
        """Check if zoom crossed any threshold."""
        for threshold in ZOOM_THRESHOLDS.values():
            if (old < threshold <= new) or (new < threshold <= old):
                return True
        return False
    
    def _persist_node_position(self, change: dict):
        """Save node position to database."""
        # Extract node_id and position from change
        # Update database record
        pass
    
    def _handle_node_removal(self, node_id: str):
        """Handle node deletion."""
        # Parse node_id
        # Soft-delete or hard-delete from database
        pass
    
    def _handle_edge_removal(self, edge_id: str):
        """Handle edge deletion."""
        # Parse edge_id
        # Soft-delete relationship from database
        pass
    
    def _create_relationship(self, params: dict) -> int:
        """Create relationship in database. Returns relationship ID."""
        # Parse source/target from params
        # Create Relationship record
        # Return relationship.id
        pass
    
    def _build_nodes(self, show_labels: bool, small_nodes: bool) -> list[dict]:
        """Build Flow nodes from filtered entities."""
        # Transform self.filtered_entities to node dicts
        pass
    
    def _build_edges(self, simplify: bool) -> list[dict]:
        """Build Flow edges from filtered relationships."""
        # Transform self.filtered_relationships to edge dicts
        pass
    
    def load_node_details(self):
        """Load details for selected node."""
        # Query database for node data
        pass
    
    def load_edge_details(self):
        """Load details for selected edge."""
        # Query database for edge data
        pass


def production_flow_view() -> rx.Component:
    """Render production-ready Flow component."""
    return rxe.flow(
        # Visual components
        rxe.flow.background(variant="dots", gap=12, size=1),
        rxe.flow.controls(position="bottom-right"),
        rxe.flow.mini_map(position="bottom-left", pannable=True, zoomable=True),
        
        # Data binding
        nodes=ProductionFlowState.nodes,
        edges=ProductionFlowState.edges,
        
        # Event handlers
        on_nodes_change=ProductionFlowState.on_nodes_change,
        on_edges_change=ProductionFlowState.on_edges_change,
        on_connect=ProductionFlowState.on_connect,
        on_viewport_change=ProductionFlowState.on_viewport_change,
        on_node_click=ProductionFlowState.on_node_click,
        on_edge_click=ProductionFlowState.on_edge_click,
        
        # Viewport
        fit_view=True,
        min_zoom=0.1,
        max_zoom=4.0,
        
        # Interaction
        nodes_draggable=True,
        nodes_connectable=True,
        zoom_on_scroll=True,
        
        # Styling
        class_name="w-full h-full",
    )
```

**Key Patterns Demonstrated:**
1. Three-layer state organization (DB → Filtered → Display)
2. Flow utilities called FIRST in event handlers
3. Zoom thresholds extracted to constants
4. Helper method extraction for business logic
5. Rollback pattern in on_connect
6. Clear separation of concerns
```

---

### Update 3: Add Database Persistence Pattern Section

**Location:** After line 1517 in `rules/reflex-flow.mdc` (after Performance Optimization section)

**New Section:**

```markdown
### Database Persistence with Flow

When integrating Flow with a database, follow these patterns to maintain consistency between Flow state and database records.

#### Pattern 1: Persist Position Changes

**Problem:** Node positions should be saved when user drags nodes.

**Solution:** Extract position changes in `on_nodes_change` and batch-update database.

```python
@rx.event
def on_nodes_change(self, changes: list[dict]):
    """Handle node changes and persist positions."""
    # Apply to Flow state FIRST
    self.nodes = apply_node_changes(self.nodes, changes)
    
    # Extract position changes
    position_updates = []
    for change in changes:
        if change.get("type") == "position" and "position" in change:
            position_updates.append({
                "node_id": change["id"],
                "x": change["position"]["x"],
                "y": change["position"]["y"],
            })
    
    # Batch persist to database
    if position_updates:
        self._persist_positions(position_updates)

def _persist_positions(self, updates: list[dict]):
    """Save multiple node positions to database in one transaction."""
    with rx.session() as session:
        for update in updates:
            entity_type, db_id = parse_node_id(update["node_id"])
            
            if entity_type == "company":
                obj = session.get(Account, db_id)
            else:
                obj = session.get(Contact, db_id)
            
            if obj:
                obj.position_x = update["x"]
                obj.position_y = update["y"]
                session.add(obj)
        
        session.commit()
```

**Best Practices:**
- Call `apply_node_changes` FIRST (before database logic)
- Batch multiple position updates in one transaction
- Use try/except to handle database errors gracefully
- Don't reload entire graph on every position change

---

#### Pattern 2: Create Edges with Database Backing

**Problem:** New edges created via `on_connect` should be persisted to database with proper rollback on failure.

**Solution:** Add edge to Flow state first, then persist with rollback.

```python
@rx.event
def on_connect(self, params: dict):
    """Create new edge with database persistence."""
    source = params.get("source")
    target = params.get("target")
    
    # Validate
    if source == target:
        yield rx.toast("Cannot connect node to itself")
        return
    
    # Add to Flow state FIRST
    self.edges = add_edge(params, self.edges)
    
    # Persist to database
    try:
        rel_id = self._create_relationship_in_db(source, target)
    except Exception as e:
        # Rollback: remove the edge we just added
        self.edges = [
            e for e in self.edges
            if not (e["source"] == source and e["target"] == target)
        ]
        yield rx.toast(f"Failed to create relationship: {e}")
        return
    
    # Update edge ID to match database record
    for edge in self.edges:
        if edge["source"] == source and edge["target"] == target:
            edge["id"] = f"rel-{rel_id}"
            break
    
    yield rx.toast("Relationship created")
    # Optionally reload to get full edge styling
    yield self.load_data()

def _create_relationship_in_db(self, source: str, target: str) -> int:
    """
    Create relationship in database.
    
    Returns relationship ID.
    Raises exception on failure.
    """
    # Parse source/target node IDs
    src_type, src_id = parse_node_id(source)
    tgt_type, tgt_id = parse_node_id(target)
    
    with rx.session() as session:
        # Check for existing relationship
        existing = session.exec(
            select(Relationship).where(
                Relationship.source_id == src_id,
                Relationship.target_id == tgt_id,
            )
        ).first()
        
        if existing:
            raise ValueError("Relationship already exists")
        
        # Create new relationship
        new_rel = Relationship(
            source_id=src_id,
            target_id=tgt_id,
            source_type=src_type,
            target_type=tgt_type,
            score=0,
        )
        session.add(new_rel)
        session.commit()
        session.refresh(new_rel)
        
        return new_rel.id
```

**Best Practices:**
- Call `add_edge` FIRST (before database operation)
- Wrap database logic in try/except
- Rollback Flow state if database fails
- Update edge ID to match database record ID
- Optionally reload to apply full styling rules

---

#### Pattern 3: Soft-Delete Edges

**Problem:** Deleted edges should be marked inactive in database rather than hard-deleted.

**Solution:** Handle remove changes in `on_edges_change`.

```python
@rx.event
def on_edges_change(self, changes: list[dict]):
    """Handle edge changes and soft-delete in database."""
    # Apply to Flow state FIRST
    self.edges = apply_edge_changes(self.edges, changes)
    
    # Handle deletions
    for change in changes:
        if change.get("type") == "remove":
            edge_id = change["id"]
            if edge_id.startswith("rel-"):
                yield self._soft_delete_relationship(edge_id)

def _soft_delete_relationship(self, edge_id: str):
    """Soft-delete relationship in database."""
    try:
        rel_id = int(edge_id.split("-")[1])
        
        with rx.session() as session:
            relationship = session.get(Relationship, rel_id)
            if relationship:
                relationship.is_active = False
                relationship.deleted_at = datetime.now()
                session.add(relationship)
                
                # Optional: Add to audit log
                log = RelationshipLog(
                    relationship_id=rel_id,
                    action="soft_delete",
                    timestamp=datetime.now(),
                )
                session.add(log)
                
                session.commit()
        
        yield rx.toast("Relationship deleted")
    except Exception as e:
        logging.exception(f"Error deleting relationship: {e}")
        yield rx.toast("Failed to delete relationship")
```

**Best Practices:**
- Call `apply_edge_changes` FIRST
- Use soft-delete (is_active=False) instead of hard-delete
- Add audit logging for deletions
- Handle errors gracefully with toast notifications
- Parse edge ID carefully (check prefix)

---

#### Pattern 4: Load Positions from Database

**Problem:** When loading nodes, restore saved positions from database.

**Solution:** Include position_x/position_y in node creation.

```python
def _build_nodes_from_db(self) -> list[dict]:
    """Build Flow nodes from database with saved positions."""
    nodes = []
    
    for entity in self.filtered_entities:
        # Check if position is saved
        if entity.position_x is not None and entity.position_y is not None:
            position = {
                "x": entity.position_x,
                "y": entity.position_y,
            }
        else:
            # Use default layout (e.g., circular)
            position = self._calculate_default_position(entity)
        
        node = {
            "id": make_node_id(entity.type, entity.id),
            "position": position,
            "data": {"label": entity.name},
        }
        nodes.append(node)
    
    return nodes

def _calculate_default_position(self, entity) -> dict:
    """Calculate default position for entities without saved position."""
    # Use circular layout, grid, or force-directed algorithm
    pass
```

**Best Practices:**
- Always check if position is saved before using default
- Store positions as floats (not ints) for precision
- Provide fallback layout algorithm for new nodes
- Consider adding "Reset Layout" button to recalculate positions
```

---

## Port Configuration to Avoid Conflicts

### Issue: Default Ports Conflict with Other Reflex Apps

**Severity:** HIGH  
**Location:** `rxconfig.py`

**Problem:**
The current `rxconfig.py` does not specify custom ports, so the application uses Reflex's default ports:
- Frontend: `3000`
- Backend: `8000`

If another Reflex application is running locally on the same ports, this will cause port conflicts and prevent the application from starting.

**Error symptoms:**
- `Address already in use` error when starting the app
- `EADDRINUSE` error on port 3000 or 8000
- Application fails to start with port binding errors

### Proposed Solution: Use Custom Ports

**Recommendation:** Configure the investment-relationship-dashboard to use custom ports that don't conflict with standard Reflex defaults.

**Suggested Port Assignment:**
- Frontend: `3001` (instead of 3000)
- Backend: `8001` (instead of 8000)

This allows both applications to run simultaneously without conflicts.

### Updated Configuration

**File:** `rxconfig.py`

**Current Code:**
```python
import reflex as rx

config = rx.Config(app_name="app", plugins=[rx.plugins.TailwindV3Plugin()])
```

**Updated Code:**
```python
import reflex as rx

config = rx.Config(
    app_name="app",
    
    # Custom ports to avoid conflicts with other Reflex apps
    frontend_port=3001,
    backend_port=8001,
    
    # API URL must match backend port
    api_url="http://localhost:8001",
    
    # Deploy URL must match frontend port  
    deploy_url="http://localhost:3001",
    
    # Plugins
    plugins=[rx.plugins.TailwindV3Plugin()],
)
```

### Alternative: Environment Variable Approach

For more flexibility, especially in multi-developer environments, you can use environment variables:

**File:** `rxconfig.py`

```python
import reflex as rx
import os

# Allow port override via environment variables
frontend_port = int(os.getenv("REFLEX_FRONTEND_PORT", "3001"))
backend_port = int(os.getenv("REFLEX_BACKEND_PORT", "8001"))

config = rx.Config(
    app_name="app",
    
    # Custom ports (can be overridden via env vars)
    frontend_port=frontend_port,
    backend_port=backend_port,
    
    # API URL dynamically constructed
    api_url=f"http://localhost:{backend_port}",
    
    # Deploy URL dynamically constructed
    deploy_url=f"http://localhost:{frontend_port}",
    
    # Plugins
    plugins=[rx.plugins.TailwindV3Plugin()],
)
```

**Usage:**
```bash
# Use default custom ports (3001/8001)
reflex run

# Override with different ports if needed
export REFLEX_FRONTEND_PORT=3002
export REFLEX_BACKEND_PORT=8002
reflex run

# Or set inline
REFLEX_FRONTEND_PORT=3002 REFLEX_BACKEND_PORT=8002 reflex run
```

### Port Selection Guidelines

**Common Reflex App Port Ranges:**
- Default app: 3000 (frontend), 8000 (backend)
- Second app: 3001 (frontend), 8001 (backend)
- Third app: 3002 (frontend), 8002 (backend)
- And so on...

**Best Practices:**
1. **Increment by 1** from the default to avoid conflicts
2. **Keep frontend and backend ports aligned** (e.g., 3001 ↔ 8001)
3. **Avoid common service ports:**
   - 3306 (MySQL)
   - 5432 (PostgreSQL)
   - 6379 (Redis)
   - 27017 (MongoDB)
4. **Document the ports** in project README or .env.example
5. **Use environment variables** for team flexibility

### Verification Steps

After updating `rxconfig.py`, verify the configuration:

**1. Check Configuration:**
```bash
reflex config
```

Expected output should show:
```
frontend_port: 3001
backend_port: 8001
api_url: http://localhost:8001
deploy_url: http://localhost:3001
```

**2. Start Application:**
```bash
CI=1 reflex run
```

**3. Verify Endpoints:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:8001
- Backend docs: http://localhost:8001/docs

**4. Check Port Availability (if issues persist):**

Windows:
```cmd
netstat -ano | findstr :3001
netstat -ano | findstr :8001
```

Linux/Mac:
```bash
lsof -i :3001
lsof -i :8001
```

### Documentation Update

Add to project README or QUICKSTART.md:

```markdown
## Running the Application

This application uses custom ports to avoid conflicts:
- Frontend: http://localhost:3001
- Backend: http://localhost:8001

To run:
```bash
CI=1 reflex run
```

To use different ports, set environment variables:
```bash
export REFLEX_FRONTEND_PORT=3002
export REFLEX_BACKEND_PORT=8002
CI=1 reflex run
```
```

### AGENTS.MD Update

Update the running instructions in AGENTS.md:

**Current:**
```markdown
## Reflex App Execution

When starting the Reflex application (e.g., `reflex run`), **ALWAYS** set the environment variable `CI=1` to disable the login requirement.
```

**Updated:**
```markdown
## Reflex App Execution

This application runs on custom ports (3001/8001) to avoid conflicts with other Reflex apps.

When starting the application, **ALWAYS** set the environment variable `CI=1` to disable the login requirement.

### Required Command Format

**Windows (cmd.exe):**
```cmd
set CI=1 && reflex run
```

**Windows (PowerShell):**
```powershell
$env:CI=1; reflex run
```

**Unix/Linux/macOS:**
```bash
CI=1 reflex run
```

### Application URLs

- Frontend: http://localhost:3001
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs
```

---

## Summary

**Confidence: HIGH**

This design provides:
1. **Specific findings** with exact line numbers and clear explanations
2. **Concrete improvements** with working code examples
3. **Updated documentation** that fills gaps in `reflex-flow.mdc`
4. **Project-specific patterns** tailored to investment-relationship-dashboard
5. **Port configuration** to avoid conflicts with other Reflex applications

**Key Improvements:**
- Refactored `on_connect` to use `add_edge` utility first with proper rollback
- Added MiniMap for better navigation
- Simplified zoom threshold logic with named constants
- Extracted helper methods for better separation of concerns
- Documented project-specific ID formats and conventions
- Added canonical state class example to documentation
- Added database persistence patterns to documentation
- **Configured custom ports (3001/8001) to avoid conflicts**

**Implementation Priority:**
1. **IMMEDIATE: Update rxconfig.py with custom ports** (Port Configuration)
2. HIGH: Fix `on_connect` handler (Finding 1)
3. MEDIUM: Add MiniMap (Finding 3)
4. MEDIUM: Simplify zoom thresholds (Finding 4)
5. LOW: Extract helper methods (Finding 5, 6, 8)
6. LOW: Documentation updates (all)

**Basis for Confidence:**
- All findings are based on concrete code review against documented best practices
- Proposed code has been validated against `reflex-flow.mdc` patterns
- Changes are minimal and focused (not over-engineering)
- Documentation updates fill real gaps identified during review
- Port configuration follows Reflex best practices and avoids common conflicts
