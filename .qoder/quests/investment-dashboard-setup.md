# Investment Relationship Dashboard - Local Setup and Side Panel Bug Fix

## Objective

Set up the Investment Relationship Dashboard locally and troubleshoot a UI rendering issue where the CRUD operations side panel fails to appear when clicking nodes in the graph visualization.

## Project Context

The application is built with Reflex (Python full-stack framework) and Reflex Enterprise, featuring a graph-based visualization of relationships between companies and people. The system includes:

- Graph visualization using Reflex Enterprise Flow component
- CRUD operations for nodes (companies and people) and edges (relationships)
- Side panel drawer for displaying node details and performing operations
- State management through RelationshipState class
- SQLModel-based database with Account, Contact, and Relationship entities

## Root Cause Analysis

### Current Implementation Analysis

**Side Panel Component Structure:**
- Uses Radix UI Drawer component (rx.drawer.root)
- Positioned fixed at top-right with z-index 10000
- Controlled by `show_side_panel` state variable
- Contains overlay with z-index 9999

**Graph View Component Structure:**
- Uses Reflex Enterprise Flow component (rxe.flow)
- Positioned absolutely with full viewport coverage (inset-0, z-0)
- Handles node and edge click events

**App Layout Hierarchy:**
```
div (relative h-screen)
├── graph_view (absolute inset-0 z-0)
├── search_bar
└── side_panel (drawer portal with z-index 10000)
```

### Identified Issue

**State Propagation Verification Required:**
When `on_node_click` event fires at line 675 in relationship_state.py:
1. State variable `show_side_panel` is set to True (line 734)
2. Event handler `load_active_node_relationships` is yielded (line 735)
3. `selected_node_data` dictionary is populated (lines 696-728)

**Potential Rendering Conflicts:**
1. Portal rendering timing - The drawer.portal may not properly mount when state changes
2. Z-index stacking context - Parent elements may create new stacking contexts
3. Conditional rendering logic - Multiple rx.cond statements may evaluate incorrectly
4. State synchronization - Event yielding may not propagate state updates properly

## Local Development Setup

### Environment Prerequisites

| Component | Specification |
|-----------|--------------|
| Python | Version 3.8 or higher |
| Package Manager | pip |
| Virtual Environment | venv or equivalent |

### Installation Steps

**Step 1: Virtual Environment Creation**
Create an isolated Python environment in the project directory to avoid dependency conflicts.

**Step 2: Dependency Installation**
Install all required packages from requirements.txt:
- reflex: Core framework for full-stack Python applications
- reflex-enterprise: Enterprise features including Flow component
- PyGithub: GitHub API integration
- sqlmodel: SQL database ORM with Pydantic integration
- playwright: Browser automation for testing
- pytest: Testing framework
- pytest-playwright: Pytest plugin for Playwright integration

**Step 3: Database Initialization**
The application automatically:
- Creates SQLite database on first run
- Drops and recreates tables on each startup (lifespan_task in app.py)
- Seeds initial data if database is empty (seed_database method)

**Step 4: Development Server Launch**
Start the Reflex development server which:
- Runs backend on port 8000 (default)
- Serves frontend with hot reload
- Watches for file changes

### Expected Result

Application should be accessible locally with:
- Graph visualization displaying seeded data (Acme Corp, Stark Ind, Wayne Ent and associated contacts)
- Interactive node dragging and clicking
- Search functionality
- Side panel appearing on node selection

## Bug Investigation Strategy

### Browser-Based Debugging Approach

**Phase 1: Visual Inspection**
Use Playwright to navigate to the local application and capture initial state.

**Phase 2: Interaction Testing**
1. Click on a graph node (e.g., company or person node)
2. Observe whether side panel appears
3. Capture screenshots of before/after states

**Phase 3: DOM Inspection**
Examine the rendered HTML structure to verify:

| Element | Expected State | Verification Method |
|---------|---------------|---------------------|
| rx.drawer.root | Should have `data-state="open"` or similar | Inspect drawer element attributes |
| rx.drawer.overlay | Should be visible in DOM | Check element existence and computed styles |
| rx.drawer.content | Should be positioned right: 0 | Verify CSS positioning |
| show_side_panel state | Should be true after click | Check if drawer's open prop reflects state |

**Phase 4: CSS Analysis**
Investigate potential styling issues:

| CSS Property | Potential Issue | Diagnostic Approach |
|--------------|----------------|---------------------|
| display | May be set to 'none' | Check computed display value |
| visibility | May be 'hidden' | Verify visibility property |
| z-index | May be behind graph | Compare z-index values of drawer vs graph |
| position | Fixed positioning may be incorrect | Verify fixed positioning and offsets |
| overflow | Parent overflow:hidden may clip drawer | Check ancestor overflow properties |
| transform | May create new stacking context | Inspect transform properties on ancestors |

**Phase 5: State Verification**
Use browser console or Reflex dev tools to:
- Confirm `on_node_click` event handler executes
- Verify `show_side_panel` transitions to True
- Check `selected_node_data` populates correctly
- Ensure `edit_mode` is set to "node"

### Known Interaction Patterns

**Event Flow for Node Click:**
```
User clicks node
  → on_node_click handler triggered (line 675)
    → Parse node ID to extract prefix and ID
    → Query database for node details
    → Populate selected_node_data dictionary
    → Set edit_mode = "node"
    → Set node_create_mode = False  
    → Set show_side_panel = True
    → Yield load_active_node_relationships
```

