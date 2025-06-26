const fs = require('fs');
const path = require('path');

const template = fs.readFileSync('./env.template.js', 'utf-8');

const output = template
  .replace('__FIREBASE_API_KEY__', process.env.FIREBASE_API_KEY)
  .replace('__FIREBASE_AUTH_DOMAIN__', process.env.FIREBASE_AUTH_DOMAIN)
  .replace('__FIREBASE_PROJECT_ID__', process.env.FIREBASE_PROJECT_ID)
  .replace('__FIREBASE_STORAGE_BUCKET__', process.env.FIREBASE_STORAGE_BUCKET)
  .replace('__FIREBASE_MESSAGING_SENDER_ID__', process.env.FIREBASE_MESSAGING_SENDER_ID)
  .replace('__FIREBASE_APP_ID__', process.env.FIREBASE_APP_ID);

fs.writeFileSync(path.join(__dirname, '../public/env.js'), output);
console.log('✅ env.js generated successfully');
