import java.sql.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class ResetPasswords {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/internship_db?useSSL=false&allowPublicKeyRetrieval=true";
        String user = "root";
        String password = "";

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String newHash = encoder.encode("password123");

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String update = "UPDATE users SET password = ? WHERE email IN (?, ?)";
            try (PreparedStatement start = conn.prepareStatement(update)) {
                start.setString(1, newHash);
                start.setString(2, "patrictuyisenge4@gmail.com");
                start.setString(3, "student@internship.com");
                int rows = start.executeUpdate();
                System.out.println("Updated " + rows + " users with password: password123");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
