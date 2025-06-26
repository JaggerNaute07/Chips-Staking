const fs = require('fs');
const path = require('path');

const output = `
window.env = {
  FIREBASE_API_KEY: "${process.env.FIREBASE_API_KEY}",
  FIREBASE_AUTH_DOMAIN: "${process.env.FIREBASE_AUTH_DOMAIN}",
  FIREBASE_PROJECT_ID: "${process.env.FIREBASE_PROJECT_ID}",
  FIREBASE_STORAGE_BUCKET: "${process.env.FIREBASE_STORAGE_BUCKET}",
  FIREBASE_MESSAGING_SENDER_ID: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  FIREBASE_APP_ID: "${process.env.FIREBASE_APP_ID}"
};
`;

fs.writeFileSync(path.join(__dirname, 'public', 'env.js'), output);
console.log("✅ env.js generated with Vercel environment variables.");
