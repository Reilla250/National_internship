# Test script for backend endpoints
Write-Host "Testing backend endpoints..."

# Test database health endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8085/api/database/health" -Method GET -TimeoutSec 10
    Write-Host "Database Health: SUCCESS"
    Write-Host $response.Content
} catch {
    Write-Host "Database Health: FAILED - $($_.Exception.Message)"
}

# Test institutions endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8085/api/test/institutions" -Method GET -TimeoutSec 10
    Write-Host "Institutions: SUCCESS"
    Write-Host $response.Content
} catch {
    Write-Host "Institutions: FAILED - $($_.Exception.Message)"
}

# Test main institution endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8085/api/institution" -Method GET -TimeoutSec 10
    Write-Host "Main Institutions: SUCCESS"
    Write-Host $response.Content
} catch {
    Write-Host "Main Institutions: FAILED - $($_.Exception.Message)"
}
