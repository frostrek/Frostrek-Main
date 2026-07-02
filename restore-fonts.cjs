const fs = require('fs');
const path = require('path');

const tailwindConfigPath = path.resolve('tailwind.config.js');
const indexHtmlPath = path.resolve('index.html');

// 1. Revert tailwind.config.js
let tailwind = fs.readFileSync(tailwindConfigPath, 'utf8');

tailwind = tailwind.replace(
  /fontFamily: \{[\s\S]*?\},/g,
  `fontFamily: {
                sans: ['Raleway', 'system-ui', 'sans-serif'],
                body: ['Quicksand', 'system-ui', 'sans-serif'],
            },`
);
fs.writeFileSync(tailwindConfigPath, tailwind, 'utf8');
console.log('Fixed tailwind.config.js');


// 2. Revert index.html
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace Google Fonts links
html = html.replace(
  /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Cormorant\+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"/g,
  'href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&display=swap"'
);

// Replace inline CSS fonts
html = html.replace(/font-family:Inter,system-ui,sans-serif/g, "font-family:Raleway,system-ui,sans-serif");
html = html.replace(/font-family:'Cormorant Garamond',serif/g, "font-family:'Playfair Display',serif");

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Fixed index.html');