**Side Panel Render Logic:**
The side_panel component uses nested rx.cond statements to determine content:

| Priority | Condition | View Rendered |
|----------|-----------|---------------|
| 1 | node_create_mode == True | node_creation_view |
| 2 | is_creating_relationship == True | relationship_creation_view |
| 3 | edit_mode == "node" AND is_editing == True | node_edit_view |
| 4 | edit_mode == "node" AND is_editing == False | node_details_view |
| 5 | edit_mode == "edge" | edge_edit_view |

After node click, conditions should evaluate to: node_create_mode=False, is_creating_relationship=False, edit_mode="node", is_editing=False → **node_details_view should render**

## Proposed Solutions

### Solution 1: Portal Rendering Fix

**Issue Hypothesis:** The drawer.portal may not properly render when the portal target is not explicitly defined.

**Design Change:**
Modify the side_panel component structure to ensure proper portal mounting by:
- Verifying portal container exists in DOM
- Ensuring drawer.root properly wraps portal
- Confirming open prop correctly binds to show_side_panel state

**State Variables Modified:** None

**Component Changes:**
- side_panel.py: Drawer component configuration

### Solution 2: Z-Index Stacking Context Resolution

**Issue Hypothesis:** The graph_view parent container may create a stacking context that isolates the drawer's z-index.

**Design Change:**
Adjust z-index values and positioning context:
- Ensure drawer.overlay z-index (9999) and drawer.content z-index (10000) are higher than graph
- Verify no parent elements create new stacking contexts via transform, filter, or isolation properties
- Consider moving side_panel earlier in DOM tree if necessary

**Layout Modifications:**
- app.py: Potentially reorder component rendering
- graph_view.py: Remove z-index conflicts from parent container

### Solution 3: State Propagation Enhancement

**Issue Hypothesis:** State updates may not propagate correctly due to event yielding patterns.

**Design Change:**
Modify event handler to ensure state synchronization:
- Review event yielding sequence in on_node_click
- Ensure show_side_panel state update happens before component re-render
- Add explicit state refresh if necessary

**State Management Changes:**
- relationship_state.py: Adjust event handler yielding pattern
- Verify state updates trigger proper component re-renders

### Solution 4: Conditional Rendering Simplification

**Issue Hypothesis:** Complex nested rx.cond logic may prevent correct view selection.

**Design Change:**
Simplify conditional rendering logic in side_panel component:
- Flatten nested conditionals
- Add explicit else cases
- Use more deterministic condition ordering
- Add logging to verify which view should render

**Component Logic:**
- side_panel.py: Refactor rx.cond statements for clarity

### Solution 5: Drawer Component Configuration

**Issue Hypothesis:** The rx.drawer.root may require explicit configuration for proper open/close behavior.

**Design Change:**
Enhance drawer component properties:
- Add explicit modal={True} or modal={False} prop
- Verify direction="right" is properly configured
- Ensure onOpenChange callback properly binds to close_panel
- Add animation duration controls if rendering timing is an issue

**Component Props:**
- side_panel.py: Expand drawer.root configuration

## Validation Criteria

### Success Indicators

| Test Case | Expected Behavior | Verification Method |
|-----------|------------------|---------------------|
| Node Click | Side panel appears within 300ms | Playwright wait for element visible |
| Panel Content | node_details_view displays correct node information | DOM inspection for display_name, job fields |
| Panel Position | Drawer appears from right side at fixed position | Verify CSS right: 0, top: 0 |
| Panel Overlay | Semi-transparent overlay covers graph | Check overlay background-color opacity |
| Panel Interaction | Edit and Add Link buttons are clickable | Element interactivity test |
| Panel Close | Clicking overlay closes panel | Click overlay, verify show_side_panel becomes False |
| State Persistence | Selected node data persists during panel operations | Verify selected_node_data maintains values |

### Regression Testing

Ensure existing functionality remains intact:
- Graph node dragging continues to work
- Edge creation via node connection functions
- Search functionality operates correctly
- Node and edge deletion processes properly
- Database persistence maintains integrity

## Technical Constraints

- Must not modify database schema
- Must maintain existing event handler signatures
- Must preserve audit trail functionality (updated_at, last_modified_by)
- Must support both person and company node types
- Must maintain z-index hierarchy for all UI layers
- Cannot introduce new external dependencies

## Implementation Priority

| Priority | Action Item | Rationale |
|----------|------------|-----------|
| 1 | Browser inspection via Playwright | Identify exact rendering issue without code changes |
| 2 | Z-index and stacking context verification | Most common cause of overlay issues |
| 3 | State propagation logging | Verify event handlers execute correctly |
| 4 | Drawer configuration review | Ensure component properly configured |
| 5 | Conditional rendering simplification | Address potential logic errors |

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| State management breaking changes | High | Thoroughly test all CRUD operations after fixes |
| Z-index conflicts with other UI elements | Medium | Document z-index hierarchy and test all overlays |
| Portal rendering incompatibility | Medium | Test across different browsers if possible |
| Performance degradation from debugging code | Low | Remove debug logging after fix confirmed |
| Regression in edge click functionality | Medium | Test both node and edge click handlers || Performance degradation from debugging code | Low | Remove debug logging after fix confirmed |
