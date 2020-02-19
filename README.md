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
  <code>express-session</code>
  <code>moment</code>
  <code>striptags</code>
  <code>dotenv</code>
</p>

## 分頁說明
<h3>前台</h3>

<h4>1. 首頁</h4>
<p>呈現最新的部落格文章，在Navbar上文章分類方便尋找同種類文章。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/index.png)

<h4>2. 文章</h4>
<p>點選各篇文章可以在內文上方點選同分類文章，在下方有Disqus留言板可進行留言。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/article.png)

<h4>3. 錯誤頁面</h4>
<p>當使用者任意修改不存在的網址時會出現錯誤頁面，且於下方提供轉址回首頁的服務。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/error.png)

<h3>後台</h3>

<h4>1. 登入</h4>
<p>在Navbar右上方從後台管理進入會先要求登入，點選其他後台功能會被導回登入頁面，若未註冊按下註冊按鈕後會到註冊頁面。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/login.png)

<p>本專案已由單一帳號鎖住uid故其他帳號註冊後是無法登入的。(@app.js)</p>

```js
const authCheck = function (req, res, next) {
  console.log('middleware', req.session);
  if (req.session.uid === process.env.ADMIN_UID) {
    //在環境變數設定自己的uid使別人沒有權限無法登入
    return next();
  } else {
    return res.redirect('/auth/signin');
  }
}
```

<p>若輸入錯誤帳號密碼會以flash在上方出現錯誤訊息提示。connect-flash是Node.js的一個模組，簡單來說flash是一個必須搭配express-session使用的暫存器，暫存器裡面的值會被以[陣列]形式存在session中且使用過一次即被清空，這種特性相當適合當作網站的提示訊息。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/signin-error.png)

<p>發出登入錯誤訊息。(@auth.js)</p>

```js
router.post('/signin', function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  firebaseClient.auth().signInWithEmailAndPassword(email, password)
  .then(function(user) {
    req.session.uid = user.user.uid;
    req.session.mail = req.body.email;
    req.flash('signin', '歡迎回來！');
    // console.log('session', req.session.uid);
    res.redirect('/dashboard');
  })
  .catch(function(error){
    console.log(error);
    req.flash('error', error.message);//在此處傳出signin錯誤訊息
    res.redirect('/auth/signin');
  })
})
```

<p>接收登入錯誤訊息。(@auth.js)</p>

```js
router.get('/signin', function(req, res){
  const session = req.session.uid ? true : false;
  const messages = req.flash('error');//讀取signin錯誤訊息
  // console.log(messages);
  const logout = req.flash('logout');
  res.render('dashboard/signin', {
    session,
    logout,
    hasLogout: logout.length > 0,  
    messages,//在此將signin錯誤訊息渲染到前端
    hasErrors: messages.length > 0,
  })
})
```

<h4>2. 文章管理</h4>
<p>登入成功後會轉址到文章管理頁面，內文上有flash會顯示一次歡迎回來的文字。可以對文章進行新增、編輯和刪除。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/archives.png)

<h4>3. 草稿</h4>
<p>新增一篇文章若還沒有完稿或尚未要發布時，可以選擇存在草稿區，如此就不會顯示在前台。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/draft.png)

<h4>4. 刪除文章提示</h4>
<p>當使用者按下刪除按鈕時再次跳出提示確認之後才能刪除，避免不小心刪除文章。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/delete.png)

<p>使用jQuery加上JS的confirm確認框，在按下確定之後才會繼續後續行為。jQuery(1.5版之後)中ajax的done是一種於請求成功時調用的回呼選項構造函式，類似於promise，對應函式為請求失敗時的fail和請求結束時的always。</p>

```js
$(document).ready(function(){
    $('.deletePost').on('click', function(e){
      e.preventDefault();
      var id = $(this).data('id');
      var title = $(this).data('title');
      if (confirm('確認是否刪除' + title )){
        $.ajax({
          url: '/dashboard/article/delete/' + id,
          method: 'POST', 
        }).done(function(response){
          console.log(response)
          window.location = '/dashboard'
        })
      }
    })
  })
```

<h4>5. 分類管理</h4>
<p>分類管理可以對文章類別進行新增、編輯和刪除。若文章沒有類別則會顯示沒有分類。</p>

![image](https://github.com/Kuaruou/Node-Blog-Roys/blob/master/img/categories.png)

## Project setup
```
npm install
```
<p>提醒：每個人需要自行操作Firebase來獲得私密金鑰且連結資料庫，由於.env內含安全敏感資訊也請不要將之上傳到Github，本專案環境變數設定於Heroku專案中。( Repository --> Setting --> Config Vars )</p>



