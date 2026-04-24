import java.sql.*;

public class DBTest {
    public static void main(String[] args) {
        String url = "jdbc:mysql://shortline.proxy.rlwy.net:44641/railway?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        String username = "root";
        String password = "zkJyVvwSZXIhtygFYXSBYClKOIkrGPRX";
        
        try {
            System.out.println("Testing Cloud Database connection...");
            
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("SUCCESS: Cloud Database connection established!");
            
            DatabaseMetaData metaData = conn.getMetaData();
            System.out.println("Database: " + metaData.getDatabaseProductName());
            System.out.println("Version: " + metaData.getDatabaseProductVersion());
            
            // Check if students table exists
            ResultSet studentsTable = conn.getMetaData().getTables(null, null, "students", null);
            if (studentsTable.next()) {
                System.out.println("SUCCESS: students table exists!");
                
                // Check students table structure
                ResultSet columns = conn.getMetaData().getColumns(null, null, "students", null);
                System.out.println("\nStudents table columns:");
                while (columns.next()) {
                    System.out.println("  - " + columns.getString("COLUMN_NAME") + 
                                     " (" + columns.getString("TYPE_NAME") + 
                                     ") Nullable: " + columns.getString("IS_NULLABLE"));
                }
                
                // Check if there are any students
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as count FROM students");
                if (rs.next()) {
                    System.out.println("\nTotal students in database: " + rs.getInt("count"));
                }
                
                // Check for test students
                rs = stmt.executeQuery(
                    "SELECT COUNT(*) as count FROM users WHERE email LIKE '%teststudent%' OR email LIKE '%@example.com'"
                );
                
                if (rs.next()) {
                    int count = rs.getInt("count");
                    System.out.println("Found " + count + " test users in database");
                }
                
                // Get recent students with user info
                rs = stmt.executeQuery(
                    "SELECT u.email, s.first_name, s.last_name, s.registration_number, u.created_at " +
                    "FROM users u LEFT JOIN students s ON u.user_id = s.user_id " +
                    "WHERE u.email LIKE '%teststudent%' OR u.email LIKE '%@example.com' " +
                    "ORDER BY u.created_at DESC LIMIT 5"
                );
                
                System.out.println("\nRecent student registrations:");
                boolean found = false;
                while (rs.next()) {
                    found = true;
                    System.out.println("  - " + rs.getString("email") + 
                                     " | " + rs.getString("first_name") + 
                                     " " + rs.getString("last_name") + 
                                     " | Reg: " + rs.getString("registration_number") +
                                     " | Created: " + rs.getString("created_at"));
                }
                
                if (!found) {
                    System.out.println("  No test students found in database");
                }
                
            } else {
                System.out.println("ERROR: students table not found!");
                
                // Check what tables exist
                ResultSet allTables = conn.getMetaData().getTables(null, null, "%", null);
                System.out.println("\nAvailable tables:");
                while (allTables.next()) {
                    System.out.println("  - " + allTables.getString("TABLE_NAME"));
                }
            }
            
            conn.close();
            System.out.println("\nSUCCESS: All database tests passed!");
            
        } catch (SQLException e) {
            System.out.println("ERROR: Database connection failed!");
            System.out.println("Message: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
        }
    }
}
