# Quick Start Guide

## 1. Start the Application

This application uses custom ports to avoid conflicts:
- Frontend: http://localhost:3005
- Backend: http://localhost:8005

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

To use different ports, set environment variables:
```bash
set REFLEX_FRONTEND_PORT=3006
set REFLEX_BACKEND_PORT=8006
set CI=1 && reflex run
```

## 2. Access the Dashboard
Open browser to: http://localhost:3005

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
