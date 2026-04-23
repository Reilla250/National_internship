import java.sql.*;

public class DBTest {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/internship_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        String username = "root";
        String password = "";
        
        try {
            System.out.println("Testing MySQL connection...");
            
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("SUCCESS: Database connection established!");
            
            DatabaseMetaData metaData = conn.getMetaData();
            System.out.println("Database: " + metaData.getDatabaseProductName());
            System.out.println("Version: " + metaData.getDatabaseProductVersion());
            
            // Check if tables exist
            ResultSet tables = conn.getMetaData().getTables(null, null, "users", null);
            if (tables.next()) {
                System.out.println("SUCCESS: users table exists!");
            } else {
                System.out.println("INFO: users table not found - will be created by Spring Boot");
            }
            
            conn.close();
            System.out.println("SUCCESS: All database tests passed!");
            
        } catch (SQLException e) {
            System.out.println("ERROR: Database connection failed!");
            System.out.println("Message: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
            
            if (e.getErrorCode() == 1045) {
                System.out.println("SOLUTION: Check MySQL root password in application.properties");
            } else if (e.getErrorCode() == 1049) {
                System.out.println("SOLUTION: Database doesn't exist - Spring Boot will create it");
            } else if (e.getErrorCode() == 2003) {
                System.out.println("SOLUTION: Start MySQL service (XAMPP)");
            }
        }
    }
}
