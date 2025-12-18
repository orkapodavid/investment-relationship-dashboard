import reflex as rx
import os

# Allow port override via environment variables
frontend_port = int(os.getenv("REFLEX_FRONTEND_PORT", "3005"))
backend_port = int(os.getenv("REFLEX_BACKEND_PORT", "8005"))

config = rx.Config(
    app_name="app",
    
    # Custom ports to avoid conflicts with other Reflex apps
    frontend_port=frontend_port,
    backend_port=backend_port,
    
    # API URL dynamically constructed
    api_url=f"http://localhost:{backend_port}",
    
    # Deploy URL dynamically constructed
    deploy_url=f"http://localhost:{frontend_port}",
    
    # Plugins
    plugins=[rx.plugins.TailwindV3Plugin()],
)
