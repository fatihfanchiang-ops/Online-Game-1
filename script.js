<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LTBrown Store - Sign In / Sign Up</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        .auth-wrap {
            height: 100vh;
            background: #2c3e50;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .auth-box {
            background: #fff;
            width: 100%;
            max-width: 400px;
            padding: 35px;
            border-radius: 10px;
            box-shadow: 0 0 15px #0003;
            position: relative;
        }
        .tab-btns {
            display: flex;
            margin-bottom: 25px;
        }
        .tab-btn {
            flex: 1;
            border: none;
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
            background: #eee;
        }
        .tab-btn.active {
            background: #27ae60;
            color: #fff;
        }
        .auth-form {
            display: none;
        }
        .auth-form.show {
            display: block;
        }
        .input-group {
            margin-bottom: 18px;
        }
        .input-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
        }
        .input-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 15px;
        }
        .submit-btn {
            width: 100%;
            padding: 12px;
            border: none;
            background: #27ae60;
            color: #fff;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }
        /* 验证码行：输入框 + 图片 */
        .captcha-row {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .captcha-row input {
            flex: 1;
        }
        #captchaCanvas {
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
        }
        /* 注册协议弹窗 */
        .agreement-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .modal-content {
            background: white;
            width: 90%;
            max-width: 500px;
            padding: 30px;
            border-radius: 10px;
            position: relative;
        }
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
            color: #666;
        }
        .agreement-text {
            height: 200px;
            overflow-y: auto;
            border: 1px solid #ddd;
            padding: 15px;
            margin: 15px 0;
            line-height: 1.6;
        }
        .checkbox-group {
            margin: 15px 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .modal-btn {
            width: 100%;
            padding: 12px;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        /* 商店样式 */
        #store {
            display: none;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #2c3e50;
            color: white;
            padding: 30px 0;
        }
        .cart-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .total {
            font-size: 1.2rem;
            font-weight: bold;
            margin: 10px 0;
        }
        .checkout-btn {
            background: #27ae60;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }
        .products h2 {
            margin-bottom: 20px;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
        }
        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        .product-img {
            width: 120px;
            height: 120px;
            object-fit: contain;
            margin: 0 auto 10px;
        }
        .product-card h3 {
            margin: 10px 0;
        }
        .product-card button {
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        .cart-items {
            margin: 10px 0;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        .cart-item-info {
            flex: 1;
        }
        .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 10px;
        }
        .cart-item-quantity button {
            width: 28px;
            height: 28px;
            border: none;
            background: #3498db;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }
        .cart-item-remove {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
        }
        .order-status {
            background: #f1f1f1;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .delivery-tracker {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .step {
            text-align: center;
            padding: 10px;
            background: white;
            border-radius: 5px;
            width: 23%;
        }
        .step.active {
            background: #27ae60;
            color: white;
        }
        /* ===== Admin Panel Styles ===== */
        .admin-panel{
            background:#fff3cd;
            border:2px solid #ffc107;
            padding:24px;
            border-radius:10px;
            margin:20px 0;
            display:none;
        }
        .admin-panel h2{
            color:#856404;
            margin-bottom:16px;
        }
        .admin-row{
            display:grid;
            grid-template-columns:1fr 1fr 1fr 1fr;
            gap:10px;
            margin-bottom:12px;
        }
        .admin-row input{
            padding:9px;
            border:1px solid #bbb;
            border-radius:4px;
        }
        .admin-btn-add{
            background:#27ae60;
            color:white;
            border:none;
            padding:9px 14px;
            border-radius:4px;
            cursor:pointer;
        }
        .admin-item{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:10px;
            background:#fff;
            margin:8px 0;
            border-radius:6px;
        }
        .admin-btn-edit{
            background:#3498db;
            color:white;
            border:none;
            padding:6px 10px;
            border-radius:4px;
            cursor:pointer;
            margin-right:6px;
        }
        .admin-btn-del{
            background:#e74c3c;
            color:white;
            border:none;
            padding:6px 10px;
            border-radius:4px;
            cursor:pointer;
        }
    </style>
</head>
<body>
<!-- 注册协议弹窗 -->
<div class="agreement-modal" id="agreementModal">
    <div class="modal-content">
        <span class="modal-close" onclick="closeModal()">&times;</span>
        <h2>用户注册协议</h2>
        <div class="agreement-text" id="dynamicAgreementContent">
            <!-- 动态加载协议内容 -->
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="agreeCheck">
            <label for="agreeCheck">我已阅读并同意以上注册协议</label>
        </div>
        <button class="modal-btn" onclick="confirmAgreement()">确认同意并注册</button>
    </div>
</div>
<!-- 登录注册区域 -->
<div class="auth-wrap" id="authPage">
    <div class="auth-box">
        <div class="tab-btns">
            <button class="tab-btn active" onclick="switchTab('signin')">Sign In</button>
            <button class="tab-btn" onclick="switchTab('signup')">Sign Up</button>
        </div>
        <div class="auth-form show" id="signinForm">
            <div class="input-group">
                <label>Username</label>
                <input type="text" id="loginUser" placeholder="Enter username">
            </div>
            <div class="input-group">
                <label>Phone Number</label>
                <input type="tel" id="loginPhone" placeholder="Enter your phone number">
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type="password" id="loginPwd" placeholder="Enter password">
            </div>
            <!-- ✅ 验证码 -->
            <div class="input-group">
                <label>Verification Code</label>
                <div class="captcha-row">
                    <input type="text" id="loginCaptcha" placeholder="Enter code" maxlength="4">
