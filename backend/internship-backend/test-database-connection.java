import java.sql.*;

public class TestDatabaseConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/internship_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        String username = "root";
        String password = "";
        
        try {
            System.out.println("Testing MySQL connection...");
            
            // Test basic connection
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("✅ Database connection successful!");
            
            // Test if database exists and can create tables
            DatabaseMetaData metaData = conn.getMetaData();
            System.out.println("✅ Connected to: " + metaData.getURL());
            System.out.println("✅ Database Product: " + metaData.getDatabaseProductName());
            System.out.println("✅ Database Version: " + metaData.getDatabaseProductVersion());
            
            // Test creating a simple table
            Statement stmt = conn.createStatement();
            String createTestTable = "CREATE TABLE IF NOT EXISTS test_connection (id INT PRIMARY KEY, message VARCHAR(100))";
            stmt.execute(createTestTable);
            System.out.println("✅ Test table creation successful!");
            
            // Test inserting data
            String insertData = "INSERT INTO test_connection (id, message) VALUES (1, 'Database connection test successful!') ON DUPLICATE KEY UPDATE message = 'Database connection test successful!'";
            stmt.execute(insertData);
            System.out.println("✅ Data insertion successful!");
            
            // Test querying data
            ResultSet rs = stmt.executeQuery("SELECT message FROM test_connection WHERE id = 1");
            if (rs.next()) {
                System.out.println("✅ Query result: " + rs.getString("message"));
            }
            
            // Clean up
            stmt.execute("DROP TABLE IF EXISTS test_connection");
            System.out.println("✅ Cleanup successful!");
            
            conn.close();
            System.out.println("✅ All database tests passed! Your MySQL configuration is working correctly.");
            
        } catch (SQLException e) {
            System.out.println("❌ Database connection failed:");
            System.out.println("Error: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            System.out.println("Error Code: " + e.getErrorCode());
            
            if (e.getErrorCode() == 1045) {
                System.out.println("\n💡 Solution: Check your MySQL root password and update it in application.properties");
            } else if (e.getErrorCode() == 1049) {
                System.out.println("\n💡 Solution: Database doesn't exist. Make sure MySQL is running and create the database.");
            } else if (e.getErrorCode() == 2003) {
                System.out.println("\n💡 Solution: MySQL server is not running. Start MySQL service.");
            }
        }
    }
}
