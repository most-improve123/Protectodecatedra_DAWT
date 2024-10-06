// buscador.js
const productos = [
    // Aquí coloca los datos de tus productos
    // Por ejemplo:
    {nombre: 'Galletas Pindi', precio: 20, cantidad: 40, vendidos: 10},
    // Agrega más productos...
];

function buscarProducto() {
    const inputTexto = document.getElementById('inputBusqueda').value.toLowerCase();
    const resultado = productos.find(producto =>
        producto.nombre.toLowerCase().includes(inputTexto)
    );

    if (resultado) {
        document.getElementById('resultadoBusqueda').textContent = `Producto encontrado: ${resultado.nombre}`;
    } else {
        document.getElementById('resultadoBusqueda').textContent = 'Producto no encontrado';
    }
}
