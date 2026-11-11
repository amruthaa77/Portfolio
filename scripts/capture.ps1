$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$brainDir = "C:\Users\amrut\.gemini\antigravity\brain\3f1b12cd-7743-40ca-87c2-06baef3545a2"
$profileDir = "$env:TEMP\edge_screenshot_profile"

if (-not (Test-Path "screenshots")) {
    New-Item -ItemType Directory -Path "screenshots" -Force | Out-Null
}

Write-Host "Starting Vite preview server on 127.0.0.1:4173..."
$server = Start-Process -FilePath "npx.cmd" -ArgumentList "vite", "preview", "--port", "4173", "--host", "127.0.0.1" -PassThru

# Warm up check: wait until HTTP 200 responds
$warmedUp = $false
for ($i = 0; $i -lt 20; $i++) {
    try {
        $res = Invoke-WebRequest -Uri "http://127.0.0.1:4173" -UseBasicParsing -TimeoutSec 2
        if ($res.StatusCode -eq 200) {
            $warmedUp = $true
            Write-Host "Server is live and ready!"
            break
        }
    } catch {
        Start-Sleep -Milliseconds 600
    }
}

if (-not $warmedUp) {
    Write-Host "Warning: Server did not respond with 200 within timeout."
}

try {
    # 1. 360px Mobile (360x840)
    Write-Host "Capturing 360px mobile screenshot..."
    $tmp360 = "$env:TEMP\screenshot-360px.png"
    if (Test-Path $tmp360) { Remove-Item $tmp360 -Force }
    $p1 = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=360,840", "--screenshot=$tmp360", "http://127.0.0.1:4173" -PassThru
    $p1.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmp360) {
        Copy-Item $tmp360 "$brainDir\screenshot-360px.png" -Force
        Copy-Item $tmp360 "screenshots\screenshot-360px.png" -Force
        Write-Host "360px OK: $((Get-Item $tmp360).Length) bytes"
    } else {
        Write-Host "Error: 360px failed to capture"
    }

    # 2. 768px Tablet (768x1024)
    Write-Host "Capturing 768px tablet screenshot..."
    $tmp768 = "$env:TEMP\screenshot-768px.png"
    if (Test-Path $tmp768) { Remove-Item $tmp768 -Force }
    $p2 = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=768,1024", "--screenshot=$tmp768", "http://127.0.0.1:4173" -PassThru
    $p2.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmp768) {
        Copy-Item $tmp768 "$brainDir\screenshot-768px.png" -Force
        Copy-Item $tmp768 "screenshots\screenshot-768px.png" -Force
        Write-Host "768px OK: $((Get-Item $tmp768).Length) bytes"
    }

    # 3. 1280px Desktop (1280x800)
    Write-Host "Capturing 1280px desktop screenshot..."
    $tmp1280 = "$env:TEMP\screenshot-1280px.png"
    if (Test-Path $tmp1280) { Remove-Item $tmp1280 -Force }
    $p3 = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=1280,800", "--screenshot=$tmp1280", "http://127.0.0.1:4173" -PassThru
    $p3.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmp1280) {
        Copy-Item $tmp1280 "$brainDir\screenshot-1280px.png" -Force
        Copy-Item $tmp1280 "screenshots\screenshot-1280px.png" -Force
        Write-Host "1280px OK: $((Get-Item $tmp1280).Length) bytes"
    }

    # 4. 1920px Wide Desktop (1920x1080)
    Write-Host "Capturing 1920px wide desktop screenshot..."
    $tmp1920 = "$env:TEMP\screenshot-1920px.png"
    if (Test-Path $tmp1920) { Remove-Item $tmp1920 -Force }
    $p4 = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=1920,1080", "--screenshot=$tmp1920", "http://127.0.0.1:4173" -PassThru
    $p4.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmp1920) {
        Copy-Item $tmp1920 "$brainDir\screenshot-1920px.png" -Force
        Copy-Item $tmp1920 "screenshots\screenshot-1920px.png" -Force
        Write-Host "1920px OK: $((Get-Item $tmp1920).Length) bytes"
    }
}
finally {
    Write-Host "Cleaning up preview server..."
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
