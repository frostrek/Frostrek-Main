import fs from 'fs';
import readline from 'readline';

const logFile = 'C:/Users/Sweta Shukla/.gemini/antigravity-ide/brain/9c4fe101-870d-4661-983a-2d530589d03f/.system_generated/logs/transcript_full.jsonl';
const cutoff = new Date('2026-07-21T04:30:00Z'); // 10:00 AM IST

async function run() {
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const events = [];
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      const stepDate = new Date(step.created_at);
      if (stepDate >= cutoff) {
        events.push(step);
      }
    } catch (e) {}
  }

  console.log(`=== FULL TRANSCRIPT AFTER 10:00 AM IST (${events.length} steps found) ===\n`);

  events.forEach(step => {
    const localTime = new Date(step.created_at).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    if (step.type === 'USER_INPUT') {
      console.log(`[${localTime}] 👤 USER INPUT:`);
      console.log(`  "${step.content.trim()}"\n`);
    } else if (step.type === 'CODE_ACTION') {
      console.log(`[${localTime}] 📝 FILE EDIT:`);
      if (step.tool_calls) {
        step.tool_calls.forEach(tc => {
          console.log(`  Tool: ${tc.name}`);
          console.log(`  File: ${tc.arguments?.TargetFile || tc.arguments?.AbsolutePath}`);
          console.log(`  Summary: ${tc.arguments?.Description || tc.toolSummary || ''}`);
        });
      }
      console.log('');
    } else if (step.type === 'RUN_COMMAND') {
      if (step.tool_calls) {
        step.tool_calls.forEach(tc => {
          console.log(`[${localTime}] 💻 COMMAND RUN: ${tc.arguments?.CommandLine}`);
        });
      }
      console.log('');
    }
  });
}

run();
