# Relationship Network Visualization - Implementation Plan

## Phase 1: Graph Component Setup and Data Transformation ✅
- [x] Install reflex-enterprise for react-flow support
- [x] Create data transformation logic in relationship_state.py to convert SQL models to graph format (nodes and edges)
- [x] Implement graph_data computed var that returns {'nodes': [...], 'edges': [...]} format
- [x] Design node structure: Account nodes (squares) vs Contact nodes (circles) with distinct visual properties
- [x] Design edge structure: Relationship edges with dynamic colors based on score (-100=red, 0=gray, +100=green)

## Phase 2: Replace UI with Graph Canvas ✅
- [x] Remove sidebar.py and account_view.py components
- [x] Create new graph_view.py component using reflex-enterprise react-flow
- [x] Configure graph canvas with zooming and panning capabilities
- [x] Implement node rendering with visual distinction (Accounts as squares, Contacts as circles)
- [x] Implement edge rendering with dynamic color gradient based on relationship score
- [x] Set up proper graph layout and initial positioning

## Phase 3: Interactive Features and Editing
- [ ] Implement node click handler to show details panel (Name, Title, Type)
- [ ] Implement edge click handler to show relationship editor panel
- [ ] Create relationship score editor with slider (-100 to 100) in side panel
- [ ] Add ability to create new relationships by selecting two nodes
- [ ] Implement save functionality to persist score changes to database
- [ ] Add history tracking for relationship changes via edge editing

## Phase 4: UI Testing and Validation
- [ ] Test graph rendering with sample data (multiple accounts and contacts)
- [ ] Verify node visual distinction (squares vs circles, colors)
- [ ] Test edge color gradient based on relationship scores (red/gray/green)
- [ ] Validate click interactions (node details, edge editing)
- [ ] Test zoom and pan functionality
- [ ] Verify relationship score updates persist to database