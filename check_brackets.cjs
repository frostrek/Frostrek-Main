const fs = require('fs');
let code = fs.readFileSync('src/pages/FrostyPage.tsx', 'utf8');
let origLines = code.split('\n');
code = code.replace(/`([^`]+)`/g, '``');
code = code.replace(/"([^"]+)"/g, '""');
code = code.replace(/'([^']+)'/g, "''");
code = code.replace(/\/\/.*/g, '');
code = code.replace(/\/\*[\s\S]*?\*\//g, '');
let openCount = 0;
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  for (let c of line) {
    if (c === '{') openCount++;
    if (c === '}') {
        openCount--;
        if (openCount < 0) {
            console.log('Unbalanced } at line ' + (i + 1));
            console.log(origLines[i]);
            process.exit(1);
        }
    }
  }
}
console.log('Final open count:', openCount);
