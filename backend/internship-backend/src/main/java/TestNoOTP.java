import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestNoOTP {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("=== Testing Registration Without OTP ===");
        
        // Test registration without OTP requirement
        try {
            String jsonBody = "{"
                + "\"email\":\"testuser@example.com\","
                + "\"password\":\"Test123456\","
                + "\"firstName\":\"Test\","
                + "\"lastName\":\"User\","
                + "\"role\":\"STUDENT\","
                + "\"institutionId\":1,"
                + "\"registrationNumber\":\"REG123456\","
                + "\"phone\":\"+250788123456\""
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
                System.out.println("SUCCESS: Registration completed without OTP!");
                if (response.body().contains("token")) {
                    System.out.println("JWT Token received - User can login immediately");
                }
            } else {
                System.out.println("Registration failed - Check response for details");
            }
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Test that OTP endpoints are removed
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/auth/send-otp"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{\"email\":\"test@example.com\"}"))
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("OTP Endpoint Status: " + response.statusCode());
            if (response.statusCode() == 404) {
                System.out.println("SUCCESS: OTP endpoints have been removed");
            }
            
        } catch (Exception e) {
            System.out.println("Error testing OTP endpoint: " + e.getMessage());
        }
    }
}
