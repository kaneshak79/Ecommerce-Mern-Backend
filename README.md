LUXORA – Premium E-Commerce Backend API

LUXORA is a full-featured, scalable E-Commerce backend system built using the MERN Stack (MongoDB, Express.js, Node.js).
It provides secure authentication, product management, order processing, cart system, wishlist, reviews, and payment integration support.

Designed to power a modern marketplace connecting buyers and sellers seamlessly.

🚀 Key Features
🔐 Authentication & Authorization

Secure user registration & login (JWT-based)

Role-based access control (Buyer / Seller)

Password encryption using bcrypt

Password reset & update functionality

🛍️ Product Management (Seller)

Create, update, and delete products

Upload product images

Assign categories, pricing, and descriptions

Advanced search & filtering (price, category, keywords)

Individual product detail view

🛒 Shopping Cart (Buyer)

Add / remove products from cart

Update product quantity dynamically

Real-time cart total calculation

Persistent cart per user

📦 Order Management

Secure checkout flow with shipping details

Order creation and confirmation

Order history for buyers

Seller-side order tracking & management

💳 Payment Integration

Razorpay payment gateway integration

Secure transaction handling

Payment verification support

Order status update after payment

⭐ Reviews & Ratings

Buyers can submit product reviews

View ratings and feedback per product

❤️ Wishlist System

Add/remove favorite products

Save products for later purchase

👤 User Profile Management

View and update user profile

Manage personal and store information

🛠️ Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Database	MongoDB + Mongoose
Authentication	JWT, bcrypt
File Upload	Multer
Payment Gateway	Razorpay
API Testing	Postman
📁 Project Structure
backend/
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── reviewController.js
│   └── wishlistController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   ├── Review.js
│   └── Wishlist.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   └── wishlistRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorMiddleware.js
│
├── config/
│   └── db.js
│
├── server.js
└── .env
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/luxora-backend.git
cd luxora-backend
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file in root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
4️⃣ Run the Server
npm run dev

Server runs at:

http://localhost:5000
📡 API Endpoints
🔐 Auth Routes

POST /api/auth/register – Register user

POST /api/auth/login – Login user

🛍️ Product Routes

GET /api/products – Get all products

POST /api/products/create – Add product (Seller)

PUT /api/products/:id – Update product

DELETE /api/products/:id – Delete product

GET /api/products/search – Search products

🛒 Cart Routes

GET /api/cart – Get user cart

POST /api/cart/add – Add to cart

DELETE /api/cart/remove – Remove from cart

📦 Order Routes

POST /api/orders/create – Create order

GET /api/orders/user – User order history

GET /api/orders/seller – Seller order dashboard

⭐ Review Routes

POST /api/reviews – Add review

GET /api/reviews/:productId – Get reviews

❤️ Wishlist Routes

POST /api/wishlist/add – Add wishlist item

GET /api/wishlist – Get wishlist

💳 Payment Routes

POST /api/payment/create-order – Create Razorpay order

POST /api/payment/verify – Verify payment

🌐 Deployment
Backend Hosting (Render)

Push code to GitHub

Connect repository to Render

Add environment variables

Deploy as Node.js Web Service

📌 Best Practices Followed

Modular MVC architecture

Secure authentication system

Role-based route protection

Scalable API design

Clean and maintainable code structure

👨‍💻 Author

LUXORA – Premium E-Commerce Platform
Built with ❤️ using MERN Stack

⭐ Future Enhancements

Admin dashboard

Product analytics

Email notifications

Coupon & discount system

AI product recommendations
