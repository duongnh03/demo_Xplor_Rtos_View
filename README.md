# Demo Xplor-Rtos-View 
This is a web-based, real-time viewer for visualizing FreeRTOS objects. This version runs in a mock data mode, where the backend server generates simulated RTOS data. This is ideal for frontend development, testing, and demonstration without needing physical hardware.

## Features

- **Real-time Updates**: The interface updates every 2 seconds with new data pushed from the backend via WebSockets.

- **Multi-View Interface**: Clean, tabbed navigation for viewing Tasks, Heap, Queues, Semaphores, and Timers.

- **Decoupled Architecture**: A clear separation between the backend (data generation and serving) and the frontend (presentation).

- **Professional Dark Theme**: A user interface inspired by modern development tools like VS Code.

## Prerequisites
Before you begin, ensure you have the following installed on your system:

- **Node.js** (LTS version, e.g., 18.x or later)

- **npm** (comes bundled with Node.js)

## Installation & Setup

Follow these steps to set up the project on your local machine.

1. **Clone the repository** (or simply create the project folder structure):
```bash
git clone https://github.com/duongnh03/demo_Xplor_Rtos_View.git
cd xplor_rtos_view
```
2. **Install backend dependencies**: Navigate to the backend directory and install the required Node.js packages.
```bash
cd backend
npm install express ws
```
## Usage
To run the application, follow these steps:

1. **Start the Backend Server**: Make sure you are in the backend directory, then run the server using Node.js.
```push
# If you are in the project root (xplor_rtos_view), first navigate to the backend
cd backend

# Start the server
node main.js
```
You should see a confirmation message in the terminal: ```bash 🚀 Server is running. Open your browser at http://127.0.0.1:8080.```

2.  Open the Frontend: Open your web browser (Chrome, Firefox, etc.) and navigate to the following address:
```bash
http://127.0.0.1:8080
```
The RTOS Viewer interface will load, and the tables will begin to populate with automatically updating mock data. You can now click through the different tabs (Heap, Tasks, Queue, etc.) to see the different views.