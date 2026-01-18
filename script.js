document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('add-item-form');
    const searchInput = document.getElementById('search-item');
    const inventoryBody = document.getElementById('inventory-body');
    const filterCategory = document.getElementById('filter-category');
    const sortQuantityBtn = document.getElementById('sort-quantity-btn');

    const STORAGE_KEY = 'inventoryApp.inventory';

    // Default data if localStorage is empty
    const initialInventory = [
        { id: 1, name: 'Laptop', category: 'Electronics', quantity: 15, price: 1200 },
        { id: 2, name: 'Office Chair', category: 'Furniture', quantity: 30, price: 150 },
        { id: 3, name: 'Coffee Beans', category: 'Food', quantity: 100, price: 25 },
        { id: 4, name: 'T-Shirt', category: 'Clothing', quantity: 200, price: 20 }
    ];

    // Load from localStorage or use initial data
    let inventory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialInventory;
    let isSortAscending = true;

    // --- Utility Functions ---
    const saveInventory = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    };

    const getNextId = () => (inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1);

    // --- Main Render Function ---
    const renderInventory = () => {
        inventoryBody.innerHTML = ''; // Clear existing table rows

        let filteredInventory = inventory;

        // Apply search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredInventory = filteredInventory.filter(item =>
                item.name.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        const category = filterCategory.value;
        if (category !== 'all') {
            filteredInventory = filteredInventory.filter(item => item.category === category);
        }

        // Apply sorting
        filteredInventory.sort((a, b) => {
            return isSortAscending ? a.quantity - b.quantity : b.quantity - a.quantity;
        });

        // Create and append table rows
        filteredInventory.forEach(item => {
            const row = document.createElement('tr');
            row.dataset.id = item.id;

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td class="quantity">${item.quantity}</td>
                <td class="price">${item.price.toFixed(2)}</td>
                <td>
                    <button class="action-btn edit-btn" aria-label="Edit ${item.name}">Edit</button>
                    <button class="action-btn delete-btn" aria-label="Delete ${item.name}">Delete</button>
                </td>
            `;
            inventoryBody.appendChild(row);
        });
    };

    // --- Event Handlers ---

    // Add a new item
    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('item-name').value;
        const category = document.getElementById('item-category').value;
        const quantity = parseInt(document.getElementById('item-quantity').value, 10);
        const price = parseFloat(document.getElementById('item-price').value);

        // Basic validation
        if (!name || !category || isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0) {
            alert('Please fill out all fields correctly. Quantity and Price cannot be negative.');
            return;
        }

        const newItem = { id: getNextId(), name, category, quantity, price };
        inventory.push(newItem);
        addItemForm.reset();
        saveInventory();
        renderInventory();
    });

    // Handle actions (Edit, Delete, Save) on the table
    inventoryBody.addEventListener('click', (e) => {
        const target = e.target;
        const row = target.closest('tr');

        // Guard against clicks on the table body but not on a specific row
        if (!row || !row.dataset.id) return;

        const id = parseInt(row.dataset.id, 10);

        if (target.classList.contains('delete-btn')) {
            const itemToDelete = inventory.find(item => item.id === id);
            if (itemToDelete && window.confirm(`Are you sure you want to delete "${itemToDelete.name}"?`)) {
                inventory = inventory.filter(item => item.id !== id);
                saveInventory();
                renderInventory();
            }
        }

        if (target.classList.contains('edit-btn')) {
            const quantityCell = row.querySelector('.quantity');
            const priceCell = row.querySelector('.price');

            const currentQuantity = quantityCell.textContent;
            const currentPrice = priceCell.textContent;

            quantityCell.innerHTML = `<input type="number" value="${currentQuantity}" min="0">`;
            priceCell.innerHTML = `<input type="number" value="${currentPrice}" min="0" step="0.01">`;

            target.textContent = 'Save';
            target.classList.remove('edit-btn');
            target.classList.add('save-btn');
        } else if (target.classList.contains('save-btn')) {
            const quantityInput = row.querySelector('.quantity input');
            const priceInput = row.querySelector('.price input');

            const newQuantity = parseInt(quantityInput.value, 10);
            const newPrice = parseFloat(priceInput.value);

            if (isNaN(newQuantity) || newQuantity < 0 || isNaN(newPrice) || newPrice < 0) {
                alert('Invalid quantity or price. Values cannot be negative.');
                return;
            }

            const item = inventory.find(item => item.id === id);
            item.quantity = newQuantity;
            item.price = newPrice;

            saveInventory();
            renderInventory(); // Re-render to show updated, non-editable values
        }
    });

    // Filter items by category
    filterCategory.addEventListener('change', renderInventory);

    // Search items by name
    searchInput.addEventListener('input', renderInventory);

    // Sort items by quantity
    sortQuantityBtn.addEventListener('click', () => {
        isSortAscending = !isSortAscending;
        sortQuantityBtn.textContent = `Sort by Quantity (${isSortAscending ? 'Asc' : 'Desc'})`;
        renderInventory();
    });

    // --- Initial Render ---
    renderInventory();
});
