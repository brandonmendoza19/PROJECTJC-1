// Selecciona el botón del carrito y el contenedor de productos del carrito
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

// Agrega evento de clic al botón del carrito para mostrar/ocultar el contenedor de productos
btnCart.addEventListener('click', () => {
containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */

// Selecciona el contenedor de información del producto en el carrito
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Selecciona el contenedor de todos los productos
const productsList = document.querySelector('.container-items');

// Arreglo para almacenar todos los productos agregados al carrito
let allProducts = [];

// Selecciona el elemento que muestra el total a pagar
const valorTotal = document.querySelector('.total-pagar');

// Selecciona el elemento que muestra el contador de productos
const countProducts = document.querySelector('#contador-productos');

// Selecciona el elemento que muestra el mensaje de carrito vacío
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Agrega evento de clic a la lista de productos para agregar productos al carrito
productsList.addEventListener('click', e => {
  // Verifica si el elemento clickeado es un botón de agregar al carrito
if (e.target.classList.contains('btn-add-cart')) {
    // Obtiene la información del producto clickeado
    const product = e.target.parentElement;

    // Crea un objeto con la información del producto
    const infoProduct = {
      quantity: 1, // Cantidad inicial del producto
      title: product.querySelector('h2').textContent, // Título del producto
      price: product.querySelector('p').textContent, // Precio del producto
    };

    // Verifica si el producto ya existe en el carrito
    const exits = allProducts.some(product => product.title === infoProduct.title);

    // Si el producto ya existe, incrementa su cantidad
    if (exits) {
    const products = allProducts.map(product => {
        if (product.title === infoProduct.title) {
        product.quantity++;
        return product;
        } else {
        return product;
        }
    });
    allProducts = [...products];
    } 
    // Si el producto no existe, lo agrega al carrito
    else {
    allProducts = [...allProducts, infoProduct];
    }

    // Actualiza la vista del carrito
    showHTML();
}
});

// Agrega evento de clic al contenedor de productos del carrito para eliminar productos
rowProduct.addEventListener('click', e => {
  // Verifica si el elemento clickeado es un ícono de cierre
if (e.target.classList.contains('icon-close')) {
    // Obtiene la información del producto a eliminar
    const product = e.target.parentElement;
    const title = product.querySelector('p').textContent;

    // Elimina el producto del carrito
    allProducts = allProducts.filter(product => product.title !== title);

    // Actualiza la vista del carrito
    showHTML();
}
});

// Función para actualizar la vista del carrito
const showHTML = () => {
  // Verifica si el carrito está vacío
if (!allProducts.length) {
    // Muestra el mensaje de carrito vacío y oculta el contenedor de productos
    cartEmpty.classList.remove('hidden');
    rowProduct.classList.add('hidden');
    cartTotal.classList.add('hidden');
} else {
    // Oculta el mensaje de carrito vacío y muestra el contenedor de productos
    cartEmpty.classList.add('hidden');
    rowProduct.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
}

  // Limpia el contenedor de productos
rowProduct.innerHTML = '';

  // Inicializa variables para calcular el total
let total = 0;
let totalOfProducts = 0;

  // Recorre el arreglo de productos y actualiza la vista
allProducts.forEach(product => {
    // Crea un contenedor para el producto
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');

    // Agrega la información del producto al contenedor
    containerProduct.innerHTML = `
    <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
    </div>
            <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-close"
    >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
        />
    </svg>
    `;

    // Agrega el contenedor del producto al contenedor de productos
    rowProduct.append(containerProduct);

    // Calcula el total a pagar y el total de productos
    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
});

  // Actualiza el total a pagar y el contador de productos
valorTotal.innerText = `$${total}`;
countProducts.innerText = totalOfProducts;
};