import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestLogin {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("=== Testing Login Functionality ===");
        
        // Test 1: Register a test user first
        System.out.println("1. Creating test user...");
        try {
            String registerJson = "{"
                + "\"email\":\"testlogin@example.com\","
                + "\"password\":\"Test123456\","
                + "\"firstName\":\"Test\","
                + "\"lastName\":\"User\","
                + "\"roleName\":\"STUDENT\","
                + "\"institutionId\":1,"
                + "\"registrationNumber\":\"REG999999\","
                + "\"phone\":\"+250788999999\""
                + "}";
            
            HttpRequest registerRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/register"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(registerJson))
                .build();
            
            HttpResponse<String> registerResponse = client.send(registerRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println("Registration Status: " + registerResponse.statusCode());
            System.out.println("Registration Response: " + registerResponse.body());
            
        } catch (Exception e) {
            System.out.println("Registration Error: " + e.getMessage());
        }
        
        // Test 2: Try to login with the created user
        System.out.println("\n2. Testing login...");
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
            } else {
                System.out.println("ISSUE: Login failed - check response above");
            }
            
        } catch (Exception e) {
            System.out.println("Login Error: " + e.getMessage());
        }
        
        // Test 3: Check if user exists in database
        System.out.println("\n3. Checking user creation...");
        try {
            HttpRequest checkRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/database/health"))
                .GET()
                .build();
            
            HttpResponse<String> checkResponse = client.send(checkRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println("Database Health: " + checkResponse.statusCode());
            System.out.println("Database Response: " + checkResponse.body());
            
        } catch (Exception e) {
            System.out.println("Database Check Error: " + e.getMessage());
        }
    }
}
