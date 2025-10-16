const http = require('http');
const path = require('path');
const express = require('express');
const WebSocket = require('ws'); 

const PORT = 8080;
const HOST = '127.0.0.1';

const app = express(); //create express app
const server = http.createServer(app); //create http server

const frontendPath = path.join(__dirname, '..', 'frontend'); // Adjust the path as necessary
app.use(express.static(frontendPath)); // Serve static files from the frontend directory

// Serve the main HTML file
server.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running. Open your browser at http://${HOST}:${PORT}`); 
});

//create a function to generate mock RTOS data
function generateMockRtosData() {
    const statuses = ['Running', 'Ready', 'Blocked', 'Suspended'];
    
    // data for Tasks
    const tasks = [
        { 
            id: 1, address: '0x200018A0', 
            name: 'ledBlinkTask', 
            status: statuses[Math.floor(Math.random() * 4)], 
            priority: 2, 
            stackPeak: Math.floor(Math.random() * 200) + 50, 
            runtime: Math.floor(Math.random() * 10000) 
        },
        { 
            id: 2, 
            address: '0x200019B0', 
            name: 'uartLogTask', 
            status: statuses[Math.floor(Math.random() * 4)], 
            priority: 1, 
            stackPeak: Math.floor(Math.random() * 400) + 150, 
            runtime: Math.floor(Math.random() * 8000) 
        },
        { 
            id: 3, 
            address: '0x20001AC0', 
            name: 'sensorReadTask', 
            status: 'Blocked', 
            priority: 3, 
            stackPeak: Math.floor(Math.random() * 100) + 250, 
            runtime: Math.floor(Math.random() * 15000) 
        },
        { 
            id: 4, 
            address: '0x20001BD0', 
            name: 'IDLE', 
            status: 'Ready', 
            priority: 0, 
            stackPeak: 48, 
            runtime: Math.floor(Math.random() * 50000) 
        },
    ];

    // data for Heap
    const heap = {
        start: '0x20001000', 
        end: '0x20003800', 
        used: Math.floor(Math.random() * 4096) + 2048, 
        free: 10240 - (this.used || 2048),
    };

    // data for Queues
    const queues = [
        { 
            name: 'sensorDataQueue', 
            currentLength: Math.floor(Math.random() * 10), 
            maxLength: 10, 
            itemSize: 16 
        },
        { 
            name: 'logQueue', 
            currentLength: Math.floor(Math.random() * 50), 
            maxLength: 50, 
            itemSize: 32 },
    ];
    
    // Data for Semaphores
    const semaphores = [
        { 
            name: 'uartMutex', 
            type: 'Mutex', 
            currentLength: 1, 
            maxLength: 1, mutexHolder: 'uartLogTask' },
        { 
            name: 'dataReadySignal', 
            type: 'Binary', 
            currentLength: Math.round(Math.random()), 
            maxLength: 1, mutexHolder: 'N/A' 
        },
    ];
    
    // Data for Timers
    const timers = [
        { 
            name: 'ledTimer', 
            id: 1, type: 'Periodic', 
            period: 1000, 
            state: 'Running' 
        },
        { name: 'shutdownTimer', 
            id: 2, 
            type: 'One-Shot', 
            period: 60000, 
            state: 'Stopped' },
    ];

    return { tasks, heap, queues, semaphores, timers };
}

// --- WebSocket Server ---
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('✅ Frontend connected!');
    const intervalId = setInterval(() => {
        const mockData = generateMockRtosData();
        
        // we can push data to all views to filter the interface
        ws.send(JSON.stringify({ view: 'tasks', data: mockData.tasks }));
        ws.send(JSON.stringify({ view: 'heap', data: mockData.heap }));
        ws.send(JSON.stringify({ view: 'queues', data: mockData.queues }));
        ws.send(JSON.stringify({ view: 'semaphores', data: mockData.semaphores }));
        ws.send(JSON.stringify({ view: 'timers', data: mockData.timers }));
        
        console.log('pushed virtual RTOS data to frontend.');

    }, 1000);

    ws.on('close', () => {
        console.log('❌ Frontend disconnected.');
        clearInterval(intervalId);
    });
});