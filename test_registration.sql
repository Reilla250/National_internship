-- Test query to check if students are being inserted into the cloud database
SELECT 
    u.user_id,
    u.email,
    u.created_at as user_created_at,
    s.student_id,
    s.first_name,
    s.last_name,
    s.registration_number,
    s.program,
    s.phone,
    s.created_at as student_created_at
FROM users u
LEFT JOIN students s ON u.user_id = s.user_id
WHERE u.email LIKE '%teststudent%' OR u.email LIKE '%@example.com'
ORDER BY u.created_at DESC;
