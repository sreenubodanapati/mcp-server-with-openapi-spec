import httpx
from fastmcp import FastMCP
import json

client = httpx.AsyncClient(base_url="http://localhost:3000")

# Load OpenAPI spec from local file
with open(r"C:\NTT-Sreenivasulu\OpenAPI_mcp\test-node-app\openapi.json", "r") as f:
    openapi_spec = json.load(f)

mcp = FastMCP.from_openapi(
    openapi_spec=openapi_spec,
    client=client,
    name="My API Server"
)

if __name__ == "__main__":
    mcp.run()
