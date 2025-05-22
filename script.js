document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;

    // If editing, remove the old item first
    if (window.editingItem) {
        updateTotal(window.editingItem, true); // revert old value
        window.editingItem.remove();
        window.editingItem = null;
    }

    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `
        <span>${description} - ${category} - ${type} - <span class="amount">${amount}</span></span>
        <div>
            <button class="edit-btn" type="button">Edit</button>
            <button class="delete-btn" type="button">Delete</button>
        </div>
    `;

    // Store data for editing
    expenseItem.dataset.description = description;
    expenseItem.dataset.amount = amount;
    expenseItem.dataset.category = category;
    expenseItem.dataset.type = type;

    document.getElementById('expenseList').appendChild(expenseItem);

    updateTotal(expenseItem);

    document.getElementById('expenseForm').reset();
});

// Update total when adding or removing
function updateTotal(item, revert = false) {
    let totalExpenses = parseFloat(document.getElementById('totalExpenses').textContent);
    const amount = parseFloat(item.dataset.amount);
    const type = item.dataset.type;
    if (type === 'credit') {
        totalExpenses += revert ? -amount : amount;
    } else if (type === 'debit') {
        totalExpenses += revert ? amount : -amount;
    }
    document.getElementById('totalExpenses').textContent = totalExpenses;
}

// Event delegation for edit and delete
document.getElementById('expenseList').addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
        updateTotal(li, true); // revert value
        li.remove();
    }

    if (e.target.classList.contains('edit-btn')) {
        document.getElementById('description').value = li.dataset.description;
        document.getElementById('amount').value = li.dataset.amount;
        document.getElementById('category').value = li.dataset.category;
        document.getElementById('type').value = li.dataset.type;
        window.editingItem = li;
    }
});

