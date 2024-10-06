// buscador.js
const productos = [
    // Aquí coloca los datos de tus productos
    // Por ejemplo:
    {nombre: 'Galletas Pindi', precio: 20, cantidad: 40, vendidos: 10, productosobrante: 30,},
    {nombre: 'Buen nacho', precio: 50, cantidad: 40, vendidos: 10, productosobrante: 30,},
    {nombre: 'Piguis', precio: 70, cantidad: 56, vendidos: 19, productosobrante: 37,},
    {nombre: 'Quesi Trix', precio: 90, cantidad: 300, vendidos: 106, productosobrante: 194,},
    {nombre: 'Frijolí', precio: 23, cantidad: 400, vendidos: 367, productosobrante: 33,},
    {nombre: 'Gomitas', precio: 67, cantidad: 600, vendidos: 543, productosobrante: 57,},
    {nombre: 'Chocolates', precio: 89, cantidad: 800, vendidos: 564, productosobrante: 236,},
    {nombre: 'Ranchitas', precio: 56, cantidad: 900, vendidos: 765, productosobrante: 135,},
    {nombre: 'Mani', precio: 90, cantidad: 200, vendidos: 120, productosobrante: 80,},
    {nombre: 'Elotitos', precio: 23, cantidad: 700, vendidos: 234, productosobrante: 466,},
];


function buscarProducto() {
    const inputTexto = document.getElementById('inputBusqueda').value.toLowerCase();
    const resultado = productos.find(producto =>
        producto.nombre.toLowerCase().includes(inputTexto)
    );

    if (resultado) {
        document.getElementById('resultadoBusqueda').textContent = `Producto encontrado ----- |${resultado.nombre}|----- |Precio|  ${resultado.precio}  --------- |Cantidad| ${resultado.cantidad}  -----|Vendidos| ${resultado.vendidos} -----   |Producto que sobro| ${resultado.productosobrante}`;

    } else {
        document.getElementById('resultadoBusqueda').textContent = 'Producto no encontrado';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const productSearchForm = document.getElementById('productSearchForm');
    const productNameInput = document.getElementById('productName');
    const searchResultsDiv = document.getElementById('searchResults');


    productSearchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        const searchTerm = productNameInput.value.toLowerCase();

        // Filtramos los productos que coinciden con el término de búsqueda
        const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(searchTerm));

        // Mostramos los resultados en el div de búsqueda
        searchResultsDiv.innerHTML = '';
        if (filteredProducts.length === 0) {
            searchResultsDiv.textContent = 'No se encontraron resultados.';
        } else {
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('p');
                resultItem.textContent = `${product.nombre} - Precio: $${product.precio} - Cantidad disponible: ${product.cantidad}`;
                searchResultsDiv.appendChild(resultItem);
            });
        }
    });
});


const productBody = document.getElementById('productBody');

// Obtén una referencia a la tabla
const tabla = document.getElementById('tablaProductos');

// Función para calcular el producto que sobra
function calcularProductoSobrante(cantidad, vendidos) {
    return cantidad - vendidos;
}


// Función para llenar la tabla con los datos
function llenarTabla() {

    const filas = tabla.querySelectorAll('tbody tr');

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        const nombre = celdas[0].textContent;
        const precio = parseInt(celdas[1].textContent);
        const cantidad = parseInt(celdas[2].textContent);
        const vendidos = parseInt(celdas[3].textContent);

        // Calcula el producto que sobra
        const sobrante = calcularProductoSobrante(cantidad, vendidos);

        // Agrega la celda con el producto que sobra
        const celdaSobrante = document.createElement('td');
        celdaSobrante.textContent = sobrante;
        fila.appendChild(celdaSobrante);
    });
}

// Llama a la función para llenar la tabla al cargar la página
window.addEventListener('load', llenarTabla);


// Función para calcular el producto que sobra
function calculateSobra(cantidad, vendidos) {
    return cantidad - vendidos;
}

// Función para renderizar los productos en la tabla
function renderProducts() {
    productBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td contenteditable>${product.nombre}</td>
                <td contenteditable>${product.precio}</td>
                <td contenteditable>${product.cantidad}</td>
                <td contenteditable>${product.vendidos}</td>
                <td>${calculateSobra(product.cantidad, product.vendidos)}</td>
            `;
        productBody.appendChild(row);

        // Evento para guardar los cambios al editar
        row.addEventListener('input', () => {
            products[index].nombre = row.cells[0].textContent;
            products[index].precio = parseFloat(row.cells[1].textContent);
            products[index].cantidad = parseInt(row.cells[2].textContent);
            products[index].vendidos = parseInt(row.cells[3].textContent);
            row.cells[4].textContent = calculateSobra(products[index].cantidad, products[index].vendidos);

            // Guardamos los datos en LocalStorage
            localStorage.setItem('products', JSON.stringify(products));
        });
    });
}

// Cargamos los datos desde LocalStorage al iniciar la página
const savedProducts = localStorage.getItem('products');
if (savedProducts) {
    products = JSON.parse(savedProducts);
}

// Llamamos a la función para renderizar los productos
renderProducts();
;


