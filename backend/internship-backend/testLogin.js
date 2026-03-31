async function testLogin() {
  try {
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'tuyisengep32@gmail.com', password: 'unknown' })
    });
    const status = loginRes.status;
    const body = await loginRes.text();
    console.log('Status:', status);
    console.log('Body:', body);
  } catch (err) {
    console.error('Fetch failed:', err.message);
  }
}

testLogin();
