import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class CheckRoles {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("=== Checking Available Roles ===");
        
        // Check if we can access the database directly to see roles
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/database/health"))
                .GET()
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Database Status: " + response.statusCode());
            
            if (response.statusCode() == 200) {
                System.out.println("Database is connected - checking roles...");
                System.out.println("The issue might be that STUDENT role doesn't exist in database.");
                System.out.println("Let me try to initialize the roles first.");
            }
            
        } catch (Exception e) {
            System.out.println("Error checking database: " + e.getMessage());
        }
        
        // Try to register with a different approach - check what the actual error is
        System.out.println("\n=== Testing Registration with Debug Info ===");
        try {
            String registerJson = "{"
                + "\"email\":\"debug@example.com\","
                + "\"password\":\"Test123456\","
                + "\"firstName\":\"Debug\","
                + "\"lastName\":\"User\","
                + "\"roleName\":\"STUDENT\","
                + "\"institutionId\":1"
                + "}";
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/register"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(registerJson))
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Registration Status: " + response.statusCode());
            System.out.println("Registration Response: " + response.body());
            
            // The error says "roleName":"must not be blank" which means validation is failing
            // This suggests the JSON might not be parsed correctly
            
        } catch (Exception e) {
            System.out.println("Registration Error: " + e.getMessage());
        }
    }
}
