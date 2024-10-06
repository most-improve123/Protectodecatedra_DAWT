const productStock = JSON.parse(localStorage.getItem('productStock')) || {};
const initialInventory = 1000;

// Inicializar la base de datos simulada con 1000 productos si no existe
if (Object.keys(productStock).length === 0) {
    for (let i = 1; i <= 1000; i++) {
        productStock[`Producto ${i}`] = {
            price: (Math.random() * 100).toFixed(2),
            quantity: initialInventory,
            sold: 0
        };
    }
    localStorage.setItem('productStock', JSON.stringify(productStock));
}

document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);

    const cartItem = document.createElement('li');
    cartItem.textContent = `${productName} - $${productPrice.toFixed(2)} x ${productQuantity}`;
    cartItem.addEventListener('click', function () {
        removeItemFromCart(cartItem, productPrice * productQuantity);
    });

    document.getElementById('cart').appendChild(cartItem);

    updateTotal(productPrice * productQuantity);
    addToInventory(productName, productPrice, productQuantity);
    updateCartCount();
    addToCartDetails(productName, productPrice, productQuantity);
    updateStockReport(productName, productQuantity);
    document.getElementById('productForm').reset();
});

document.getElementById('applyDiscount').addEventListener('click', function () {
    const discount = parseFloat(document.getElementById('discount').value);
    applyDiscount(discount);
});

document.getElementById('saveSales').addEventListener('click', function () {
    saveSales();
});

document.getElementById('newProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const newProductName = document.getElementById('newProductName').value;
    const newProductPrice = parseFloat(document.getElementById('newProductPrice').value);
    const newProductQuantity = parseInt(document.getElementById('newProductQuantity').value);

    productStock[newProductName] = {
        price: newProductPrice.toFixed(2),
        quantity: newProductQuantity,
        sold: 0
    };

    localStorage.setItem('productStock', JSON.stringify(productStock));
    alert('Producto agregado exitosamente.');
    document.getElementById('newProductForm').reset();
});

document.getElementById('viewReportButton').addEventListener('click', function () {
    window.location.href = 'reporte.html';
});


localStorage.setItem('productStock', JSON.stringify(productStock));
alert('Ventas guardadas exitosamente.');
updateStockReportTable();


function addToInventory(name, price, quantity) {
    const discount = parseFloat(document.getElementById('discount').value);
    const discountedPrice = price - (price * (discount / 100));

    const inventoryBody = document.getElementById('inventoryBody');
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const priceCell = document.createElement('td');
    priceCell.textContent = `$${price.toFixed(2)}`;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = quantity;

    const discountedPriceCell = document.createElement('td');
    discountedPriceCell.textContent = `$${(discountedPrice * quantity).toFixed(2)}`;

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(discountedPriceCell);

    inventoryBody.appendChild(row);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart').children.length;
    document.getElementById('cartCount').textContent = cartCount;
}

function addToCartDetails(name, price, quantity) {
    const cartItems = document.getElementById('cartItems');
    const item = document.createElement('li');
    item.textContent = `${name} - $${price.toFixed(2)} x ${quantity}`;
    cartItems.appendChild(item);
}

function updateStockReport(name, quantity) {
    if (productStock[name]) {
        productStock[name].sold += quantity;
        productStock[name].quantity -= quantity;
    } else {
        productStock[name] = {
            price: 0,
            quantity: initialInventory - quantity,
            sold: quantity
        };
    }

    updateStockReportTable();
}

function updateStockReportTable() {
    const stockReportBody = document.getElementById('stockReportBody');
    stockReportBody.innerHTML = '';

    for (const productName in productStock) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = productName;

        const soldCell = document.createElement('td');
        soldCell.textContent = productStock[productName].sold;

        const remainingCell = document.createElement('td');
        remainingCell.textContent = productStock[productName].quantity;

        row.appendChild(nameCell);
        row.appendChild(soldCell);
        row.appendChild(remainingCell);

        stockReportBody.appendChild(row);
    }
}


const tablaProductos = document.getElementById('tablaProductos');

// Genera las filas de la tabla
resultadoBusqueda.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <!-- Agrega más celdas según tus necesidades -->
    `;
    tablaProductos.querySelector('tbody').appendChild(fila);
});
const tbody = document.querySelector('tbody');

// Generamos las filas de la tabla
productos.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.vendidos}</td>
                <td>${producto.productosobrante}</td>
            `;
    tbody.appendChild(fila);
});