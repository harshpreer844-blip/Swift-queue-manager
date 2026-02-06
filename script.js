// Initialize Queue from LocalStorage or empty array
let queue = JSON.parse(localStorage.getItem('swiftQueue')) || [];
let currentToken = localStorage.getItem('currentToken') || "--";

const nowServingEl = document.getElementById('now-serving');
const nextTokenEl = document.getElementById('next-token');
const countEl = document.getElementById('queue-count');
const listEl = document.getElementById('queue-list');

// Function to update the UI
function updateUI() {
    nowServingEl.innerText = currentToken;
    countEl.innerText = queue.length;
    nextTokenEl.innerText = queue.length > 0 ? `Token #${queue[0]}` : "None";
    
    // Render the list
    listEl.innerHTML = queue.map(t => `<li>Token #${t}</li>`).join('');
    
    // Save to LocalStorage
    localStorage.setItem('swiftQueue', JSON.stringify(queue));
    localStorage.setItem('currentToken', currentToken);
}

// Add Customer
document.getElementById('add-btn').addEventListener('click', () => {
    const newToken = queue.length > 0 ? queue[queue.length - 1] + 1 : (parseInt(currentToken) + 1 || 1);
    queue.push(newToken);
    updateUI();
});

// Next Customer
document.getElementById('next-btn').addEventListener('click', () => {
    if (queue.length > 0) {
        currentToken = queue.shift(); // Remove first element and make it current
        updateUI();
    } else {
        alert("No customers in line!");
    }
});

// Initial Load
updateUI();
