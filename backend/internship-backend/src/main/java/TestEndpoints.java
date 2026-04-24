import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TestEndpoints {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        System.out.println("Testing backend endpoints...");
        
        // Test database health endpoint
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/database/health"))
                .GET()
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Database Health Status: " + response.statusCode());
            System.out.println("Response: " + response.body());
        } catch (Exception e) {
            System.out.println("Database Health Error: " + e.getMessage());
        }
        
        // Test institutions endpoint
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/test/institutions"))
                .GET()
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Institutions Status: " + response.statusCode());
            System.out.println("Response: " + response.body());
        } catch (Exception e) {
            System.out.println("Institutions Error: " + e.getMessage());
        }
        
        // Test main institution endpoint
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8085/api/institution"))
                .GET()
                .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Main Institutions Status: " + response.statusCode());
            System.out.println("Response: " + response.body());
        } catch (Exception e) {
            System.out.println("Main Institutions Error: " + e.getMessage());
        }
    }
}
