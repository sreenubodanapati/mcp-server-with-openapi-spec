# Product CRUD REST API

A complete CRUD (Create, Read, Update, Delete) REST API for managing products, built with Node.js, Express.js, and MongoDB.

## Features

- ✅ Create new products
- ✅ Get all products with pagination and filtering
- ✅ Get single product by ID
- ✅ Update existing products
- ✅ Delete products
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ CORS support
- ✅ Environment configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd test-node-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Make sure MongoDB is running on your local machine (default: mongodb://localhost:27017)

5. Start the server:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

This project includes comprehensive OpenAPI 3.0.3 specification documentation:

### Interactive Documentation
- **Swagger UI**: `http://localhost:3000/api-docs` (when server is running)
- Test endpoints directly from the browser
- View detailed schemas and examples
- Interactive API exploration

### Documentation Files
- `openapi.yaml` - YAML format specification
- `openapi.json` - JSON format specification  
- `API_DOCUMENTATION.md` - Detailed documentation guide

### Documentation Features
- Complete endpoint coverage
- Request/response schemas
- Validation rules and examples
- Error handling documentation
- MongoDB integration details

## API Endpoints

### Base URL: `http://localhost:3000/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all products |
| GET | `/:id` | Get product by ID |
| POST | `/` | Create new product |
| PUT | `/:id` | Update product by ID |
| DELETE | `/:id` | Delete product by ID |

### Product Schema

```json
{
  "name": "String (required, max 100 chars)",
  "description": "String (required, max 500 chars)",
  "price": "Number (required, min 0)",
  "category": "String (required)",
  "stock": "Number (default 0, min 0)",
  "imageUrl": "String (optional)",
  "isActive": "Boolean (default true)",
  "createdAt": "Date (auto-generated)",
  "updatedAt": "Date (auto-generated)"
}
```

## API Usage Examples

### 1. Create a Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "iPhone 15",
  "description": "Latest iPhone with advanced features",
  "price": 999.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/iphone15.jpg"
}
```

### 2. Get All Products
```http
GET /api/products
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `sortBy`: Sort field (default: createdAt)
- `order`: Sort order - asc/desc (default: desc)

Example: `GET /api/products?page=1&limit=5&category=Electronics&sortBy=price&order=asc`

### 3. Get Product by ID
```http
GET /api/products/60d5ecb74f123c001f8b4567
```

### 4. Update a Product
```http
PUT /api/products/60d5ecb74f123c001f8b4567
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 1199.99,
  "stock": 30
}
```

### 5. Delete a Product
```http
DELETE /api/products/60d5ecb74f123c001f8b4567
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message or array of validation errors"
}
```

### Paginated Response (for GET /api/products)
```json
{
  "success": true,
  "count": 5,
  "total": 50,
  "page": 1,
  "pages": 10,
  "data": [ ... ]
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/productdb
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid MongoDB ObjectIds
- Validation errors
- Duplicate product names
- Missing required fields
- Server errors
- 404 not found errors

## Testing with curl

### Create a product:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 25
  }'
```

### Get all products:
```bash
curl http://localhost:3000/api/products
```

### Get product by ID:
```bash
curl http://localhost:3000/api/products/PRODUCT_ID_HERE
```

### Update a product:
```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "stock": 20
  }'
```

### Delete a product:
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID_HERE
```

## Database

The API uses MongoDB with Mongoose ODM. The database name is `productdb` and the collection name is `products`.

## Development

For development, use:
```bash
npm run dev
```

This will start the server with nodemon for auto-restart on file changes.

## License

ISC
