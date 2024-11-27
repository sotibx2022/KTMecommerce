# KTMecommerce
This is an e-commerce project designed using **Next.js**. Below is the database modeling for the application:
---
## **1. User Management**
### **Roles Table**
| Column      | Type                       | Description                     |
|-------------|----------------------------|---------------------------------|
| id          | Primary Key                | Unique identifier for the role. |
| rolename    | ENUM ('admin', 'customer') | Defines the role type.          |
| created_at  | Timestamp                  | When the role was created.      |
| updated_at  | Timestamp                  | When the role was last updated. |
### **Users Table**
| Column           | Type                              | Description                         |
|-------------------|-----------------------------------|-------------------------------------|
| id               | Primary Key                       | Unique identifier for the user.     |
| role_id          | Foreign Key (References Roles)    | Role of the user.                   |
| full_name        | Text                              | Full name of the user.              |
| email            | Unique                            | Email address of the user.          |
| password         | Hashed                            | Encrypted password.                 |
| phone_number     | Text                              | User’s phone number.                |
| status           | ENUM ('active', 'inactive', 'blocked') | Account status.                  |
| created_at       | Timestamp                         | When the user account was created.  |
| updated_at       | Timestamp                         | When the user account was updated.  |
---
## **2. Product Catalog**
### **Categories Table**
| Column                 | Type                              | Description                                   |
|-------------------------|-----------------------------------|-----------------------------------------------|
| id                     | Primary Key                       | Unique identifier for the category.           |
| category_name          | Text                              | Name of the category.                        |
| url_slug               | Unique, Text                      | URL-friendly identifier.                     |
| parent_category_id     | Foreign Key (Self-referencing)    | Parent category for sub-categories.          |
| status                 | ENUM ('active', 'inactive')       | Category status.                             |
| created_at             | Timestamp                         | When the category was created.               |
| updated_at             | Timestamp                         | When the category was last updated.          |
### **Products Table**
| Column           | Type                              | Description                                   |
|-------------------|-----------------------------------|-----------------------------------------------|
| id               | Primary Key                       | Unique identifier for the product.            |
| product_name     | Text                              | Name of the product.                         |
| url_slug         | Unique, Text                      | URL-friendly identifier.                     |
| category_id      | Foreign Key (References Categories) | Category of the product.                    |
| description      | Text                              | Product description.                         |
| price            | Decimal                           | Price of the product.                        |
| stock_quantity   | Integer                           | Total stock (sum of variants).               |
| status           | ENUM ('active', 'inactive')       | Product status.                              |
| created_at       | Timestamp                         | When the product was created.                |
| updated_at       | Timestamp                         | When the product was last updated.           |
### **Product Variants Table**
| Column           | Type                              | Description                                   |
|-------------------|-----------------------------------|-----------------------------------------------|
| id               | Primary Key                       | Unique identifier for the variant.            |
| product_id       | Foreign Key (References Products) | Product this variant belongs to.             |
| variant_details  | JSON                              | Details like color, size, etc.               |
| price_adjustment | Decimal                           | Additional cost for this variant (optional). |
| stock_quantity   | Integer                           | Stock available for this variant.            |
| created_at       | Timestamp                         | When the variant was created.                |
| updated_at       | Timestamp                         | When the variant was last updated.           |
---
## **3. Customer-Specific Features**
### **Carts Table**
| Column               | Type                              | Description                                |
|-----------------------|-----------------------------------|--------------------------------------------|
| id                   | Primary Key                       | Unique identifier for the cart item.       |
| user_id              | Foreign Key (References Users)    | References the user who owns the cart.     |
| product_variant_id   | Foreign Key (References Variants) | Variant of the product in the cart.       |
| quantity             | Integer                           | Quantity of the item.                      |
| created_at           | Timestamp                         | When the cart item was created.            |
| updated_at           | Timestamp                         | When the cart item was last updated.       |
### **Wishlist Table**
| Column              | Type                              | Description                                |
|----------------------|-----------------------------------|--------------------------------------------|
| id                  | Primary Key                       | Unique identifier for the wishlist item.   |
| user_id             | Foreign Key (References Users)    | References the user who owns the wishlist. |
| product_id          | Foreign Key (References Products) | Product in the wishlist.                  |
| created_at          | Timestamp                         | When the wishlist item was created.        |
### **Reviews Table**
| Column              | Type                              | Description                                |
|----------------------|-----------------------------------|--------------------------------------------|
| id                  | Primary Key                       | Unique identifier for the review.          |
| product_id          | Foreign Key (References Products) | Product being reviewed.                   |
| user_id             | Foreign Key (References Users)    | User who submitted the review.            |
| rating              | Integer (1-5)                     | User's rating for the product.            |
| review_text         | Text                              | User's review.                             |
| created_at          | Timestamp                         | When the review was created.               |
| updated_at          | Timestamp                         | When the review was last updated.          |
---
## **4. Orders**
### **Orders Table**
| Column              | Type                              | Description                                |
|----------------------|-----------------------------------|--------------------------------------------|
| id                  | Primary Key                       | Unique identifier for the order.           |
| order_number        | Unique                            | Unique number for tracking the order.      |
| user_id             | Foreign Key (References Users)    | User who placed the order.                 |
| total_amount        | Decimal                           | Total cost of the order before discounts.  |
| discount_amount     | Decimal                           | Discount applied to the order.             |
| gross_amount        | Decimal                           | Total amount after applying discounts.     |
| shipping_amount     | Decimal                           | Shipping charges (optional).               |
| net_amount          | Decimal                           | Final payable amount (gross + shipping).   |
| estimated_tax       | Decimal                           | Taxes on the order (optional).             |
| payment_status      | ENUM ('paid', 'pending', 'failed')| Status of the payment.                     |
| payment_method      | ENUM ('online', 'cash on delivery', 'esewa') | Method of payment.       |
| payment_transaction_id | Text                          | Transaction ID (for online payments).      |
| order_status        | ENUM ('placed', 'processing', 'shipped', 'delivered') | Status of the order.  |
| created_at          | Timestamp                         | When the order was created.                |
| updated_at          | Timestamp                         | When the order was last updated.           |
