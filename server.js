const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { Order } = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ضع رابط الاتصال بـ MongoDB هنا
mongoose.connect('mongodb://localhost:27017/restaurant');

app.use(express.static('public'));
app.use(express.json());

// جلب الطلبات
app.get('/api/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// إرسال طلب جديد مع تنبيه لحظي
app.post('/api/orders', async (req, res) => {
    const order = await Order.create(req.body);
    io.emit('newOrder', order); 
    res.json(order);
});

server.listen(3000, () => console.log('السيرفر يعمل على http://localhost:3000'));
