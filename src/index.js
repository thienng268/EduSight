const express = require('express')
const session = require('express-session');
const hbs = require('hbs');
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine;
const path = require('path')
const route = require('./routes');
const db = require('./config/db');
const app = express()
const port = 3000

//connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'your_secret_key', // Một chuỗi bí mật được sử dụng để ký session ID cookie
  resave: false,             // Đặt là false để tránh lưu session lại nếu không có thay đổi
  saveUninitialized: false,  // Đặt là false để không tạo session cho request không được lưu trữ
  cookie: {
    secure: false,           // Đặt là true nếu bạn đang sử dụng HTTPS
    maxAge: 3600000          // Thời gian sống của cookie, đây là 1 giờ
  }
}));
//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars({extname: '.hbs',}),);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
hbs.registerHelper('objectToArray', function(object) {
  return Object.values(object);
});