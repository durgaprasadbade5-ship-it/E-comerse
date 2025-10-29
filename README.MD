# Student Management System

A Node.js/Express application that implements Create, Read, Update, and Delete (CRUD) operations for a Student database using MongoDB, Mongoose, and MVC architecture.

## Features

- **MVC Architecture**: Clean separation of concerns with Models, Controllers, and Routes
- **Create**: Add new students with name, age, and course
- **Read**: Retrieve all students or a specific student by ID
- **Update**: Modify student details by ID
- **Delete**: Remove students from the database
- **Validation**: Comprehensive data validation and error handling
- **Error Handling**: Proper HTTP status codes and error messages
- **Timestamps**: Automatic createdAt and updatedAt fields

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
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Optionally set `PORT` (default: 3000)

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

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Get All Students
\`\`\`
GET /students
\`\`\`
**Response (200 OK):**
\`\`\`json
{
  "count": 3,
  "students": [
    {
      "_id": "686f6c106b7e1b4605d09e60",
      "name": "Alice Johnson",
      "age": 20,
      "course": "Computer Science",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "686f6c106b7e1b4605d09e61",
      "name": "Bob Smith",
      "age": 22,
      "course": "Mechanical Engineering",
      "createdAt": "2024-01-15T10:31:00.000Z",
      "updatedAt": "2024-01-15T10:31:00.000Z"
    }
  ]
}
\`\`\`

### 2. Get Student by ID
\`\`\`
GET /students/:id
\`\`\`
**Example:**
\`\`\`
GET /students/686f6c106b7e1b4605d09e60
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "_id": "686f6c106b7e1b4605d09e60",
  "name": "Alice Johnson",
  "age": 20,
  "course": "Computer Science",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
\`\`\`

### 3. Create a New Student
\`\`\`
POST /students
Content-Type: application/json

{
  "name": "David Miller",
  "age": 21,
  "course": "Business Administration"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "message": "Student created successfully",
  "student": {
    "_id": "686f6c106b7e1b4605d09e62",
    "name": "David Miller",
    "age": 21,
    "course": "Business Administration",
    "createdAt": "2024-01-15T10:32:00.000Z",
    "updatedAt": "2024-01-15T10:32:00.000Z"
  }
}
\`\`\`

### 4. Update a Student
\`\`\`
PUT /students/:id
Content-Type: application/json

{
  "name": "David Miller",
  "age": 22,
  "course": "Business Administration"
}
\`\`\`

**Example:**
\`\`\`
PUT /students/686f6c106b7e1b4605d09e62
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "message": "Student updated successfully",
  "student": {
    "_id": "686f6c106b7e1b4605d09e62",
    "name": "David Miller",
    "age": 22,
    "course": "Business Administration",
    "createdAt": "2024-01-15T10:32:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
\`\`\`

### 5. Delete a Student
\`\`\`
DELETE /students/:id
\`\`\`

**Example:**
\`\`\`
DELETE /students/686f6c106b7e1b4605d09e60
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "message": "Student deleted successfully",
  "student": {
    "_id": "686f6c106b7e1b4605d09e60",
    "name": "Alice Johnson",
    "age": 20,
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

## Data Validation

### Student Schema Validation Rules

| Field | Type | Requirements |
|-------|------|--------------|
| name | String | Required, 2-50 characters |
| age | Number | Required, 1-120 |
| course | String | Required, 2-100 characters |

### Error Responses

**400 Bad Request** - Validation Error:
\`\`\`json
{
  "message": "Please provide all required fields: name, age, course"
}
\`\`\`

**400 Bad Request** - Invalid ID Format:
\`\`\`json
{
  "message": "Invalid student ID format"
}
\`\`\`

**404 Not Found** - Student not found:
\`\`\`json
{
  "message": "Student not found"
}
\`\`\`

**500 Internal Server Error**:
\`\`\`json
{
  "message": "Error creating student",
  "error": "Error details"
}
\`\`\`

## Project Structure

\`\`\`
student-management-system/
├── server.js                    # Main Express server file
├── package.json                 # Project dependencies
├── .env.example                 # Environment variables template
├── .env                         # Environment variables (create from .env.example)
├── models/
│   └── Student.js               # Mongoose Student schema and model
├── controllers/
│   └── studentController.js     # Business logic for CRUD operations
├── routes/
│   └── studentRoutes.js         # API routes for CRUD operations
└── README.md                    # This file
\`\`\`

## MVC Architecture Explanation

### Models (models/Student.js)
- Defines the Student schema with validation rules
- Specifies field types, requirements, and constraints
- Handles data structure and validation at the database level

### Controllers (controllers/studentController.js)
- Contains all business logic for CRUD operations
- Handles request validation and error handling
- Communicates with the database through models
- Returns appropriate responses to the client

### Routes (routes/studentRoutes.js)
- Maps HTTP requests to controller methods
- Defines API endpoints and their corresponding handlers
- Acts as the interface between client requests and business logic

## Testing with cURL

### Create a Student
\`\`\`bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "David Miller",
    "age": 21,
    "course": "Business Administration"
  }'
\`\`\`

### Get All Students
\`\`\`bash
curl http://localhost:3000/students
\`\`\`

### Get Student by ID
\`\`\`bash
curl http://localhost:3000/students/686f6c106b7e1b4605d09e60
\`\`\`

### Update a Student
\`\`\`bash
curl -X PUT http://localhost:3000/students/686f6c106b7e1b4605d09e60 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "age": 21,
    "course": "Computer Science"
  }'
\`\`\`

### Delete a Student
\`\`\`bash
curl -X DELETE http://localhost:3000/students/686f6c106b7e1b4605d09e60
\`\`\`

## Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Create requests for each endpoint
4. Test CRUD operations with sample data

## MongoDB Connection

### Local MongoDB
If running MongoDB locally:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/student-db
\`\`\`

### MongoDB Atlas (Cloud)
For MongoDB Atlas:
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
- **Age Constraints**: Validates age is between 1 and 120

## Best Practices Implemented

1. **MVC Architecture**: Clear separation of concerns
2. **Schema Validation**: Mongoose schema with built-in validators
3. **Error Handling**: Try-catch blocks and error middleware
4. **HTTP Status Codes**: Appropriate status codes for each operation
5. **Input Sanitization**: Trim and validate all inputs
6. **Timestamps**: Automatic createdAt and updatedAt fields
7. **Modular Structure**: Separated models, controllers, and routes
8. **Environment Variables**: Configuration through .env file
9. **Documentation**: Comprehensive README with examples
10. **Controller Logic**: Business logic separated from routes

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
- Ensure data types match (age should be a number)
- Verify string length requirements

## License

ISC

## Author

Created as a learning project for MVC architecture with MongoDB and Mongoose.
