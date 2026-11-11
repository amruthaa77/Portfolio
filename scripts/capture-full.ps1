$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$brainDir = "C:\Users\amrut\.gemini\antigravity\brain\3f1b12cd-7743-40ca-87c2-06baef3545a2"
$profileDir = "$env:TEMP\edge_screenshot_profile"

$server = Start-Process -FilePath "npx.cmd" -ArgumentList "vite", "preview", "--port", "4173", "--host", "127.0.0.1" -PassThru
Start-Sleep -Seconds 3

try {
    # Full Page View on 1280px Desktop
    $tmpFull = "$env:TEMP\screenshot-fullpage.png"
    $p = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=1280,3200", "--screenshot=$tmpFull", "http://127.0.0.1:4173" -PassThru
    $p.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmpFull) {
        Copy-Item $tmpFull "$brainDir\screenshot-fullpage.png" -Force
        Copy-Item $tmpFull "screenshots\screenshot-fullpage.png" -Force
        Write-Host "Fullpage OK: $((Get-Item $tmpFull).Length) bytes"
    }
}
finally {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
