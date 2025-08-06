# Product CRUD API with MCP Server

A complete Product Management API built with Node.js, Express.js, MongoDB, and a Model Context Protocol (MCP) server integration.

## 📁 Project Structure

```
├── mcp-server/                 # Model Context Protocol server
│   ├── main.py                # MCP server implementation
│   ├── pyproject.toml         # Python project configuration
│   ├── README.md              # MCP server documentation
│   └── uv.lock               # Python dependencies lock file
├── test-node-app/             # Node.js REST API
│   ├── controllers/           # API controllers
│   ├── models/                # MongoDB models
│   ├── routes/                # Express routes
│   ├── server.js              # Main server file
│   ├── package.json           # Node.js dependencies
│   ├── openapi.yaml           # OpenAPI specification
│   └── API_DOCUMENTATION.md   # API documentation
└── README.md                  # This file
```

## 🚀 Features

### REST API Features
- ✅ Create, Read, Update, Delete (CRUD) operations for products
- ✅ MongoDB integration with Mongoose
- ✅ Input validation and error handling
- ✅ CORS support for cross-origin requests
- ✅ OpenAPI 3.0 specification
- ✅ Interactive API documentation with Swagger UI
- ✅ Environment configuration with dotenv

### MCP Server Features
- ✅ Model Context Protocol server implementation
- ✅ Integration with FastMCP framework
- ✅ Python-based server for advanced AI model interactions

## 📋 Prerequisites

### For Node.js API
- Node.js (version 16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### For MCP Server
- Python 3.12 or higher
- UV package manager (recommended) or pip

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd OpenAPI_mcp
```

### 2. Set up the Node.js API

```bash
cd test-node-app
npm install
```

Create a `.env` file in the `test-node-app` directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/productdb
NODE_ENV=development
```

### 3. Set up the MCP Server

```bash
cd ../mcp-server
# If using UV (recommended)
uv sync

# Or if using pip
pip install -r requirements.txt
```

## 🏃‍♂️ Running the Application

### Start the Node.js API Server

```bash
cd test-node-app

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at: `http://localhost:3000`

### Start the MCP Server

```bash
cd mcp-server
python main.py
```

### Access API Documentation

Once the Node.js server is running, visit:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **OpenAPI JSON**: `http://localhost:3000/api-docs/swagger.json`

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with pagination) |
| GET | `/api/products/:id` | Get a specific product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Sample Product Object

```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced camera and A17 Pro chip",
  "price": 1199.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/iphone15pro.jpg",
  "isActive": true
}
```

## 🧪 Testing

### Validate OpenAPI Specification
```bash
cd test-node-app
npm run validate-api
```

### Manual Testing
You can test the API using:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Postman**: Import the OpenAPI specification
- **curl commands**:

```bash
# Get all products
curl -X GET http://localhost:3000/api/products

# Create a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 29.99,
    "category": "Test",
    "stock": 10
  }'
```

## 🔧 Available Scripts

### Node.js API Scripts
- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm run docs` - Start documentation server on port 8080
- `npm run validate-api` - Validate OpenAPI specification files

## 🌍 Environment Variables

Create a `.env` file in the `test-node-app` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/productdb

# Optional: Authentication (if implemented)
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
```

## 📚 Documentation

- **API Documentation**: Available at `/api-docs` when server is running
- **OpenAPI Spec**: See `test-node-app/openapi.yaml`
- **MCP Server**: See `mcp-server/README.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check your MongoDB Atlas connection string
   - Verify the `MONGODB_URI` in your `.env` file

2. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Kill the process using the port: `npx kill-port 3000`

3. **MCP Server Issues**
   - Ensure Python 3.12+ is installed
   - Check that all Python dependencies are installed correctly

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the API documentation at `/api-docs`
3. Open an issue in the repository

---

Made with ❤️ using Node.js, Express.js, MongoDB, and FastMCP
