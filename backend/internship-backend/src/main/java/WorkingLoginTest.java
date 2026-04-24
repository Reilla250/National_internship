import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WorkingLoginTest {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("=== Testing Complete Registration & Login Flow ===");
        
        // Test login with the user that was successfully created
        System.out.println("Testing login with existing user (debug@example.com)...");
        try {
            String loginJson = "{"
                + "\"email\":\"debug@example.com\","
                + "\"password\":\"Test123456\""
                + "}";
            
            HttpRequest loginRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/login"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(loginJson))
                .build();
            
            HttpResponse<String> loginResponse = client.send(loginRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println("Login Status: " + loginResponse.statusCode());
            System.out.println("Login Response: " + loginResponse.body());
            
            if (loginResponse.statusCode() == 200) {
                System.out.println("SUCCESS: Login working correctly!");
                System.out.println("User can register and login successfully.");
            } else {
                System.out.println("Login still failing - investigating further...");
            }
            
        } catch (Exception e) {
            System.out.println("Login Error: " + e.getMessage());
        }
        
        // Test a fresh registration with minimal required fields
        System.out.println("\nTesting fresh registration with minimal fields...");
        try {
            String registerJson = "{"
                + "\"email\":\"fresh@example.com\","
                + "\"password\":\"Test123456\","
                + "\"firstName\":\"Fresh\","
                + "\"lastName\":\"User\","
                + "\"roleName\":\"STUDENT\","
                + "\"institutionId\":1"
                + "}";
            
            HttpRequest registerRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/register"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(registerJson))
                .build();
            
            HttpResponse<String> registerResponse = client.send(registerRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println("Fresh Registration Status: " + registerResponse.statusCode());
            System.out.println("Fresh Registration Response: " + registerResponse.body());
            
            if (registerResponse.statusCode() == 200) {
                System.out.println("SUCCESS: Fresh registration works!");
                
                // Now test login with the fresh user
                String freshLoginJson = "{"
                    + "\"email\":\"fresh@example.com\","
                    + "\"password\":\"Test123456\""
                    + "}";
                
                HttpRequest freshLoginRequest = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:8085/api/auth/login"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(freshLoginJson))
                    .build();
                
                HttpResponse<String> freshLoginResponse = client.send(freshLoginRequest, HttpResponse.BodyHandlers.ofString());
                System.out.println("Fresh Login Status: " + freshLoginResponse.statusCode());
                System.out.println("Fresh Login Response: " + freshLoginResponse.body());
                
                if (freshLoginResponse.statusCode() == 200) {
                    System.out.println("SUCCESS: Complete registration and login flow working!");
                }
            }
            
        } catch (Exception e) {
            System.out.println("Fresh Registration Error: " + e.getMessage());
        }
    }
}
