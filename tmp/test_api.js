async function test() {
    try {
        const loginRes = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@internship.com', password: 'admin123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;

        const statsRes = await fetch('http://localhost:8080/api/admin/stats', {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Stats status:", statsRes.status);
        console.log("Stats Data:", await statsRes.text());
        
    } catch (e) { console.error("Test failed:", e.message); }
}
test();
