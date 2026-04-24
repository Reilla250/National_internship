import java.sql.*;

public class DatabaseCheck {
    public static void main(String[] args) {
        String url = "jdbc:mysql://sql7.freesqldatabase.com:3306/sql7824124?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        String username = "sql7824124";
        String password = "qVGEi2Apfd";
        
        try {
            System.out.println("Connecting to cloud database...");
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("SUCCESS: Connected to cloud database!");
            
            // Check if students table exists
            ResultSet tables = conn.getMetaData().getTables(null, null, null, new String[]{"TABLE"});
            boolean studentsTableExists = false;
            while (tables.next()) {
                if ("students".equalsIgnoreCase(tables.getString("TABLE_NAME"))) {
                    studentsTableExists = true;
                    break;
                }
            }
            System.out.println("Students table exists: " + studentsTableExists);
            
            if (studentsTableExists) {
                // Check students table structure
                ResultSet columns = conn.getMetaData().getColumns(null, null, "students", null);
                System.out.println("\nStudents table structure:");
                while (columns.next()) {
                    System.out.println("  - " + columns.getString("COLUMN_NAME") + 
                                     " (" + columns.getString("TYPE_NAME") + 
                                     ") Nullable: " + columns.getString("IS_NULLABLE"));
                }
                
                // Count total students
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as total FROM students");
                if (rs.next()) {
                    int totalStudents = rs.getInt("total");
                    System.out.println("\nTotal students in database: " + totalStudents);
                }
                
                // Show recent students
                rs = stmt.executeQuery("SELECT s.first_name, s.last_name, s.registration_number, s.email, s.created_at " +
                                  "FROM students s " +
                                  "LEFT JOIN users u ON s.user_id = u.user_id " +
                                  "ORDER BY s.created_at DESC LIMIT 10");
                System.out.println("\nRecent students:");
                while (rs.next()) {
                    System.out.println("  - " + rs.getString("first_name") + " " + rs.getString("last_name") + 
                                     " | " + rs.getString("registration_number") + 
                                     " | " + rs.getString("email") + 
                                     " | " + rs.getString("created_at"));
                }
            }
            
            conn.close();
            System.out.println("\nDatabase check completed successfully!");
            
        } catch (SQLException e) {
            System.out.println("ERROR: Database connection failed!");
            System.out.println("Message: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
        }
    }
}
