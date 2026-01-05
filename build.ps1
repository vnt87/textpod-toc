# Build script for TextPod

# Increment version
Write-Host "Incrementing version..."
node scripts/increment_version.js

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to increment version"
    exit $LASTEXITCODE
}

# Build Docker image
Write-Host "Building Docker image..."
docker build -t textpod .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker build failed"
    exit $LASTEXITCODE
}

Write-Host "Build completed successfully!"
