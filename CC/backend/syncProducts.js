const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = 'mongodb+srv://rishwanthasokan29:Rishwanth@woocommerce.zksusye.mongodb.net/woocommerce';

const syncProducts = async () => {
  const baseUrl = 'https://wp-multisite.convertcart.com/wp-json/wc/v3/products';
  const consumerKey = 'ck_af82ae325fbee1c13f31eb26148f4dea473b0f77';
  const consumerSecret = 'cs_2d8cc467c5b91a80f5ed18dd3c282ee8299c9445';

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const response = await axios.get(baseUrl, {
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      },
    });

    // Format according to your schema
    const formatted = response.data.map((p) => ({
      id: p.id,
      title: p.name,
      price: p.price,
      stock_status: p.stock_status,
      stock_quantity: p.stock_quantity,
      category: p.categories?.[0]?.name || null,
      tags: p.tags?.map((t) => t.name) || [],
      on_sale: p.on_sale,
      created_at: new Date(p.date_created),
    }));

    // Clear old products, insert new
    await Product.deleteMany({});
    await Product.insertMany(formatted);

    console.log('Products synced successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Sync error:', error.message);
    mongoose.disconnect();
  }
};

syncProducts();
