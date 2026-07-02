const fs = require('fs');

// Fix tailwind.config.js
let t = fs.readFileSync('tailwind.config.js', 'utf8');
t = t.replace("sans: ['Inter', 'system-ui', 'sans-serif']", "sans: ['Raleway', 'system-ui', 'sans-serif']");
t = t.replace("body: ['Inter', 'system-ui', 'sans-serif']", "body: ['Quicksand', 'system-ui', 'sans-serif']");
t = t.replace("serif: ['Cormorant Garamond', 'serif'],", "");
fs.writeFileSync('tailwind.config.js', t, 'utf8');
console.log('Fixed tailwind.config.js');

// Fix index.html
let h = fs.readFileSync('index.html', 'utf8');
h = h.replace(/Cormorant\+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700/g, 'Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700');
h = h.replace("font-family:Inter,system-ui,sans-serif", "font-family:Raleway,system-ui,sans-serif");
h = h.replace("font-family:'Cormorant Garamond',serif", "font-family:'Playfair Display',serif");
fs.writeFileSync('index.html', h, 'utf8');
console.log('Fixed index.html');
