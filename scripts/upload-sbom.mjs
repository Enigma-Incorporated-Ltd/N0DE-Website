/**
 * Upload a CycloneDX SBOM to Dependency-Track.
 *
 * Required environment variables:
 *   DEPENDENCY_TRACK_URL       e.g. http://51.15.201.73
 *   DEPENDENCY_TRACK_API_KEY   from Administration > Access Management > API Keys
 *   DEPENDENCY_TRACK_PROJECT   project UUID from the Dependency-Track project page
 *
 * Optional:
 *   SBOM_FILE                  defaults to bom.json in project root
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const url = process.env.DEPENDENCY_TRACK_URL?.replace(/\/$/, '');
const apiKey = process.env.DEPENDENCY_TRACK_API_KEY;
const projectUuid = process.env.DEPENDENCY_TRACK_PROJECT;
const sbomFile = resolve(projectRoot, process.env.SBOM_FILE ?? 'bom.json');

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

if (!url) fail('DEPENDENCY_TRACK_URL is not set');
if (!apiKey) fail('DEPENDENCY_TRACK_API_KEY is not set');
if (!projectUuid) fail('DEPENDENCY_TRACK_PROJECT is not set');

let bomBase64;
try {
  const bomContents = readFileSync(sbomFile);
  bomBase64 = bomContents.toString('base64');
} catch {
  fail(`Could not read SBOM file at ${sbomFile}. Run "npm run sbom:generate" first.`);
}

const endpoint = `${url}/api/v1/bom`;
console.log(`Uploading ${sbomFile} to ${endpoint} for project ${projectUuid}...`);

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    project: projectUuid,
    bom: bomBase64,
  }),
});

const body = await response.text();

if (!response.ok) {
  console.error(`Upload failed (${response.status}): ${body}`);
  process.exit(1);
}

console.log('SBOM uploaded successfully.');
if (body) console.log(body);
