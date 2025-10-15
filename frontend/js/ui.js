// Lấy các phần body của tất cả các bảng
const heapTableBody = document.getElementById('heap-table-body');
const taskTableBody = document.getElementById('task-table-body');
const queueTableBody = document.getElementById('queue-table-body');
const semaphoreTableBody = document.getElementById('semaphore-table-body');
const timerTableBody = document.getElementById('timer-table-body');

// Hàm cập nhật bảng Heap
function updateHeapTable(heapData) {
    heapTableBody.innerHTML = '';
    const usage = (heapData.used / (heapData.used + heapData.free) * 100).toFixed(2);
    heapTableBody.innerHTML = `
        <tr>
            <td>${heapData.start}</td>
            <td>${heapData.end}</td>
            <td>${heapData.used} B</td>
            <td>${heapData.free} B</td>
            <td>${usage}%</td>
        </tr>
    `;
}

// Hàm cập nhật bảng Task
function updateTaskTable(tasks) {
    taskTableBody.innerHTML = '';
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.address}</td>
            <td>${task.name}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>N/A</td><td>N/A</td><td>N/A</td><td>N/A</td><td>N/A</td><td>N/A</td>
            <td>${task.stackPeak || 'N/A'}</td>
            <td>${task.runtime}</td>
        `;
        taskTableBody.appendChild(row);
    });
}

// Hàm cập nhật bảng Queue
function updateQueueTable(queues) {
    queueTableBody.innerHTML = '';
    queues.forEach(q => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${q.name}</td>
            <td>${q.currentLength}</td>
            <td>${q.maxLength}</td>
            <td>${q.itemSize} B</td>
            <td>N/A</td>
            <td>N/A</td>
        `;
        queueTableBody.appendChild(row);
    });
}

// Hàm cập nhật bảng Semaphore
function updateSemaphoreTable(semaphores) {
    semaphoreTableBody.innerHTML = '';
    semaphores.forEach(s => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.type}</td>
            <td>${s.currentLength}</td>
            <td>${s.maxLength}</td>
            <td>${s.mutexHolder}</td>
            <td>N/A</td><td>N/A</td><td>N/A</td>
        `;
        semaphoreTableBody.appendChild(row);
    });
}

// Hàm cập nhật bảng Timer
function updateTimerTable(timers) {
    timerTableBody.innerHTML = '';
    timers.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.name}</td>
            <td>N/A</td>
            <td>${t.id}</td>
            <td>${t.type}</td>
            <td>${t.period}</td>
            <td>N/A</td>
            <td>${t.state}</td>
            <td>N/A</td>
        `;
        timerTableBody.appendChild(row);
    });
}