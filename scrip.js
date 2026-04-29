// Base de datos de productos
const products = [
    // Arreglos Florales
    {
        id: 1,
        name: "Arreglo Floral Romántico",
        price: 59.99,
        category: "flores",
        description: "Rosas rojas",
        //cambia eso de html a img
        image: "img/Arreglo-floral.png"
    },
    {
        id: 2,
        name: "Bouquet Primavera",
        price: 49.99,
        category: "flores",
        description: "Flores silvestres coloridas variadas",
        image: "img/fotoprueba.png"
    },
    {
        id: 3,
        name: "Arreglo Tulipanes",
        price: 54.99,
        category: "flores",
        description: "12 tulipanes frescos y aromáticos",
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Girasoles Alegres",
        price: 44.99,
        category: "flores",
        description: "Ramo de girasoles dorados brillantes",
        image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Orquídeas Exóticas",
        price: 89.99,
        category: "flores",
        description: "Orquídeas frescas en arreglo especial",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Flores Pastel",
        price: 69.99,
        category: "flores",
        description: "Arreglo con flores en tonos pastel",
        image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e76?w=400&h=300&fit=crop"
    },
    
    // Regalos
    {
        id: 7,
        name: "Caja de Chocolates Gourmet",
        price: 34.99,
        category: "regalos",
        description: "Bombones artesanales 12 piezas",
        image: "https://images.unsplash.com/photo-1599599810694-5ac4dd64e76f?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Set de Velas Aromáticas",
        price: 45.99,
        category: "regalos",
        description: "3 velas aromáticas premium",
        image: "https://images.unsplash.com/photo-1596552182016-551fef89fcfd?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Botella Perfume Premium",
        price: 79.99,
        category: "regalos",
        description: "Perfume elegante de lujo 100ml",
        image: "https://images.unsplash.com/photo-1505252585461-04db1921b902?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Cesta de Regalos Deluxe",
        price: 99.99,
        category: "regalos",
        description: "Cesta con varios productos premium",
        image: "https://images.unsplash.com/photo-1607023814726-f68db924d4d1?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Joyero Decorativo",
        price: 54.99,
        category: "regalos",
        description: "Joyero de madera tallada artesanal",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Pulsera de Plata",
        price: 89.99,
        category: "regalos",
        description: "Pulsera plateada elegante con diseño",
        image: "https://images.unsplash.com/photo-1515562141207-5dca3b3a3178?w=400&h=300&fit=crop"
    },
    {
        id: 13,
        name: "Album de Fotos",
        price: 34.99,
        category: "regalos",
        description: "Álbum para 200 fotos con diseño",
        image: "https://images.unsplash.com/photo-1606933248051-5ce98adc7da0?w=400&h=300&fit=crop"
    },
    {
        id: 14,
        name: "Marco Decorativo",
        price: 24.99,
        category: "regalos",
        description: "Marco dorado para fotos 10x15",
        image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop"
    },
    
    // Peluches
    {
        id: 15,
        name: "Oso de Peluche Gigante",
        price: 79.99,
        category: "peluches",
        description: "Oso XXL suave 80cm de altura",
        image: "https://images.unsplash.com/photo-1589922582032-a98cdb2a7ae1?w=400&h=300&fit=crop"
    },
    {
        id: 16,
        name: "Unicornio Mágico",
        price: 49.99,
        category: "peluches",
        description: "Unicornio de peluche multicolor",
        image: "https://images.unsplash.com/photo-1585647347386-72b5e7ef0b67?w=400&h=300&fit=crop"
    },
    {
        id: 17,
        name: "Perrito Adorable",
        price: 39.99,
        category: "peluches",
        description: "Peluche perro suave con accesorios",
        image: "https://images.unsplash.com/photo-1612001843886-e3aa5ec90eca?w=400&h=300&fit=crop"
    },
    {
        id: 18,
        name: "Gato Tierno",
        price: 34.99,
        category: "peluches",
        description: "Gato de peluche con ojos grandes",
        image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop"
    },
    {
        id: 19,
        name: "Conejito Rosa",
        price: 29.99,
        category: "peluches",
        description: "Conejito suave rosado con orejas",
        image: "https://images.unsplash.com/photo-1585647347386-72b5e7ef0b67?w=400&h=300&fit=crop"
    },
    {
        id: 20,
        name: "Pandas Gemelos",
        price: 59.99,
        category: "peluches",
        description: "Set de 2 pandas abrazados",
        image: "https://images.unsplash.com/photo-1570408109519-0f1d4151ceb0?w=400&h=300&fit=crop"
    },
    {
        id: 21,
        name: "Mariposa Colorida",
        price: 24.99,
        category: "peluches",
        description: "Peluche mariposa con colores vibrantes",
        image: "https://images.unsplash.com/photo-1593642632459-d977a0ecc119?w=400&h=300&fit=crop"
    },
    {
        id: 22,
        name: "Pingüino Divertido",
        price: 34.99,
        category: "peluches",
        description: "Pingüino de peluche movible",
        emoji: "🐧"
    }
];

