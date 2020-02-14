
# 第一次部屬
# git init 
# heroku create 

git add .
git commit -m 'deploy'
git push heroku master

#上傳環境變數
#安裝插件 heroku-config https://github.com/xavdid/heroku-config
#heroku config:push

#更改資料庫名稱後修改新名稱的git路徑
#git remote rm heroku
#heroku git:remote -a newname