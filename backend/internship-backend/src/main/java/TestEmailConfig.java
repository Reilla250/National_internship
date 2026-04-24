import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestEmailConfig {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("=== Testing Email Configuration ===");
        
        // Test registration with a valid email to trigger OTP
        try {
            String jsonBody = "{"
                + "\"email\":\"testuser@gmail.com\","
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
                System.out.println("Registration successful - Check email for OTP");
            } else {
                System.out.println("Registration failed - Check response for details");
            }
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        System.out.println("\n=== Email Configuration Details ===");
        System.out.println("SMTP Host: smtp.gmail.com");
        System.out.println("SMTP Port: 465 (SSL)");
        System.out.println("Username: patrictuyisenge4@gmail.com");
        System.out.println("SSL Enabled: true");
        System.out.println("Timeout: 60 seconds");
        System.out.println("\nIf you still don't receive emails, check:");
        System.out.println("1. Spam/Junk folder");
        System.out.println("2. Gmail app password is correct");
        System.out.println("3. Network allows SMTP connections");
    }
}