// Carrito
let cart = [];
let filteredProducts = [...products];
let currentCategory = "all";
let currentMaxPrice = 150;

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
    loadCartFromLocalStorage();
    updateCartCount();
});

// Cargar productos en la página
function loadProducts(productsToShow) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    if (productsToShow.length === 0) {
        productContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No hay productos que coincidan con tus criterios</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-btn" onclick="addToCart(${product.id})">Agregar</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Filtrar por categoría
function filterByCategory(category) {
    currentCategory = category;
    updateActiveButton(event.target);
    applyFilters();
}

// Filtrar por precio
function filterByPrice() {
    const priceRange = document.getElementById('priceRange');
    currentMaxPrice = parseInt(priceRange.value);
    document.getElementById('priceValue').textContent = currentMaxPrice;
    applyFilters();
}

// Aplicar todos los filtros
function applyFilters() {
    filteredProducts = products.filter(product => {
        const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
        const priceMatch = product.price <= currentMaxPrice;
        return categoryMatch && priceMatch;
    });

    // Aplicar búsqueda también
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput)
        );
    }

    loadProducts(filteredProducts);
}

// Búsqueda en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            applyFilters();
        });
    }
});

// Actualizar botón activo
function updateActiveButton(button) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} agregado al carrito`);
}

// Mostrar notificación
function showNotification(message) {
    // Simple notificación (puede mejorarse)
    console.log('✓ ' + message);
}

// Mostrar/Ocultar carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCartToLocalStorage();
        updateCartCount();
        updateCartDisplay();
    }
}

// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
}

// Actualizar número de artículos en carrito
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">Tu carrito está vacío</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="width: 30px; text-align: center; line-height: 25px;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Limpiar carrito
function clearCart() {
    if (confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
        cart = [];
        saveCartToLocalStorage();
        updateCartCount();
        updateCartDisplay();
    }
}

// Procesar compra
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const adelanto = total * 0.50;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="border: 2px solid #ff69b4; max-width: 500px;">
            <h2>¿Qué deseas hacer? ✨</h2>
            <p>Selecciona una opción para continuar con tu pedido:</p>
            
            <div style="display: flex; gap: 10px; flex-direction: column; margin: 20px 0;">
                <button id="optSeparar" style="background: #ff69b4; color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    🔒 Reservar con el 50% ($${adelanto.toFixed(2)})
                </button>
                
                <button id="optInformacion" style="background: #f0f0f0; color: #333; padding: 15px; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ℹ️ Solo pedir información
                </button>
            </div>

            <input type="email" id="userEmail" placeholder="Tu correo electrónico" style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid #ddd;">
            <input type="tel" id="userPhone" placeholder="Tu número de celular" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
            
            <button class="modal-close" style="background:#4c2882; width: 100%;" onclick="this.parentElement.parentElement.remove()">Volver</button>
        </div>
    `;
    
    document.body.appendChild(modal);

    const miWhatsApp = "51907577763"; // Cambia por tu número real

    // Lógica para RESERVAR
    document.getElementById('optSeparar').onclick = function() {
        enviarWhatsApp("RESERVA (50% Adelanto)", miWhatsApp, total, adelanto);
    };

    // Lógica para INFORMACIÓN
    document.getElementById('optInformacion').onclick = function() {
        enviarWhatsApp("SOLICITUD DE INFORMACIÓN", miWhatsApp, total, null);
    };
}

// Función auxiliar para construir el mensaje
function enviarWhatsApp(tipo, telefono, total, adelanto) {
    const email = document.getElementById('userEmail').value;
    const fono = document.getElementById('userPhone').value;

    if(!email || !fono) {
        alert("Por favor completa tus datos antes de continuar");
        return;
    }

    let mensaje = `*${tipo}*%0A%0A`;
    mensaje += `Hola, estoy interesado en:%0A`;
    cart.forEach(item => {
        mensaje += `- ${item.quantity}x ${item.name}%0A`;
    });

    if(adelanto !== null) {
        mensaje += `%0AMonto Total: $${total.toFixed(2)}%0A`;
        mensaje += `*Monto de Adelanto: $${adelanto.toFixed(2)}*%0A`;
    } else {
        mensaje += `%0AQuisiera más detalles sobre estos productos.`;
    }

    mensaje += `%0A%0A*Cliente:* ${email}%0A*Contacto:* ${fono}`;
    
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
