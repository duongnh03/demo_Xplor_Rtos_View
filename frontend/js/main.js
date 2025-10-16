try {
    console.log("DEBUG: Script started.");

    window.addEventListener('DOMContentLoaded', () => {
        
        console.log("DEBUG: DOM Content Loaded. Starting UI setup.");
        
        // --- PART 1: UI Navigation ---
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


        // PART 2: WebSocket connection
        setupWebSocket();
    });

} catch (e) {
    console.error("--- FATAL ERROR ---:", e);
}