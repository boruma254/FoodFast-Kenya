import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/fooddelivery_kenya",
    );

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    const products = [
      // Burgers
      {
        name: "Classic Burger",
        description:
          "Juicy beef patty with lettuce, tomato, and our special sauce",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        price: 450,
        category: "Burgers",
        availability: true,
        preparationTime: 15,
        vendorName: "Burger House",
        featured: true,
        rating: 4.5,
        reviews: 120,
      },
      {
        name: "Double Cheese Burger",
        description: "Two beef patties with double cheese and crispy bacon",
        image:
          "https://images.unsplash.com/photo-1550547990-40c140f3c5d8?w=500",
        price: 650,
        category: "Burgers",
        availability: true,
        preparationTime: 20,
        vendorName: "Burger House",
        featured: true,
        rating: 4.7,
        reviews: 95,
      },

      // Pizza
      {
        name: "Margherita Pizza",
        description:
          "Fresh tomato sauce, mozzarella, and basil on crispy crust",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500",
        price: 750,
        category: "Pizza",
        availability: true,
        preparationTime: 25,
        vendorName: "Pizza Palace",
        featured: true,
        rating: 4.6,
        reviews: 145,
      },
      {
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni and mozzarella cheese",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=500",
        price: 850,
        category: "Pizza",
        availability: true,
        preparationTime: 25,
        vendorName: "Pizza Palace",
        featured: false,
        rating: 4.4,
        reviews: 98,
      },

      // Chicken
      {
        name: "Fried Chicken Plate",
        description: "Crispy fried chicken with fries and coleslaw",
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc46e?w=500",
        price: 550,
        category: "Chicken",
        availability: true,
        preparationTime: 20,
        vendorName: "Chicken Express",
        featured: true,
        rating: 4.5,
        reviews: 200,
      },
      {
        name: "Grilled Chicken Breast",
        description: "Tender grilled chicken breast with seasonal vegetables",
        image:
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500",
        price: 650,
        category: "Chicken",
        availability: true,
        preparationTime: 18,
        vendorName: "Chicken Express",
        featured: false,
        rating: 4.6,
        reviews: 87,
      },

      // Ugali
      {
        name: "Ugali with Sukuma Wiki",
        description: "Cornmeal staple served with sautéed collard greens",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        price: 350,
        category: "Ugali",
        availability: true,
        preparationTime: 15,
        vendorName: "Local Kitchen",
        featured: false,
        rating: 4.3,
        reviews: 156,
      },
      {
        name: "Ugali with Beef Stew",
        description: "Cornmeal served with rich beef stew",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        price: 450,
        category: "Ugali",
        availability: true,
        preparationTime: 20,
        vendorName: "Local Kitchen",
        featured: false,
        rating: 4.4,
        reviews: 134,
      },

      // Samosas
      {
        name: "Meat Samosas (3pcs)",
        description: "Crispy pastry filled with spiced minced meat",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
        price: 150,
        category: "Samosas",
        availability: true,
        preparationTime: 10,
        vendorName: "Snack Station",
        featured: false,
        rating: 4.4,
        reviews: 220,
      },
      {
        name: "Vegetable Samosas (3pcs)",
        description: "Crispy pastry filled with seasoned vegetables",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
        price: 120,
        category: "Samosas",
        availability: true,
        preparationTime: 10,
        vendorName: "Snack Station",
        featured: false,
        rating: 4.2,
        reviews: 178,
      },

      // Drinks
      {
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        image:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
        price: 150,
        category: "Drinks",
        availability: true,
        preparationTime: 5,
        vendorName: "Juice Bar",
        featured: false,
        rating: 4.5,
        reviews: 89,
      },
      {
        name: "Iced Coffee",
        description: "Cold brew coffee with ice and cream",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
        price: 200,
        category: "Drinks",
        availability: true,
        preparationTime: 5,
        vendorName: "Coffee Corner",
        featured: false,
        rating: 4.6,
        reviews: 112,
      },

      // Desserts
      {
        name: "Chocolate Cake Slice",
        description: "Rich chocolate cake with chocolate frosting",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        price: 250,
        category: "Desserts",
        availability: true,
        preparationTime: 5,
        vendorName: "Cake House",
        featured: false,
        rating: 4.7,
        reviews: 145,
      },
      {
        name: "Strawberry Cheesecake",
        description: "Creamy cheesecake with fresh strawberries",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        price: 300,
        category: "Desserts",
        availability: true,
        preparationTime: 5,
        vendorName: "Cake House",
        featured: false,
        rating: 4.8,
        reviews: 98,
      },
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded successfully`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

seedProducts();
