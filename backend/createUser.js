require("dotenv").config(); // Load environment variables
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("./models/admin");
const connectDb = require("./config/connectDb");

const createAdmin = async () => {
  await connectDb();

  const email = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    
    await newAdmin.save();

    console.log("Admin created successfully!");
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
