# Student Management System & E-Commerce Catalog

A Node.js/Express application that implements CRUD operations for both a Student database and an E-Commerce Catalog with nested document structure using MongoDB, Mongoose, and MVC architecture.

## Features

### Student Management System
- **MVC Architecture**: Clean separation of concerns with Models, Controllers, and Routes
- **CRUD Operations**: Create, Read, Update, Delete students
- **Validation**: Comprehensive data validation and error handling
- **Timestamps**: Automatic createdAt and updatedAt fields

### E-Commerce Catalog
- **Nested Documents**: Products with variants array containing color, size, and stock
- **Advanced Queries**: Filter by category, project specific variant fields
- **Variant Management**: Add and delete variants from products
- **Flexible Schema**: MongoDB's flexible document structure for real-world e-commerce

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   - Copy \`.env.example\` to \`.env\`
   - Update \`MONGODB_URI\` with your MongoDB connection string
   - Optionally set \`PORT\` (default: 3000)

   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/student-db
   PORT=3000
   NODE_ENV=development
   \`\`\`

## Running the Application

### Development Mode (with auto-reload)
\`\`\`bash
npm run dev
\`\`\`

### Production Mode
\`\`\`bash
npm start
\`\`\`

The server will start on \`http://localhost:3000\`

## API Endpoints

### Student Management Endpoints

#### 1. Get All Students
\`\`\`
GET /students
\`\`\`

#### 2. Get Student by ID
\`\`\`
GET /students/:id
\`\`\`

#### 3. Create a New Student
\`\`\`
POST /students
Content-Type: application/json

{
  "name": "David Miller",
  "age": 21,
  "course": "Business Administration"
}
\`\`\`

#### 4. Update a Student
\`\`\`
PUT /students/:id
Content-Type: application/json

{
  "name": "David Miller",
  "age": 22,
  "course": "Business Administration"
}
\`\`\`

#### 5. Delete a Student
\`\`\`
DELETE /students/:id
\`\`\`

### E-Commerce Catalog Endpoints

#### 1. Get All Products
\`\`\`
GET /products
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "count": 2,
  "products": [
    {
      "_id": "686f6c106b7e1b4605d09e60",
      "name": "Winter Jacket",
      "price": 200,
      "category": "Apparel",
      "variants": [
        {
          "_id": "686f6c106b7e1b4605d09e61",
          "color": "Black",
          "size": "S",
          "stock": 8
        },
        {
          "_id": "686f6c106b7e1b4605d09e62",
          "color": "Gray",
          "size": "M",
          "stock": 12
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
\`\`\`

#### 2. Get Product by ID
\`\`\`
GET /products/:id
\`\`\`

#### 3. Get Products by Category
\`\`\`
GET /products/category/:category
\`\`\`

**Example:**
\`\`\`
GET /products/category/Apparel
\`\`\`

#### 4. Get Products with Variant Projection
\`\`\`
GET /products/projection/variants
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "count": 1,
  "message": "Products with variant details (color and size only)",
  "products": [
    {
      "_id": "686f6c106b7e1b4605d09e60",
      "name": "Winter Jacket",
      "category": "Apparel",
      "variants": [
        {
          "_id": "686f6c106b7e1b4605d09e61",
          "color": "Black",
          "size": "S"
        },
        {
          "_id": "686f6c106b7e1b4605d09e62",
          "color": "Gray",
          "size": "M"
        }
      ]
    }
  ]
}
\`\`\`

#### 5. Create a New Product
\`\`\`
POST /products
Content-Type: application/json

{
  "name": "Winter Jacket",
  "price": 200,
  "category": "Apparel",
  "variants": [
    {
      "color": "Black",
      "size": "S",
      "stock": 8
    },
    {
      "color": "Gray",
      "size": "M",
      "stock": 12
    }
  ]
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "message": "Product created successfully",
  "product": {
    "_id": "686f6c106b7e1b4605d09e60",
    "name": "Winter Jacket",
    "price": 200,
    "category": "Apparel",
    "variants": [
      {
        "_id": "686f6c106b7e1b4605d09e61",
        "color": "Black",
        "size": "S",
        "stock": 8
      },
      {
        "_id": "686f6c106b7e1b4605d09e62",
        "color": "Gray",
        "size": "M",
        "stock": 12
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

#### 6. Update a Product
\`\`\`
PUT /products/:id
Content-Type: application/json

{
  "name": "Winter Jacket",
  "price": 220,
  "category": "Apparel"
}
\`\`\`

#### 7. Add Variant to Product
\`\`\`
POST /products/:id/variants
Content-Type: application/json

{
  "color": "Blue",
  "size": "L",
  "stock": 15
}
\`\`\`

#### 8. Delete Variant from Product
\`\`\`
DELETE /products/:id/variants/:variantId
\`\`\`

#### 9. Delete a Product
\`\`\`
DELETE /products/:id
\`\`\`

## Data Models

### Student Schema
| Field | Type | Requirements |
|-------|------|--------------|
| name | String | Required, 2-50 characters |
| age | Number | Required, 1-120 |
| course | String | Required, 2-100 characters |

### Product Schema with Nested Variants
| Field | Type | Requirements |
|-------|------|--------------|
| name | String | Required, 3-100 characters |
| price | Number | Required, >= 0 |
| category | String | Required, 2-50 characters |
| variants | Array | Array of variant objects |

### Variant Subdocument Schema
| Field | Type | Requirements |
|-------|------|--------------|
| color | String | Required, 2-50 characters |
| size | String | Required, 1-20 characters |
| stock | Number | Required, >= 0 |

## Project Structure

\`\`\`
project/
├── server.js                      # Main Express server file
├── package.json                   # Project dependencies
├── .env.example                   # Environment variables template
├── .env                           # Environment variables (create from .env.example)
├── models/
│   ├── Student.js                 # Mongoose Student schema
│   └── Product.js                 # Mongoose Product schema with nested variants
├── controllers/
│   ├── studentController.js       # Business logic for Student CRUD
│   └── productController.js       # Business logic for Product CRUD and queries
├── routes/
│   ├── studentRoutes.js           # API routes for Student operations
│   └── productRoutes.js           # API routes for Product operations
└── README.md                      # This file
\`\`\`

## MVC Architecture Explanation

### Models
- Define schemas with validation rules
- Specify field types, requirements, and constraints
- Handle data structure at the database level

### Controllers
- Contain all business logic for CRUD operations
- Handle request validation and error handling
- Communicate with the database through models
- Return appropriate responses to the client

### Routes
- Map HTTP requests to controller methods
- Define API endpoints and their corresponding handlers
- Act as the interface between client requests and business logic

## Testing with cURL

### Create a Product with Variants
\`\`\`bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Winter Jacket",
    "price": 200,
    "category": "Apparel",
    "variants": [
      {"color": "Black", "size": "S", "stock": 8},
      {"color": "Gray", "size": "M", "stock": 12}
    ]
  }'
\`\`\`

### Get All Products
\`\`\`bash
curl http://localhost:3000/products
\`\`\`

### Get Products by Category
\`\`\`bash
curl http://localhost:3000/products/category/Apparel
\`\`\`

### Get Products with Variant Projection
\`\`\`bash
curl http://localhost:3000/products/projection/variants
\`\`\`

### Add Variant to Product
\`\`\`bash
curl -X POST http://localhost:3000/products/686f6c106b7e1b4605d09e60/variants \
  -H "Content-Type: application/json" \
  -d '{
    "color": "Blue",
    "size": "L",
    "stock": 15
  }'
\`\`\`

### Delete Variant from Product
\`\`\`bash
curl -X DELETE http://localhost:3000/products/686f6c106b7e1b4605d09e60/variants/686f6c106b7e1b4605d09e61
\`\`\`

## MongoDB Connection

### Local MongoDB
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/student-db
\`\`\`

### MongoDB Atlas (Cloud)
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-db?retryWrites=true&w=majority
\`\`\`

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Schema validation with detailed error messages
- **Database Errors**: Connection and query error handling
- **HTTP Errors**: Proper status codes (400, 404, 500)
- **Input Validation**: ObjectId format validation
- **Required Fields**: Validation for mandatory fields
- **Nested Document Validation**: Validation for variant fields

## Best Practices Implemented

1. **MVC Architecture**: Clear separation of concerns
2. **Schema Validation**: Mongoose schema with built-in validators
3. **Nested Documents**: Efficient data modeling for related data
4. **Error Handling**: Try-catch blocks and error middleware
5. **HTTP Status Codes**: Appropriate status codes for each operation
6. **Input Sanitization**: Trim and validate all inputs
7. **Timestamps**: Automatic createdAt and updatedAt fields
8. **Modular Structure**: Separated models, controllers, and routes
9. **Environment Variables**: Configuration through .env file
10. **Advanced Queries**: Filtering, projection, and nested document manipulation

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity for cloud databases

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port

### Validation Errors
- Check field requirements in the schema
- Ensure data types match
- Verify string length requirements

## License

ISC

## Author

Created as a learning project for MVC architecture, nested documents, and MongoDB with Mongoose.
