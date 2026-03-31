async function test() {
    try {
        console.log("Logging in via proxy...");
        const loginRes = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@internship.com', password: 'admin123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;

        console.log("Fetching stats via proxy...");
        const appRes = await fetch('http://localhost:3000/api/applications/student/1', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("App status:", appRes.status);

    } catch (e) { console.error("Test failed:", e.message); }
}
test();
