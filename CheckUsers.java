import java.sql.*;

public class CheckUsers {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/internship_db?useSSL=false&allowPublicKeyRetrieval=true";
        String user = "root";
        String password = "";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Connected to database.");
            String query = "SELECT u.email, r.role_name, u.status FROM users u JOIN roles r ON u.role_id = r.role_id";
            try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(query)) {
                System.out.println("Current Users in Database:");
                while (rs.next()) {
                    System.out.printf("- %s (%s) [%s]%n", 
                        rs.getString("email"), 
                        rs.getString("role_name"),
                        rs.getString("status"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
