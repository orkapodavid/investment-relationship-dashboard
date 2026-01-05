# Regeneration Prompts for Investment Relationship Dashboard

This document contains a series of prompts to regenerate the Investment Relationship Dashboard application using Reflex. The original repository had some bugs (specifically in testing selectors) and potential improvements. These prompts aim to recreate the application with cleaner code and robust testing.

## Prompt 1: Project Setup and Data Models

**Role:** Expert Python Developer specializing in Reflex (web framework) and SQLModel.

**Task:** Initialize a new Reflex project called `relationship_dashboard` and define the database models.

**Requirements:**
1.  **Dependencies:** `reflex`, `reflex-enterprise` (for `rxe.flow`), `sqlmodel`.
2.  **Configuration:**
    -   Configure `rxconfig.py` to allow port overrides via environment variables (`REFLEX_FRONTEND_PORT`, `REFLEX_BACKEND_PORT`).
    -   Enable TailwindCSS.
3.  **Database Models (`app/models.py`):**
    -   `Account` (Company): `id`, `name`, `ticker`, `created_at`, `updated_at`, `last_modified_by`, `position_x`, `position_y`.
    -   `Contact` (Person): `id`, `first_name`, `last_name`, `job_title`, `created_at`, `updated_at`, `last_modified_by`, `position_x`, `position_y`, `account_id` (FK to Account).
    -   `Relationship`: `id`, `score` (-100 to 100), `created_at`, `last_updated`, `last_modified_by`, `relationship_type` (Enum: EMPLOYMENT, SOCIAL, BUSINESS), `is_active` (bool), `is_directed` (bool), `term` (Enum: WORKS_FOR, INVESTED_IN, COMPETITOR, COLLEAGUE, FRIEND, ENEMY), `source_type` ("person"/"company"), `source_id`, `target_type`, `target_id`.
    -   `RelationshipLog`: Audit trail for relationship changes (`previous_score`, `new_score`, `action`, `note`).

**Output:** Provide the `rxconfig.py` and `app/models.py` files.

---

## Prompt 2: State Management (Backend Logic)

**Role:** Expert Reflex Developer.

**Task:** Implement the application state in `app/states/relationship_state.py`.

**Requirements:**
1.  **State Class:** Create `RelationshipState` inheriting from `rx.State`.
2.  **Data Loading:**
    -   `load_data`: Fetch nodes and relationships. Handle `search_query` and `node_limit`.
    -   `seed_database`: Insert sample data if DB is empty (Acme Corp, Stark Ind, Wayne Ent, and associated contacts/relationships).
3.  **Graph Data Preparation:**
    -   `build_graph_data`: Convert DB models into a format suitable for `reflex-enterprise` Flow (`nodes` list and `edges` list).
    -   Nodes should have styles based on type (Person: Circle, Company: Square/Rectangle).
    -   Edges should use `smoothstep` type, with labels and styling based on `score` (Green for positive, Red for negative).
4.  **CRUD Operations:**
    -   `add_node`: Create new Person or Company.
    -   `update_node`: Update details.
    -   `delete_node`: Soft delete or hard delete nodes and cascade to relationships.
    -   `create_relationship`: Create a link between two nodes.
    -   `update_relationship_score`: Update score and log the change.
    -   `soft_delete_relationship`: Mark relationship as inactive.
5.  **Graph Interaction Handlers:**
    -   `on_nodes_change`: Handle node dragging (persist `position_x`, `position_y` to DB).
    -   `on_connect`: Handle connecting two nodes to create a relationship.
    -   `on_node_click`: Select a node and load its details/active relationships.
6.  **Helpers:**
    -   Filtering logic for "Search" (2-degree subgraph).
    -   Logic to toggle "History" (show/hide inactive relationships).

**Output:** Provide `app/states/relationship_state.py`.

---

## Prompt 3: UI Components

**Role:** Expert Reflex Frontend Developer.

**Task:** Create the UI components in `app/components/`.

**Requirements:**
1.  **Search Bar (`app/components/search_bar.py`):**
    -   Input for search query (debounced).
    -   Slider for `node_limit`.
    -   Toggle for "Show History".
    -   "New Node" and "Link" buttons.
    -   **Important:** Add `id` or `data-testid` attributes to inputs for testing (e.g., `id="search-input"`, `id="limit-slider"`).
2.  **Side Panel (`app/components/side_panel.py`):**
    -   A drawer/slide-over that shows details for the selected node or edge.
    -   **Node Creation Mode:** Form to add Name, Title/Ticker. Radio button for Type.
    -   **Node Edit Mode:** Form to edit details.
    -   **Relationship Edit Mode:** Slider for score, dropdown for Term (Friend, Competitor, etc.).
    -   **Audit Trail:** Display "Last Modified By" and timestamp.
    -   **Important:** Use specific `id`s for form inputs (e.g., `id="node-first-name"`, `id="node-type-person"`) to avoid testing ambiguity.
3.  **Graph View (`app/components/graph_view.py`):**
    -   Use `reflex_enterprise.flow` (or `rx.code_block` if `rxe` not available, but prefer `rxe` as per original).
    -   Bind `nodes` and `edges` from state.
    -   Bind handlers: `on_nodes_change`, `on_connect`, `on_node_click`.

**Output:** Provide the component files.

---

## Prompt 4: Main Application & Testing

**Role:** Full Stack Developer.

**Task:** Assemble the application and provide a robust test suite.

**Requirements:**
1.  **Main App (`app/app.py`):**
    -   Define the main page (`index`).
    -   Layout: Header (Banner), Graph View (full screen), Search Bar (overlay), Side Panel (overlay).
    -   `lifespan_task` to initialize DB tables.
2.  **Testing (`tests/test_app.py`):**
    -   Use `pytest` and `playwright`.
    -   **Fixing Previous Bugs:**
        -   Do **not** use generic selectors like `locator("input").nth(1)`.
        -   Use specific selectors like `locator("#node-first-name")` or `locator('input[name="first_name"]')`.
        -   Ensure tests wait for graph network idle or elements to appear.
    -   **Test Cases:**
        -   Seed data loading.
        -   Create Person (verify on graph).
        -   Create Company.
        -   Search functionality.
        -   History toggle.

**Output:** Provide `app/app.py` and `tests/test_app.py`.
