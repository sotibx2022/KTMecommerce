# ecommerce KTM - Next.js E-Commerce Platform
## Project Overview
**Project Name**: ecommerce KTM  
**Version**: 1.0.0  
**Developer**: Binayaraj Soti  
**Target Launch**: December 30, 2025  
**Last Updated**: July 19, 2025  
## Key Features
✨ **Modern UI/UX** with animations using Framer Motion and GSAP  
🛒 **Complete Shopping Experience** with cart, checkout, and order management  
🔐 **Secure Authentication** with JWT, Google OAuth, and password management  
📱 **Fully Responsive** mobile-first design with adaptive components  
📊 **Advanced Product Discovery** with filters, search, and multiple display views  
💬 **Social Features** including product reviews, ratings, and public wishlists  
🔔 **Real-time Notifications** for order updates and account activities  
## Technology Stack
### Frontend
- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit + React Query
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP, Swiper JS
- **Forms**: React Hook Form
- **UI Components**: ShadCN UI
### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT, bcrypt, NextAuth.js (Google OAuth)
- **File Storage**: Cloudinary
### Future Roadmap
📱 Mobile App - React Native version
🌍 Internationalization - Multi-language support
🤖 AI Recommendations - Personalized product suggestions
# Ecommerce Website Database Modelling
Welcome to the database modeling section of the ecommerce website. You can click on the following links to view detailed information:  
- [Database Modeling Details](dbmodeling.md)  
# Payment Integration (07/25/2025)
Implemented Stripe test payment as Nepali gateways (Khalti/eSewa/ConnectIPS) require business documents.
Payment Flow:
Order details sent to Stripe API
Order saved to DB with status: "Unpaid"
Stripe session created with orderId metadata
User enters test card details
On success:
Redirects to /success page
Retrieves orderId from Stripe metadata
Updates order status to "Paid"
//// how did i am handeling readOnly admin user and full access admin user roles.
when admin login, i will set the cookies with his userName and token with expiry of 1 day.
when admin page loads, i will get the userName from the cookies and get the userDetails.
context created to share the user details around the components in ui.
logout api created to remove the admin details from the cookies.
redirected to the homepage on successful logout.
footer skeleton created to render while loading admin details.
middleware function created to check whether the admin user is authorized to handle post request or not. if not error thrown.