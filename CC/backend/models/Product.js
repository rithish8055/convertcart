const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: String,             
  stock_status: String,      
  stock_quantity: Number,    
  category: String,          
  tags: [String],  
  on_sale: Boolean,
  created_at: Date
});

module.exports = mongoose.model('Product', productSchema);
