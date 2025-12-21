const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Prefer environment variable; fallback to a sensible default with an explicit DB name
    const uri = process.env.MONGODB_URI || 'mongodb+srv://orelus_db_user:Admin123@cluster0.szo0cmo.mongodb.net/sms?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('⚠️ Continuing without DB for API testing...');
    // Don't exit process, just continue
  }
};

module.exports = connectDB;
