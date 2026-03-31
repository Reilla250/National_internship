async function testUpdate() {
  try {
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'company@internship.com', password: 'company123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Logged in, token:', token.substring(0, 10) + '...');

    const getRes = await fetch('http://localhost:8080/api/internships/company/' + loginData.profileId, {
      headers: { Authorization: 'Bearer ' + token }
    });
    let internships = await getRes.json();
    
    if (internships.length === 0) {
        console.log("No internships found. Creating one...");
        await fetch('http://localhost:8080/api/internships/company/' + loginData.profileId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify({
                title: "Test Internship",
                description: "Test",
                requiredSkills: "None",
                location: "Kigali",
                sector: "ICT",
                startDate: null,
                endDate: null,
                slots: 5
            })
        });
        const getRes2 = await fetch('http://localhost:8080/api/internships/company/' + loginData.profileId, {
            headers: { Authorization: 'Bearer ' + token }
        });
        internships = await getRes2.json();
    }

    const internshipId = internships[0].internshipId;
    console.log('Will update internship', internshipId);

    const updateRes = await fetch('http://localhost:8080/api/internships/' + internshipId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({
        title: "Updated Title " + Date.now(),
        description: "Updated description",
        requiredSkills: "Java, Spring Boot",
        location: "Kigali Makuza Peace Plaza",
        sector: "ICT",
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        slots: 3
      })
    });
    
    const updateData = await updateRes.json();
    console.log('Update status:', updateRes.status);
    console.log('Update success!', updateData);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

testUpdate();
