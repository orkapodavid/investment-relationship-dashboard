# Investment Manager Relationship Dashboard - Implementation Plan

## Phase 1: Database Models and Basic Layout ✅
- [x] Set up SQLModel database models (Account, Contact, Relationship, RelationshipLog)
- [x] Configure SQLite database connection and table creation
- [x] Create base layout with left sidebar for accounts list
- [x] Implement searchable accounts list with filter functionality
- [x] Add main content area that displays when an account is selected

## Phase 2: Relationship Editor with Dynamic Scoring
- [ ] Build contacts grid for selected account
- [ ] Implement relationship score slider (-100 to 100 range) with on_change_end event
- [ ] Create color gradient helper function (red/gray/green based on score)
- [ ] Apply dynamic color styling to contact cards and sliders based on score
- [ ] Implement CRUD operations: create/update relationships and log history
- [ ] Add visual feedback for sentiment levels (Hostile/Indifferent/Friendly)

## Phase 3: History Tracking and Contact Management
- [ ] Build history view section showing relationship log entries
- [ ] Display previous score, new score, timestamp, and notes for each log entry
- [ ] Add ability to create new contacts linked to accounts
- [ ] Implement score change tracking with automatic RelationshipLog creation
- [ ] Add notes/comments capability for relationship changes
- [ ] Polish UI with responsive design and smooth interactions

## UI Testing and Validation
- [ ] Test account selection and contact grid display
- [ ] Verify slider interaction and color gradient transitions
- [ ] Validate history logging and timeline display
- [ ] Check search functionality and data persistence
