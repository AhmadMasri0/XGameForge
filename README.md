# 🎮 XGameForge

**XGameForge** is a full-stack web application designed to manage and streamline a gaming center’s operations. It supports online reservations, e-commerce, and bar/café item browsing—built with the **MERN** stack and deployed on **AWS** infrastructure.

### 🌐 Live Demo
🔗 [https://xgameforge.com](https://xgameforge.com)

---

## 🧩 Features

### 👥 User Interface
- Browse and purchase gaming-related products
- Book gaming sessions (VR, Console, PlayStation, etc.)
- Explore the **GameFuel** café menu
- Authentication: sign up/login with secure JWT-based auth
- View profile, edit details, and manage past orders/bookings

### 🔐 Admin Permissions
Admins have elevated privileges using the same UI:
- Add/Edit/Delete:
  - 🛍️ Products (Games, Consoles, Accessories, etc.)
  - 🍔 Bar items (GameFuel menu)
  - 🎮 Booking sessions
- Manage:
  - 📦 Orders (mark as delivered or cancel)
  - 📅 Reservations (view, filter, update status)
- View customer details, control inventory and more

### 💳 Stripe Payment
- Integrated Stripe Payments (with PaymentIntent API)
- Orders are only saved upon successful payment
- Supports **cash on delivery** as well
- Test card: `4242 4242 4242 4242`

---

## 🛠️ Tech Stack

### Frontend:
- **React** + **Material UI**
- **React Router** + **Framer Motion**
- Hosted on **AWS S3** + **CloudFront**

### Backend:
- **Node.js**, **Express.js**, **MongoDB Atlas**
- **Stripe** API for payments
- **Express-session**, JWT for auth
- Deployed with **AWS Elastic Beanstalk**

### Storage:
- Images uploaded to **AWS S3**

---

## 📁 Project Structure

```bash
XGameForge/
│
├── client/         # React frontend
│   └── src/
│       ├── pages/
│       ├── components/
│       └── contexts/
│
├── server/         # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── utils/
│
├── .env            # Environment variables
└── README.md
```
### 🚀 **Getting Started**

## **Clone & Run Locally**

git clone https://github.com/AhmadMasri0/XGameForge.git
npm install
npm start

📦 Deployment
Frontend: Upload build/ from React to AWS S3 bucket and serve via CloudFront
Backend: Deploy Express server files to AWS Elastic Beanstalk
MongoDB: Hosted on MongoDB Atlas
DNS: Custom domains via Route 53 + SSL using ACM

🔒 Security Practices
All API routes are secured with JWT and role-based access
HTTPS is enforced using a load balancer (ALB)
Environment variables stored securely in .env
S3 bucket permissions controlled via IAM policies

📧 Test Instructions
Use a valid email to register. For test payments, use:

- Card Number: 4242 4242 4242 4242
- Expiry: any future date
- CVC: any 3 digits

