# API Documentation Guide

## OpenAPI Specification Files

This project includes comprehensive OpenAPI 3.0.3 specification documentation for the Product CRUD REST API:

### Files Created:
- `openapi.yaml` - YAML format OpenAPI specification
- `openapi.json` - JSON format OpenAPI specification

## Viewing the Documentation

### Option 1: Integrated Swagger UI (Recommended)
The API server includes built-in Swagger UI documentation:

1. Start the API server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/api-docs
   ```

This provides an interactive interface where you can:
- View all API endpoints
- See request/response schemas
- Test API calls directly from the browser
- View examples and detailed descriptions

### Option 2: Standalone Documentation Server
You can also run a standalone documentation server:

```bash
npm run docs
```

This will start a documentation-only server at `http://localhost:8080/api-docs`

### Option 3: External Tools
You can use the OpenAPI specification files with external tools:

#### Swagger Editor
1. Go to [Swagger Editor](https://editor.swagger.io/)
2. Copy the content from `openapi.yaml` or import the file
3. View and edit the documentation

#### Postman
1. Import the `openapi.json` file into Postman
2. Generate a collection from the OpenAPI specification
3. Test all endpoints directly in Postman

#### Insomnia
1. Import the OpenAPI specification file
2. Use the generated requests to test the API

## OpenAPI Specification Features

The specification includes:

### 📋 Complete API Coverage
- All CRUD endpoints (Create, Read, Update, Delete)
- Query parameters for filtering and pagination
- Path parameters for resource identification

### 📝 Detailed Schemas
- `Product` - Complete product model
- `ProductInput` - Input schema for creating products
- `ProductUpdateInput` - Input schema for updating products
- `Error` - Error response schema

### 🎯 Response Examples
- Success responses for all endpoints
- Error responses with different scenarios
- Validation error examples
- Multiple request examples per endpoint

### 🔍 Comprehensive Documentation
- Detailed descriptions for each endpoint
- Parameter explanations
- Response status codes
- Input validation rules
- Business logic explanations

### 📊 Advanced Features
- Pagination parameters
- Filtering options
- Sorting capabilities
- MongoDB ObjectId validation patterns
- Comprehensive error handling documentation

## Testing the API

### Using Swagger UI
1. Navigate to `http://localhost:3000/api-docs`
2. Click "Try it out" on any endpoint
3. Fill in the required parameters
4. Click "Execute" to make a real API call
5. View the response in real-time

### Sample API Calls

#### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": 1199.99,
    "category": "Electronics",
    "stock": 50
  }'
```

#### Get All Products
```bash
curl "http://localhost:3000/api/products?page=1&limit=5&category=Electronics"
```

#### Get Product by ID
```bash
curl http://localhost:3000/api/products/PRODUCT_ID_HERE
```

#### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "price": 999.99,
    "stock": 25
  }'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID_HERE
```

## Validation and Error Handling

The API includes comprehensive validation:

### Input Validation
- Required field validation
- Data type validation
- String length limits
- Numeric range validation
- MongoDB ObjectId format validation

### Error Responses
- `400` - Bad Request (validation errors, invalid IDs)
- `404` - Not Found (product doesn't exist)
- `500` - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "error": "Error message or array of validation errors"
}
```

## MongoDB Integration

The API uses MongoDB with Mongoose ODM:

### Database Configuration
- Database: `productdb`
- Collection: `products`
- Connection: `mongodb://localhost:27017/productdb`

### Schema Features
- Auto-generated timestamps (`createdAt`, `updatedAt`)
- Data validation at schema level
- Indexing for better query performance
- Unique name validation

## Development Workflow

1. **Start MongoDB** (ensure it's running on localhost:27017)
2. **Start API Server**: `npm run dev`
3. **View Documentation**: Navigate to `http://localhost:3000/api-docs`
4. **Test Endpoints**: Use Swagger UI or external tools
5. **Monitor Logs**: Check console for API calls and errors

The OpenAPI specification is automatically served with the API, providing always up-to-date documentation that matches your implementation.
