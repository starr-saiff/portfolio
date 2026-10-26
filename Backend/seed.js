require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Portfolio = require('./models/Portfolio');

const MONGODB_URI = process.env.MONGODB_URI;

// Admin credentials come from your .env (never hardcode passwords)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Set ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD in Backend/.env before seeding.');
  process.exit(1);
}
const sampleUser = { username: ADMIN_USERNAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' };

// Portfolio content generated from Frontend/src/data (run: node generate-seed-data.js)
const samplePortfolio = require('./seedData.json');

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create admin user
    console.log('👤 Creating admin user...');
    const user = await User.create(sampleUser);
    console.log(`✅ Admin user created: ${user.username} (${user.email})`);

    // Create portfolio data
    console.log('📁 Creating portfolio data...');
    const portfolio = await Portfolio.create(samplePortfolio);
    console.log('✅ Portfolio data created');
    console.log(`   Profile: ${portfolio.profile.name}`);
    console.log(`   Projects: ${portfolio.projects.length}`);
    console.log(`   Skills: ${portfolio.skills.length} categories`);
    console.log(`   Experience: ${portfolio.experience.length} positions`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log(`   Username: ${sampleUser.username}`);
    console.log(`   Email: ${sampleUser.email}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
