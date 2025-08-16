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
//// How to implement smart search feature using langchain in my project.
install langchain core, community and openAI.
smartsearch.ts function created which initialize the openAI.
the smartSearch function recive the query from user and return response.content using HumanMessage model from longchain.
the api route for smart search receives the query and return the response using smartSearch function.
the langchain/openAI requires quota for responses.
the langchain/ollama requires local server.
so that go with groq model.
------
now the groqLLM respond with result being based on the query data however, existing search logics has some describency which needs to be resolved.
----------
typesence used to show the search recommendation for users.
installed typesence.
typesence cloud registered.
get type sence admin and client api keys and created in two different files.
created products collection.
all the product datas are added to the typesence collection.
new product, creation, deletion and in update the typesence will be updated.
on entering some thing to the typesence, we get search recommendation by typesence from api.
rendered in ui.
----------
# Product recommendation using AI
1) user sends query to the api.
2) format the query into subcategory and category using langchain.
3) but the langchain needs to know what are the available category and subcategories in the mongoDb database? so that langchain will understand the query provided by user and format the human input to the relational category and subcategory?
4) available categories send to the langchain along with userInput, where the llm will return whether the category exist or uncategorized.
# How classifyProductCategory function Works?
1) we need to create structured  prompt, using fromTemplate.
2) we will create a chain with prompt,llm, and output method using pipe method.
3) now we will invoke the llm.
4) from the result. if one of the categories exist. we will return the category
5) otherwise we will return uncategorized.
6) we provided example of input and output as well to the prompt.
7) other output methods like stringOutPutParser are StringOutputParser, JsonOutputParser,StructuredOutputParser
8) other themplates for prompt like fromTemplate are fromTemplate,fromMessages,FewShotPromptTemplate
9) new HumanMessage  is used for chatting purpose whre logics are simple and llm need to respond with text being based to the input.
10) along with the classification of product with category, we need to categorize on the basis of price intent and product model as well.
11) we need to handle the exceptional cases like what user gives negative input to the langchain.
12) will comeback to implement this feature again! (Dated - 08/11/2025)
_______________
# users page in admin - to learn about aggregation in depth.
1. in the aggregation, if the provided matched stage and filter state have empty results. we will get error.
2. so that incase they are empty, we need to fetch them using .find method. on different conditions.
---------
how do you update the url to fetch different data.
- when filter data changes, we will update the params using useMemo.
- that params will be converted to string.
- router.replace to udpate the url in the frontend.
- we need to provide variables to the query key so that differnt result will appear on data change.
------------------
How can we delete one of the subcategory which is the object of category?
1) find the main category.
2) find the index of subcategory which you want to delete.
3) if the index is -1 means, the subcategory is not found.
4) if index is one means we can splice that subcategory from the array of subcategries.
5) save the parent category.
6) optionally we can use $pull method of mongoDB to delete specific subcatgory. which is atomic operation, can be done in single line, without fetching data reduces network resources.
Remaining:
   : - the actaul category and subcategory lists.
   :- need to be udpated on front end as well.
   :- while updating the category, lets update the navFile datas as well locally.
   :- delete vape category and vape products.
   :- remove slider related to vape
   :- the list need to show updated result.
   ------------------
     : - add more projects with ai support, 
     : - the homepage needs to capable of showing more categories, vape will be removed.
     : - why there is product recommendation icon in the admin page as well.
     : - do you really offer 10% discount on first order?
     :- Admin page responsiveness.
     :- back to productRecommendation feature.
