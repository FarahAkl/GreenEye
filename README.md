# 🌿 GreenEye - AI-Powered Agriculture Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Higher yields, lower loss.**  
> GreenEye is an AI-powered agriculture platform designed to empower farmers with smarter decisions before damage occurs. By integrating advanced monitoring, marketplace capabilities, and financial management, GreenEye bridges the gap between technology and traditional farming.

---

## 🚀 Key Features

### 👤 User / Farmer Experience
- **Smart Marketplace**: Browse and purchase agricultural products with advanced filtering and search.
- **AI Monitoring**: Insights and alerts to prevent crop damage (Future/Core Integration).
- **Secure Payments**: Integrated Stripe payment gateway for seamless transactions.
- **Order Tracking**: Comprehensive order history and real-time status updates.
- **Profile Management**: Personalized settings and account security.

### 🚜 Supplier Dashboard
- **Product Management**: Multi-step wizard for adding and editing products with detailed specifications.
- **Order Fulfillment**: Track and manage incoming orders from customers.
- **Financial Wallet**: Real-time balance tracking, transaction history, and withdrawal requests.
- **Analytics**: Sales performance and inventory oversight.

### 🛡️ Admin Management
- **Verification System**: Approve or reject new users and suppliers to ensure platform integrity.
- **Content Moderation**: Review pending products and updates before they go live.
- **Financial Oversight**: Manage withdrawal requests and platform-wide wallet transactions.
- **Category Control**: Dynamic management of product categories and marketplace structure.

---

## 🛠️ Technology Stack

### Core Frontend
- **Framework**: [React 19](https://react.dev/) (Concurrent rendering & latest hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Build Tool**: [Vite](https://vitejs.dev/) (Ultra-fast HMR)
- **Routing**: [React Router 7](https://reactrouter.com/) (Data APIs & role-based protection)

### State & Data
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) (Caching, synchronization, and optimistic updates)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Schema-based validation)
- **API Client**: [Axios](https://axios-http.com/) (Interceptors for auth & error handling)

### Styling & UI
- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern, utility-first styling)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth, interactive UI transitions)
- **Components**: Custom-built premium UI kit with [React Icons](https://react-icons.github.io/react-icons/) and [React Slick](https://react-slick.neostack.com/) carousels.
- **Feedback**: [React Hot Toast](https://react-hot-toast.com/) for non-blocking notifications.

### Specialized Tools
- **Payments**: [Stripe](https://stripe.com/) (React Stripe JS)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async) (Dynamic meta tags)

---

## 📂 Project Structure

```bash
src/
├── features/          # Domain-specific modules (Admin, Auth, Supplier, etc.)
│   ├── admin/         # Admin-only pages and logic
│   ├── auth/          # Authentication flows (Login, Register, OTP)
│   ├── supplier/      # Supplier dashboard and management
│   ├── cart/          # cart
│   ├── products/      # products
│   ├── orders/        # orders
│   └── wallet/        # Financial transactions and balance
├── ui/                # Reusable presentation components
├── providers/         # Context providers (Auth, Theme, Query)
├── services/          # API integration and Axios configuration
├── hooks/             # Custom global hooks
├── routes/            # Role-based routing configuration
├── utils/             # Helper functions and constants
└── schemas/           # Zod validation schemas
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/FarahAkl/GreenEye.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_URL=your_api_url
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Compiles the TypeScript and builds the app for production.
- `npm run lint` - Runs ESLint to check for code quality.
- `npm run preview` - Locally previews the production build.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Developed as a **Graduation Project** with passion for a greener future. 🌍✨
