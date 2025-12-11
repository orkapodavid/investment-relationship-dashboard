# Quick Start Guide

## 1. Start the Application
bash
cd /home/user/app
reflex run


## 2. Access the Dashboard
Open browser to: http://localhost:3000

## 3. Run Tests (Optional)
In a separate terminal:
bash
cd /home/user/app
pytest tests/test_app.py -v


## 4. Key Features to Try
- ✅ Drag nodes to new positions (auto-saves)
- ✅ Click "+ Node" to create entities
- ✅ Click "+ Link" to create relationships
- ✅ Click nodes/edges to edit
- ✅ Use search bar to filter
- ✅ Toggle "History" to see deleted items

## 5. Database Location
Data is stored in: `reflex.db` (SQLite)
