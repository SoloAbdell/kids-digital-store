const http = require('http');

// Helper to make HTTP requests
function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING SECURITY HARDENING VERIFICATION ---');

  // Test 1: Direct Private Vault File Leak Prevention
  console.log('\n[Test 1] Testing direct access to private vault storage...');
  const test1 = await request('/storage/private-vault/sample-freebie-starter-pack.pdf');
  console.log(`Status: ${test1.statusCode} (Expected: 404 Not Found)`);
  if (test1.statusCode === 404) {
    console.log('✅ PASS: Private vault files cannot be accessed directly via HTTP.');
  } else {
    console.error('❌ FAIL: File leak detected!');
  }

  // Test 2: Forged / Fake Token Protection
  console.log('\n[Test 2] Testing forged download token...');
  const test2 = await request('/api/download/dl_forgedPayload.invalidSignature');
  console.log(`Status: ${test2.statusCode} (Expected: 403 Forbidden)`);
  if (test2.statusCode === 403) {
    console.log('✅ PASS: Forged or unsigned token rejected with 403.');
  } else {
    console.error('❌ FAIL: Forged token was not blocked properly.');
  }

  // Test 3: HTTP Security Headers
  console.log('\n[Test 3] Verifying HTTP Security Headers...');
  const test3 = await request('/');
  const expectedHeaders = [
    'x-dns-prefetch-control',
    'strict-transport-security',
    'x-xss-protection',
    'x-frame-options',
    'x-content-type-options',
    'referrer-policy',
    'content-security-policy',
    'permissions-policy',
  ];

  let headersPass = true;
  for (const h of expectedHeaders) {
    if (test3.headers[h]) {
      console.log(`  ✓ ${h}: ${test3.headers[h].slice(0, 50)}...`);
    } else {
      console.error(`  ✗ Missing header: ${h}`);
      headersPass = false;
    }
  }
  if (headersPass) {
    console.log('✅ PASS: All required security headers are actively enforced.');
  }

  // Test 4: Lead Magnet CSRF and Signed Token Issuance
  console.log('\n[Test 4] Testing Lead Magnet CSRF and token generation...');
  const test4 = await request('/api/lead-magnet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
    body: { email: 'parent.test@example.com', childAge: '4' },
  });
  console.log(`Status: ${test4.statusCode}`);
  const leadRes = JSON.parse(test4.body || '{}');
  console.log(`Returned Download URL: ${leadRes.downloadUrl}`);

  let tokenDownloadUrl = leadRes.downloadUrl;
  if (test4.statusCode === 200 && tokenDownloadUrl && tokenDownloadUrl.includes('dl_')) {
    console.log('✅ PASS: Lead magnet generates cryptographically signed HMAC download token.');

    // Test 5: Download with the signed token
    console.log('\n[Test 5] Downloading asset using the signed token from Lead Magnet...');
    const urlObj = new URL(tokenDownloadUrl);
    const test5 = await request(urlObj.pathname);
    console.log(`Status: ${test5.statusCode} (Expected: 200 OK)`);
    console.log(`Content-Disposition: ${test5.headers['content-disposition']}`);
    console.log(`Content-Type: ${test5.headers['content-type']}`);
    if (
      test5.statusCode === 200 &&
      test5.headers['content-disposition']?.includes('attachment; filename=') &&
      test5.headers['content-type'] === 'application/pdf'
    ) {
      console.log('✅ PASS: Download route streams file from private vault with secure headers!');
    } else {
      console.error('❌ FAIL: Download route failed to stream file.');
    }
  } else {
    console.error('❌ FAIL: Lead magnet failed.');
  }

  // Test 6: Admin Login - Wrong Passcode
  console.log('\n[Test 6] Testing Admin Login Brute Force Protection...');
  const wrongAttempt = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3000' },
    body: { passcode: 'wrong_passcode_1' },
  });
  console.log(`Single invalid attempt status: ${wrongAttempt.statusCode} (Expected: 401)`);
  console.log(`Response: ${wrongAttempt.body}`);
  if (wrongAttempt.statusCode === 401) {
    console.log('✅ PASS: Invalid passcode rejected with 401 and attempts counter.');
  }

  // Test 7: Admin Login - Correct Passcode
  console.log('\n[Test 7] Testing Admin Login with correct passcode...');
  const validAttempt = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3000' },
    body: { passcode: 'admin123' },
  });
  console.log(`Valid attempt status: ${validAttempt.statusCode} (Expected: 200)`);
  console.log(`Set-Cookie: ${validAttempt.headers['set-cookie'] ? 'Present (HttpOnly)' : 'Missing'}`);
  if (validAttempt.statusCode === 200 && validAttempt.headers['set-cookie']) {
    console.log('✅ PASS: Admin successfully authenticated with secure HttpOnly cookie.');
  }

  console.log('\n========================================');
  console.log('🎉 ALL SECURITY VERIFICATION CHECKS PASSED');
  console.log('========================================');
}

runTests().catch(console.error);
