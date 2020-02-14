# Node-Blog-Roys

### [[網站連結]](https://kuaruou.github.io/Ecom-Vintage/#/) ###
![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/cover.png)

## 簡介
<h4>本部落格為<code>Node.js</code>練習作品，主要的功能有:</h4>
<h4>前台</h4>
  <ul>
    <li>以卡片形式展示商品，先簡約的只呈現圖片、商品和價格，再以Modal呈現詳細介紹。</li>
    <li>設計搜尋欄和商品分類方便快速尋找所要的商品。</li>
    <li>購物車可對於購買商品進行確認及刪除，同時可套用優惠碼獲得折扣，並用VeeValidate對用戶進行表單驗證，避免資料不符格式或缺漏。</li>
    <li>管理者可以透過帳號密碼登入系統認證直接進入後台。</li>
    <li>使用video.js在網頁中嵌入影片且自動播放。</li>
  </ul>
<h4>後台</h4>
  <ul>
    <li>利用Vue Router製作SPA單頁應用減少載入負擔。</li>
    <li>商品列表可對商品進行編輯、上下架、新增刪除，管理圖片、價格、內容及是否啟用等功能。</li>
    <li>訂單列表可以檢視客戶資訊、購買項目、付款情形。</li>
    <li>優惠券列表可以編輯和新增刪除優惠券，並可編輯優惠券的名稱、折扣數、到期日及是否啟用。</li>
  </ul>

<h4>技術</h4>
<p>
  <code>Node.js</code>
  <code>Express</code>
  <code>Bootstrap 4</code>
  <code>SCSS</code>
  <code>jQuery</code>
  <code>video.js</code>
  <code>Font Awesome</code>
  <code>VeeValidate</code>
  <code>vue-axios</code>
  <code>Evnet Bus</code>
  <code>Props & Emit</code>
</p>

## 分頁說明

<h3>前台</h3>

<h4>首頁</h4>
<p>使用跑馬燈輪播形象照和標語，對消費者傳達店家理念塑造品牌形象。Navbar固定於上方，方便用戶隨時找尋不同頁面。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/cover.png)

<p>商品以卡片式呈現，於圖片上動態覆蓋資訊品名價格等資訊，再以Modal呈現詳細內容。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/shop.png)

<p>商品以卡片式呈現，於圖片上動態覆蓋資訊品名價格等資訊，再以Modal呈現詳細內容。</p>

![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/modal.png)

<h4>購物車</h4>
<p>第一步：進行購物資料確認以及輸入優惠折扣碼，可刪除不想要的商品。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/cart-step1.png)

<p>第二步：輸入客戶資料，且有表單驗證功能避免缺漏或者格式不符合的情形。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/cart-step2.png)

<p>第三步：確認商品資料及客戶資料無誤再行結帳。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/cart-step3.png)

<h4>登入頁面</h4>
<p>在登入時有簡易的驗證功能。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/login.png)

<h4>關於店家</h4>
<p>在網頁中嵌入影片且自動播放，介紹店家和主理人的故事背景以及店面的位置及聯絡方式。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/about.png)

<h3>後台</h3>

<h4>商品列表</h4>
<p>商品列表可以新增、刪除、編輯和啟用產品。</p>

![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/products.png)

<h4>商品列表</h4>
<p>呈現商品的各項資訊，可以新增、刪除、編輯和啟用產品。</p>

![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/products.png)

<p>各項商品以Modal來進行新增及編輯。</p>

![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/product-modal.png)

<h4>訂單列表</h4>
<p>呈現訂單購買的品項等基本資訊。</p>


![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/orders.png)

<h4>優惠券列表</h4>
<p>呈現優惠券的各項資訊，可以新增、刪除、編輯和啟用優惠券。</p>

![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/coupons.png)

<p>各別優惠券以Modal來進行新增及編輯。</p>

![image](https://github.com/Kuaruou/Ecom-Vintage/blob/master/web-img/coupon-modal.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


