import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TiDBConnectionTest {
    public static void main(String[] args) {
        String url = "jdbc:mysql://gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/internship_db?useSSL=true&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&enabledTLSProtocols=TLSv1.2,TLSv1.3";
        String username = "3jMrabZWjdqqmw9.root";
        String password = "6QWm64HjDfYkgQLc";
        
        System.out.println("Testing TiDB Cloud connection...");
        System.out.println("Host: gateway01.eu-central-1.prod.aws.tidbcloud.com:4000");
        System.out.println("Database: internship_db");
        System.out.println("User: " + username);
        
        try {
            Connection connection = DriverManager.getConnection(url, username, password);
            System.out.println("✅ TiDB Cloud connection successful!");
            System.out.println("Database: " + connection.getMetaData().getDatabaseProductName());
            System.out.println("Version: " + connection.getMetaData().getDatabaseProductVersion());
            connection.close();
        } catch (SQLException e) {
            System.out.println("❌ TiDB Cloud connection failed!");
            System.out.println("Error: " + e.getMessage());
            System.out.println("SQL State: " + e.getSQLState());
            e.printStackTrace();
        }
    }
}
