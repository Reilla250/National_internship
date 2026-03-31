async function verifyPersistence() {
  try {
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'company@internship.com', password: 'company123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;

    const getRes = await fetch('http://localhost:8080/api/internships/company/' + loginData.profileId, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const internships = await getRes.json();
    console.log("Fetched after update. Name is:", internships[0].title);
  } catch (err) {
    console.error(err);
  }
}

verifyPersistence();
