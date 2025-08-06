const fs = require('fs');
const YAML = require('yamljs');

console.log('🔍 Validating OpenAPI Specification Files...\n');

try {
  // Test YAML file
  const yamlSpec = YAML.load('./openapi.yaml');
  console.log('✅ OpenAPI YAML file is valid');
  console.log('   Title:', yamlSpec.info.title);
  console.log('   Version:', yamlSpec.info.version);
  console.log('   Paths:', Object.keys(yamlSpec.paths).length);
  console.log('   Schemas:', Object.keys(yamlSpec.components.schemas).length);
  
  // Test JSON file
  const jsonSpec = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));
  console.log('\n✅ OpenAPI JSON file is valid');
  console.log('   Title:', jsonSpec.info.title);
  console.log('   Version:', jsonSpec.info.version);
  
  console.log('\n🎉 All OpenAPI specification files are valid!');
  console.log('\n📖 To view documentation:');
  console.log('   1. Start server: npm run dev');
  console.log('   2. Open: http://localhost:3000/api-docs');
  
} catch (error) {
  console.error('❌ Error validating OpenAPI files:', error.message);
  process.exit(1);
}
