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

  const steps = [];
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      const stepDate = new Date(step.created_at);
      if (stepDate >= cutoff) {
        steps.push(step);
      }
    } catch (e) {}
  }

  console.log(`Summary of activities today after 10:00 AM IST:\n`);

  steps.forEach((step, idx) => {
    const time = new Date(step.created_at).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
    if (step.type === 'USER_INPUT') {
      const content = step.content;
      let shortReq = '';
      if (content.includes('<USER_REQUEST>')) {
        shortReq = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].trim();
      } else {
        shortReq = content.trim();
      }
      if (shortReq.length > 200) {
        shortReq = shortReq.substring(0, 200) + '...';
      }
      console.log(`- [${time}] User requested: "${shortReq}"`);
    } else if (step.type === 'CODE_ACTION' || step.type === 'PLANNER_RESPONSE') {
      if (step.tool_calls) {
        step.tool_calls.forEach(tc => {
          if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content' || tc.name === 'write_to_file') {
            console.log(`  * [${time}] Modified file: ${tc.arguments?.TargetFile} (${tc.arguments?.Description || 'updated code'})`);
          }
        });
      }
    }
  });
}

run();
