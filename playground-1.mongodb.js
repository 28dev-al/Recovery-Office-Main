/* eslint-disable no-undef */
/* MongoDB Playground - Recovery Office Database Setup */
// This script will create the Recovery Office database and collections with sample data

// Select the Recovery Office database
use('recovery-office');

// ================================
// 1. CREATE SERVICES COLLECTION
// ================================

// Clear existing services (if any)
db.getCollection('services').deleteMany({});

// Insert Recovery Office services with proper MongoDB ObjectIds
db.getCollection('services').insertMany([
  {
    name: "Cryptocurrency Recovery",
    description: "Specialized recovery for lost or stolen cryptocurrency including Bitcoin, Ethereum, and altcoins",
    duration: 75,
    price: 750,
    icon: "https://images2.imgbox.com/ba/78/wNqfvrmO_o.png",
    category: "recovery",
    isActive: true,
    slug: "cryptocurrency-recovery",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Investment Fraud Recovery",
    description: "Comprehensive recovery service for investment fraud cases including Ponzi schemes and fake brokers",
    duration: 90,
    price: 500,
    icon: "https://images2.imgbox.com/76/6d/BSPbxZsR_o.png",
    category: "recovery",
    isActive: true,
    slug: "investment-fraud-recovery",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Financial Scam Recovery",
    description: "Recovery assistance for various financial scams including romance scams and advance fee fraud",
    duration: 60,
    price: 400,
    icon: "https://images2.imgbox.com/e7/0f/yfQ894Tl_o.png",
    category: "recovery",
    isActive: true,
    slug: "financial-scam-recovery",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Regulatory Complaint Assistance",
    description: "Professional help with filing complaints to regulatory bodies and financial authorities",
    duration: 45,
    price: 300,
    icon: "https://images2.imgbox.com/f2/e9/tDfdd3sR_o.png",
    category: "compliance",
    isActive: true,
    slug: "regulatory-complaint-assistance",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

console.log("✅ Services collection created and populated");

// ================================
// 2. CREATE CLIENTS COLLECTION
// ================================

// Create clients collection with indexes
db.getCollection('clients').createIndex({ email: 1 }, { unique: true });
db.getCollection('clients').createIndex({ phone: 1 });
db.getCollection('clients').createIndex({ createdAt: -1 });

console.log("✅ Clients collection created with indexes");

// ================================
// 3. CREATE BOOKINGS COLLECTION
// ================================

// Create bookings collection with indexes
db.getCollection('bookings').createIndex({ clientId: 1 });
db.getCollection('bookings').createIndex({ serviceId: 1 });
db.getCollection('bookings').createIndex({ date: 1 });
db.getCollection('bookings').createIndex({ status: 1 });
db.getCollection('bookings').createIndex({ reference: 1 }, { unique: true });

console.log("✅ Bookings collection created with indexes");

// ================================
// 4. CREATE AVAILABILITY COLLECTION
// ================================

// Create availability slots for the next 30 days
const today = new Date();
const availabilitySlots = [];

for (let i = 1; i <= 30; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  
  // Skip weekends
  if (date.getDay() === 0 || date.getDay() === 6) continue;
  
  // Create time slots from 9 AM to 6 PM
  for (let hour = 9; hour < 18; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    availabilitySlots.push({
      date: date.toISOString().split('T')[0],
      timeSlot: `${startTime}-${endTime}`,
      isAvailable: true,
      maxBookings: 1,
      currentBookings: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

db.getCollection('availability').insertMany(availabilitySlots);

console.log(`✅ Availability collection created with ${availabilitySlots.length} time slots`);

// ================================
// 5. VERIFY DATABASE SETUP
// ================================

console.log("\n📊 Database Setup Summary:");
console.log(`Services: ${db.getCollection('services').countDocuments()}`);
console.log(`Clients: ${db.getCollection('clients').countDocuments()}`);
console.log(`Bookings: ${db.getCollection('bookings').countDocuments()}`);
console.log(`Availability Slots: ${db.getCollection('availability').countDocuments()}`);

// Get a sample service with its ObjectId
const sampleService = db.getCollection('services').findOne();
console.log(`\n🔑 Sample Service ObjectId: ${sampleService._id}`);
console.log(`Sample Service Name: ${sampleService.name}`);

console.log("\n✅ Recovery Office database setup complete!");
