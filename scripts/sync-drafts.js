const fs = require('fs');
const path = require('path');

const VECTORS_DIR = path.join(__dirname, '..', 'src', 'vectors');
const DEFAULT_URL = 'https://veclim.com/devapi/draft-vectors/sync/';

function loadEnvFiles() {
  for (const name of ['.env.local', '.env']) {
    const file = path.join(__dirname, '..', name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*(DRAFT_SYNC_[A-Z_]+)\s*=\s*(.*?)\s*$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
}

loadEnvFiles();

const url = process.env.DRAFT_SYNC_URL || DEFAULT_URL;
const secret = process.env.DRAFT_SYNC_SECRET || '';
const dryRun = process.argv.includes('--dry-run');
const optional = process.argv.includes('--if-configured');

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

function collectDraftIds() {
  const ids = [];
  for (const entry of fs.readdirSync(VECTORS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(VECTORS_DIR, entry.name, 'module.js');
    if (!fs.existsSync(file)) continue;
    const source = stripComments(fs.readFileSync(file, 'utf8'));
    const id = (source.match(/\bid:\s*['"]([^'"]+)['"]/) || [])[1];
    const isDraft = /\bstatus:\s*['"]draft['"]/.test(source);
    if (id && isDraft) ids.push(id);
  }
  return ids.sort();
}

async function main() {
  const draftIds = collectDraftIds();
  console.log(`Draft vectors found: ${draftIds.length ? draftIds.join(', ') : 'none'}`);

  if (dryRun) {
    console.log('Dry run, nothing sent.');
    return;
  }
  if (!secret) {
    if (optional) {
      console.log('DRAFT_SYNC_SECRET not set, skipping draft sync.');
      return;
    }
    console.error('DRAFT_SYNC_SECRET is not set.');
    process.exit(1);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Sync-Token': secret,
    },
    body: JSON.stringify({ draftVectorIds: draftIds }),
  });
  if (!response.ok) {
    console.error(`Draft sync failed: ${response.status} ${await response.text()}`);
    process.exit(1);
  }
  console.log('Draft sync done:', await response.text());
}

main().catch((error) => {
  console.error('Draft sync failed:', error.message);
  process.exit(1);
});
