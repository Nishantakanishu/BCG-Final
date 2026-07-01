const mongoose = require("mongoose");
const User = require("../auth/user.model");
const Product = require("../product/product.model");
const bcrypt = require("bcryptjs");

const mongoDbUri = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    // Seed Admin
    const adminExists = await User.findOne({ email: "admin@bcg.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@bcg.com",
        phone: "1234567890",
        password: "adminpassword",
        isAdmin: true,
      });
      console.log("Default Admin user created: admin@bcg.com / adminpassword");
    }

    // Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const initialProducts = [
        {
          name: "Chinker & Cement",
          url: "cement.jpeg", // Using static string mapping to frontend assets
          shortDesc: "High-strength clinker and cement for reliable large-scale construction projects.",
          longDesc: "High-performance clinker and cement manufactured under strict quality control standards to meet the demands of modern construction. Offers excellent binding strength, durability, and resistance to harsh weather conditions. Widely used in residential buildings, commercial structures, road construction, and infrastructure projects. Available in bulk quantities with consistent quality to support uninterrupted project execution."
        },
        {
          name: "Rice",
          url: "rice.jpg",
          shortDesc: "Premium bulk rice with uniform grains, rich aroma, and dependable supply.",
          longDesc: "Carefully sourced bulk rice from trusted farms and processing units to ensure superior quality and freshness. Processed using modern milling techniques to preserve natural taste, aroma, and nutritional value. Ideal for wholesalers, hotels, caterers, food processing industries, and exporters. Consistent grain size, low breakage, and reliable large-volume availability make it a cost-effective and trusted choice."
        },
        {
          name: "Fresh Chilled Lamb Meat",
          url: "lamb.webp",
          shortDesc: "Hygienically processed fresh lamb meat supplied with cold-chain assurance.",
          longDesc: "Freshly processed and chilled lamb meat handled under strict hygienic and temperature-controlled conditions. Maintains natural tenderness, juiciness, and authentic flavor while meeting food safety standards. Suitable for restaurants, meat distributors, catering businesses, and export markets. Bulk supply with proper cold-chain handling ensures freshness, quality, and customer satisfaction."
        },
        {
          name: "Website Development",
          url: "website.jpg", // Placeholder
          shortDesc: "Professional, responsive, scalable, and SEO-friendly websites built using modern technologies.",
          longDesc: "Professional, responsive, scalable, and SEO-friendly websites built using modern technologies."
        },
        {
          name: "Mobile App Development",
          url: "mobile.jpg", // Placeholder
          shortDesc: "Cross-platform and native mobile application development for Android and iOS with modern UI/UX.",
          longDesc: "Cross-platform and native mobile application development for Android and iOS with modern UI/UX."
        },
        {
          name: "Renewable Energy Solutions",
          url: "renewable_energy.png",
          shortDesc: "Solar panels, wind turbines, and energy storage systems for sustainable power generation.",
          longDesc: "Comprehensive renewable energy products including high-efficiency solar photovoltaic panels, vertical-axis wind turbines, and advanced battery energy storage systems. Sourced from certified global manufacturers, our renewable energy solutions cater to residential, commercial, and industrial applications. We offer end-to-end supply including procurement, quality inspection, and logistics support. Ideal for governments, energy developers, EPC contractors, and businesses transitioning to clean energy. All products comply with international IEC and ISO standards for safety and performance."
        },
        {
          name: "Agriculture Machinery",
          url: "agriculture_machinery.png",
          shortDesc: "Modern tractors, harvesters, and precision farming equipment for high-yield agriculture.",
          longDesc: "A wide range of modern agriculture machinery including powerful tractors, combine harvesters, seed drills, irrigation systems, and precision farming tools. Our machinery is sourced from globally recognized manufacturers ensuring durability, fuel efficiency, and ease of maintenance. Suitable for large-scale farms, agri-businesses, cooperatives, and government agricultural programmes. We provide complete procurement support, pre-shipment inspections, and after-sales documentation to ensure seamless delivery across international markets."
        }
      ];
      await Product.insertMany(initialProducts);
      console.log("Initial products seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

const connectDb = async () => {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("Database connected successfully");
    await seedDatabase();
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDb;