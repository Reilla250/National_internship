import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestEmailService {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("=== Testing Email OTP Functionality ===");
        
        // Test OTP generation and email sending
        try {
            // Create a test registration request to trigger OTP email
            String jsonBody = "{"
                + "\"email\":\"test@example.com\","
                + "\"password\":\"Test123456\","
                + "\"firstName\":\"Test\","
                + "\"lastName\":\"User\","
                + "\"role\":\"STUDENT\","
                + "\"institutionId\":1"
                + "}";
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/register"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Registration Status: " + response.statusCode());
            System.out.println("Response: " + response.body());
            
            if (response.statusCode() == 200) {
                System.out.println("Registration successful - OTP should be sent to test@example.com");
            } else {
                System.out.println("Registration failed");
            }
            
        } catch (Exception e) {
            System.out.println("Error testing OTP: " + e.getMessage());
        }
        
        // Test send OTP endpoint directly
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/send-otp"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{\"email\":\"test@example.com\"}"))
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Send OTP Status: " + response.statusCode());
            System.out.println("Response: " + response.body());
            
        } catch (Exception e) {
            System.out.println("Error testing send OTP: " + e.getMessage());
        }
    }
}
