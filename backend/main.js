const http = require('http');
const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const PORT = 8080;
const HOST = '127.0.0.1';

const app = express();
const server = http.createServer(app);
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

server.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running. Open your browser at http://${HOST}:${PORT}`);
});

// --- Dữ liệu ảo ---
function generateMockRtosData() {
    const statuses = ['Running', 'Ready', 'Blocked', 'Suspended'];
    
    // Dữ liệu cho Tasks
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
            runtime: Math.floor(Math.random() * 15000) },
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

    // Dữ liệu cho Heap
    const heap = {
        start: '0x20001000', 
        end: '0x20003800', 
        used: Math.floor(Math.random() * 4096) + 2048, 
        free: 10240 - (this.used || 2048),
    };

    // Dữ liệu cho Queues
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
    
    // Dữ liệu cho Semaphores
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
    
    // Dữ liệu cho Timers
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
        
        // Gửi đi các gói tin riêng biệt cho từng view
        ws.send(JSON.stringify({ view: 'tasks', data: mockData.tasks }));
        ws.send(JSON.stringify({ view: 'heap', data: mockData.heap }));
        ws.send(JSON.stringify({ view: 'queues', data: mockData.queues }));
        ws.send(JSON.stringify({ view: 'semaphores', data: mockData.semaphores }));
        ws.send(JSON.stringify({ view: 'timers', data: mockData.timers }));
        
        console.log('Sent mock data for all views.');

    }, 1000);

    ws.on('close', () => {
        console.log('❌ Frontend disconnected.');
        clearInterval(intervalId);
    });
});