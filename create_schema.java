import java.sql.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

public class create_schema {
    public static void main(String[] args) {
        String url = "jdbc:mysql://sql7.freesqldatabase.com:3306/sql7824124?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        String username = "sql7824124";
        String password = "qVGEi2Apfd";
        
        try {
            System.out.println("Connecting to cloud database...");
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("SUCCESS: Connected to cloud database!");
            
            // Read the schema file
            String schemaContent = new String(Files.readAllBytes(Paths.get("../../database/cloud-schema.sql")));
            
            // Split into individual statements
            String[] statements = schemaContent.split(";");
            
            Statement stmt = conn.createStatement();
            
            for (int i = 0; i < statements.length; i++) {
                String statement = statements[i].trim();
                if (!statement.isEmpty() && !statement.startsWith("--")) {
                    try {
                        System.out.println("Executing statement " + (i + 1) + "...");
                        stmt.execute(statement);
                        System.out.println("SUCCESS: Statement executed");
                    } catch (SQLException e) {
                        System.out.println("WARNING: Statement " + (i + 1) + " failed: " + e.getMessage());
                        // Continue with other statements
                    }
                }
            }
            
            // Check if tables were created
            System.out.println("\nChecking created tables...");
            ResultSet tables = conn.getMetaData().getTables(null, null, "%", null);
            while (tables.next()) {
                System.out.println("  - " + tables.getString("TABLE_NAME"));
            }
            
            conn.close();
            System.out.println("\nSUCCESS: Schema creation completed!");
            
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
