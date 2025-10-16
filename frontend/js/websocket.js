function setupWebSocket() {
    console.log("DEBUG: Starting WebSocket connection...");
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        console.log('✅ Successfully connected to the WebSocket server.');
    };

    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
    
            // use switch-case to handle different views
            switch(message.view) {
                case 'tasks':
                    updateTaskTable(message.data);
                    break;
                case 'heap':
                    updateHeapTable(message.data);
                    break;
                case 'queues':
                    updateQueueTable(message.data);
                    break;
                case 'semaphores':
                    updateSemaphoreTable(message.data);
                    break;
                case 'timers':
                    updateTimerTable(message.data);
                    break;
                default:
                    // ignore unknown views
            }
    
        } catch (e) {
            console.error("Failed to parse message from server:", e);
        }
    };

    socket.onclose = () => {
        console.log('❌ Disconnected from the WebSocket server.');
    };

    socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };
    
    console.log("DEBUG: WebSocket event listeners setup complete.");
}