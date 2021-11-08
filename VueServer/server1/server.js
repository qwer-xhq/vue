const express = require('express')
const history = require('connect-history-api-fallback');
const app = express()
app.use(history())
app.use(express.static(__dirname+'/public'))


app.listen(5001,(err)=>{
  console.log(err);
  if(!err) console.log('服务器启动成功了！')
})