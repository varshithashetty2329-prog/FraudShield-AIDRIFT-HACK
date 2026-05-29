const fs = require('fs');
let code = fs.readFileSync('frontend/src/App.jsx', 'utf8');

// Insert API_URL at the beginning of the App function
if (!code.includes('const API_URL = import.meta.env.VITE_API_URL')) {
  code = code.replace(/function App\(\) \{/, "function App() {\n  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';");
}

// Replace string literals
code = code.replace(/'http:\/\/localhost:5000(.*?)'/g, '`${API_URL}$1`');
// Replace within template literals
code = code.replace(/`http:\/\/localhost:5000(.*?)`/g, '`${API_URL}$1`');

fs.writeFileSync('frontend/src/App.jsx', code);
console.log("Updated App.jsx successfully!");
