import fs from 'fs';
import readline from 'readline';

const logFile = 'C:/Users/Sweta Shukla/.gemini/antigravity-ide/brain/9c4fe101-870d-4661-983a-2d530589d03f/.system_generated/logs/transcript.jsonl';
const cutoff = new Date('2026-07-21T04:30:00Z'); // 10:00 AM IST

async function run() {
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log('Events on 2026-07-21 after 10:00 AM IST:');
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      const stepDate = new Date(step.created_at);
      if (stepDate >= cutoff) {
        console.log(`[${step.created_at}] Source: ${step.source}, Type: ${step.type}`);
        if (step.type === 'USER_INPUT') {
          console.log(`  User Request: ${step.content.substring(0, 150)}...`);
        } else if (step.tool_calls && step.tool_calls.length > 0) {
          step.tool_calls.forEach(tc => {
            console.log(`  Tool Call: ${tc.name} -> ${tc.toolAction || tc.toolSummary}`);
          });
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
}

run();
