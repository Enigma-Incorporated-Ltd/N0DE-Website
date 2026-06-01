# Upload bom.json to Dependency-Track (PowerShell)
# Set these before running, or pass as parameters:
#   $env:DEPENDENCY_TRACK_URL       = "http://51.15.201.73"
#   $env:DEPENDENCY_TRACK_API_KEY   = "your-api-key"
#   $env:DEPENDENCY_TRACK_PROJECT   = "your-project-uuid"

param(
    [string]$Url = $env:DEPENDENCY_TRACK_URL,
    [string]$ApiKey = $env:DEPENDENCY_TRACK_API_KEY,
    [string]$ProjectUuid = $env:DEPENDENCY_TRACK_PROJECT,
    [string]$SbomFile = "bom.json"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$bomPath = Join-Path $root $SbomFile

if (-not $Url) { throw "DEPENDENCY_TRACK_URL is not set" }
if (-not $ApiKey) { throw "DEPENDENCY_TRACK_API_KEY is not set" }
if (-not $ProjectUuid) { throw "DEPENDENCY_TRACK_PROJECT is not set" }
if (-not (Test-Path $bomPath)) { throw "SBOM not found at $bomPath. Run: npm run sbom:generate" }

$Url = $Url.TrimEnd("/")
$bomBase64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($bomPath))

$payload = @{
    project = $ProjectUuid
    bom     = $bomBase64
} | ConvertTo-Json -Compress

Write-Host "Uploading $bomPath to $Url/api/v1/bom ..."

$response = Invoke-RestMethod `
    -Uri "$Url/api/v1/bom" `
    -Method Post `
    -Headers @{ "X-Api-Key" = $ApiKey } `
    -ContentType "application/json" `
    -Body $payload

Write-Host "SBOM uploaded successfully."
$response
