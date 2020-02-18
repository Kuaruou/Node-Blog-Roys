# Node-Blog-Roys

### [[網站連結]](https://royshideout-node-blog.herokuapp.com/) ###
![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/index.png)

## 簡介
<h4>本部落格為<code>Node.js</code>練習作品，主要的功能有:</h4>
<h4>前台</h4>
  <ul>
    <li>首頁最新文章呈現。</li>
    <li>分類項目置於上方Navbar，亦可從文章上方分類路徑點選進入。</li>
    <li>文章內可用Disqus留言板進行留言。</li>
  </ul>
<h4>後台</h4>
  <ul>
    <li>文章管理可以進行各篇文章內容編輯、新增以及刪除。</li>
    <li>分類管理裡面檢視新增刪除分類名稱和路徑。</li>
    <li>可以進行註冊、登入和登出。</li>
  </ul>

<h4>技術</h4>
<p>
  <code>Node.js</code>
  <code>Express</code>
  <code>Bootstrap 4</code>
  <code>Firebase</code>
  <code>Heroku</code>
  <code>EJS</code>
  <code>connect-flash</code>
  <code>moment</code>
  <code>striptags</code>
  <code>dotenv</code>
</p>

## 分頁說明
<h3>前台</h3>

<h4>首頁</h4>
<p>呈現最新的部落格文章，在Navbar上文章分類方便尋找同種類文章。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/index.png)

<h4>文章</h4>
<p>點選各篇文章可以在內文上方點選同分類文章，在下方有Disqus留言板可進行留言。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/article.png)

<h3>後台</h3>

<h4>登入</h4>
<p>在Navbar右上方從後台管理進入會先要求登入，點選其他後台功能會被導回登入頁面，若未註冊按下註冊按鈕後會到註冊頁面。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/login.png)

<h4>文章管理</h4>
<p>登入成功後會轉址到文章管理頁面，內文上有flash會顯示一次歡迎回來的文字。可以對文章進行新增、編輯和刪除。</p>
<p>(connect-flash是Node.js的一個模組，簡單來說flash是一個暫存器，且暫存器裡面的值使用過一次即被清空，這種特性相當適合當作網站的提示訊息。)</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/archives.png)

<h4>分類管理</h4>
<p>分類管理可以對文章類別進行新增、編輯和刪除。若文章沒有類別則會顯示沒有分類。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/categories.png)

## Project setup
```
npm install
```
<p>提醒：每個人需要自行操作Firebase來獲得私密金鑰且連結資料庫，由於.env內含安全敏感資訊也請不要將之上傳到Github。</p>



