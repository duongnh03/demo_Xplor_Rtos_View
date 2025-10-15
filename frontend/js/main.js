try {
    console.log("DEBUG: Script started.");

    window.addEventListener('DOMContentLoaded', () => {
        
        console.log("DEBUG: DOM Content Loaded. Starting UI setup.");
        
        // --- PHẦN 1: LOGIC ĐIỀU KHIỂN GIAO DIỆN (UI) ---
        const navButtons = document.querySelectorAll('.nav-button');
        const contentPages = document.querySelectorAll('.content-page');
        
        console.log(`DEBUG: Found ${navButtons.length} nav buttons and ${contentPages.length} pages.`);

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                if(button.id === 'add-new-file-button') return;
                
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const targetId = button.getAttribute('data-target');
                contentPages.forEach(page => page.classList.add('hidden'));
                
                const targetPage = document.getElementById(targetId);
                if (targetPage) {
                    targetPage.classList.remove('hidden');
                }
            });
        });
        console.log("DEBUG: UI Navigation setup complete.");


        // --- PHẦN 2: LOGIC KẾT NỐI WEBSOCKET ---
        console.log("DEBUG: Starting WebSocket connection...");
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('✅ Successfully connected to the WebSocket server.');
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
        
                // Dùng switch-case để gọi hàm cập nhật tương ứng
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
                // Bỏ qua các tin nhắn không xác định
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
    });

} catch (e) {
    console.error("--- FATAL ERROR ---:", e);
}