const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  table: String,
  items: Array,
  total: Number,
  status: { type: String, default: 'new' }
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: { type: String },
  role: { type: String, enum: ['admin', 'cashier', 'kitchen'] }
});

module.exports = {
  Order: mongoose.model('Order', OrderSchema),
  User: mongoose.model('User', UserSchema)
};
