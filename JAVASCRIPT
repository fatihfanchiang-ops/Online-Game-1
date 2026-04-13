// 商品数据 - LTBrown社区专属商品
const products = [
    { id: 1, name: "Community Water", price: 2.99, desc: "5 Gallon Purified Water" },
    { id: 2, name: "Snack Pack", price: 5.99, desc: "Local Community Snacks" },
    { id: 3, name: "Fresh Bread", price: 3.49, desc: "Daily Baked Bread" },
    { id: 4, name: "Milk Bottle", price: 1.99, desc: "Fresh Dairy Milk" },
    { id: 5, name: "Fruit Box", price: 7.99, desc: "Seasonal Fresh Fruits" },
    { id: 6, name: "Vegetable Bag", price: 4.99, desc: "Organic Vegetables" }
];

// 购物车 & 全局变量
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const productGrid = document.getElementById('product-grid');
const checkoutBtn = document.getElementById('checkout-btn');
const orderStatus = document.getElementById('order-status');
const statusMessage = document.getElementById('status-message');

// 渲染商品列表
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// 添加商品到购物车
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    cart.push(product);
    updateCart();
}

// 更新购物车UI
function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = total.toFixed(2);
}

// 下单 + 配送流程模拟
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Please add items to cart first!');
        return;
    }

    // 显示订单状态
    orderStatus.style.display = 'block';
    statusMessage.textContent = 'Order placed successfully! Delivery in progress...';
    
    // 配送步骤
    const steps = ['step1', 'step2', 'step3', 'step4'];
    let currentStep = 0;

    // 激活第一步
    document.getElementById(steps[currentStep]).classList.add('active');
    currentStep++;

    // 模拟配送流程（定时器）
    const deliveryInterval = setInterval(() => {
        if (currentStep < steps.length) {
            document.getElementById(steps[currentStep]).classList.add('active');
            currentStep++;
        } else {
            clearInterval(deliveryInterval);
            statusMessage.textContent = '✅ Order Delivered Successfully! Thank you for shopping with LTBrown Community!';
            // 清空购物车
            cart = [];
            updateCart();
        }
    }, 2000);
});

// 初始化页面
renderProducts();
