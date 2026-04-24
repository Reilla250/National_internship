import java.sql.*;

public class VerifyDatabase {
    public static void main(String[] args) {
        // Test both possible database names
        String[] databases = {"sql7824124", "sql7824118", "sql7824130"};
        
        for (String dbName : databases) {
            testDatabase(dbName);
        }
    }
    
    private static void testDatabase(String dbName) {
        String url = "jdbc:mysql://sql7.freesqldatabase.com:3306/" + dbName + "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        String username = "sql7824124";
        String password = "qVGEi2Apfd";
        
        try {
            System.out.println("\n=== Testing database: " + dbName + " ===");
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("✅ SUCCESS: Connected to database: " + dbName);
            
            // Check if students table exists and count records
            ResultSet tables = conn.getMetaData().getTables(null, null, null, new String[]{"TABLE"});
            boolean studentsTableExists = false;
            while (tables.next()) {
                if ("students".equalsIgnoreCase(tables.getString("TABLE_NAME"))) {
                    studentsTableExists = true;
                    break;
                }
            }
            
            if (studentsTableExists) {
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as total FROM students");
                if (rs.next()) {
                    int totalStudents = rs.getInt("total");
                    System.out.println("Total students in " + dbName + ": " + totalStudents);
                    
                    if (totalStudents > 0) {
                        // Show recent students
                        ResultSet recent = stmt.executeQuery("SELECT first_name, last_name, registration_number, created_at " +
                                                  "FROM students ORDER BY created_at DESC LIMIT 5");
                        System.out.println("Recent students:");
                        while (recent.next()) {
                            System.out.println("  - " + recent.getString("first_name") + " " + recent.getString("last_name") + 
                                             " | " + recent.getString("registration_number") + 
                                             " | " + recent.getString("created_at"));
                        }
                    }
                }
            } else {
                System.out.println("Students table not found in " + dbName);
            }
            
            conn.close();
            
        } catch (SQLException e) {
            System.out.println("❌ ERROR: Database " + dbName + " failed!");
            System.out.println("Message: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
        }
    }
}
