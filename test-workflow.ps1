# Test CRUD Users - Workflow complet

Write-Host "TEST WORKFLOW CRUD USERS COMPLET" -ForegroundColor Cyan
Write-Host ""

# 1. REGISTER ADMIN
Write-Host "ETAPE 1: CREER UN ADMIN (Register)" -ForegroundColor Green
Write-Host "POST http://localhost:8010/api/users/register"
Write-Host ""

$adminJson = @{
    username = "admin_team"
    email = "admin@team.com"
    password = "Admin123!"
    role = "admin"
} | ConvertTo-Json

Write-Host "Request Body:" -ForegroundColor Yellow
Write-Host $adminJson
Write-Host ""

try {
    $adminRes = Invoke-WebRequest -Uri "http://localhost:8010/api/users/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body $adminJson
    $admin = $adminRes.Content | ConvertFrom-Json
    Write-Host "OK - Admin cree" -ForegroundColor Green
    Write-Host ($admin | ConvertTo-Json)
    $adminId = $admin._id
    Write-Host "Admin ID: $adminId" -ForegroundColor Cyan
} catch {
    Write-Host "ERREUR lors de la creation:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit
}

# 2. LOGIN
Write-Host ""
Write-Host "ETAPE 2: SE CONNECTER (Login)" -ForegroundColor Green
Write-Host "POST http://localhost:8010/api/users/login"
Write-Host ""

$loginJson = @{
    email = "admin@team.com"
    password = "Admin123!"
} | ConvertTo-Json

Write-Host "Request Body:" -ForegroundColor Yellow
Write-Host $loginJson
Write-Host ""

try {
    $loginRes = Invoke-WebRequest -Uri "http://localhost:8010/api/users/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body $loginJson
    $loginData = $loginRes.Content | ConvertFrom-Json
    Write-Host "OK - Connexion reussie" -ForegroundColor Green
    $token = $loginData.token
    Write-Host "Token: $($token.Substring(0, 50))..." -ForegroundColor Cyan
} catch {
    Write-Host "ERREUR lors de la connexion:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit
}

# 3. GET STUDENTS
Write-Host ""
Write-Host "ETAPE 3: GET /api/students AVEC LE TOKEN" -ForegroundColor Green
Write-Host "GET http://localhost:8010/api/students"
Write-Host ""

try {
    $studentsRes = Invoke-WebRequest -Uri "http://localhost:8010/api/students" -Method GET -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"}
    $students = $studentsRes.Content | ConvertFrom-Json
    Write-Host "OK - Requete reussie" -ForegroundColor Green
    Write-Host ($students | ConvertTo-Json)
} catch {
    Write-Host "ERREUR lors du GET /students:" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
    Write-Host "Message: $($_.Exception.Message)"
    
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
    exit
}

Write-Host ""
Write-Host "SUCCES - TOUS LES TESTS PASSES" -ForegroundColor Green
