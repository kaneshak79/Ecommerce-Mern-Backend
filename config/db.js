// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`DB Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;


// // import mongoose from "mongoose";

// // const connectDB = async () => {
// //   try {

// //     const conn = await mongoose.connect(process.env.MONGO_URI);

// //     console.log(`MongoDB Connected: ${conn.connection.host}`);
// //     console.log(`Database Name: ${conn.connection.name}`);

// //   } catch (error) {
// //     console.error(`DB Error: ${error.message}`);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;



// // import mongoose from "mongoose";

// // const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect(process.env.MONGO_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log("MongoDB Connected:", conn.connection.host);
// //     console.log("Database Name:", conn.connection.name); // <-- important
// //   } catch (err) {
// //     console.error("MongoDB connection failed:", err);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI);
          console.log("MongoDB Connected Successfully");
      } catch (error) {
          console.error("MongoDB Connection Failed:", error);
        }
};

export default connectDB;
        