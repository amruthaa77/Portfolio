$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$brainDir = "C:\Users\amrut\.gemini\antigravity\brain\3f1b12cd-7743-40ca-87c2-06baef3545a2"
$profileDir = "$env:TEMP\edge_screenshot_profile"

$server = Start-Process -FilePath "npx.cmd" -ArgumentList "vite", "preview", "--port", "4173", "--host", "127.0.0.1" -PassThru
Start-Sleep -Seconds 3

try {
    # Projects Section Screenshot (1280x900)
    $tmpProj = "$env:TEMP\screenshot-projects.png"
    $p = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=1280,1000", "--screenshot=$tmpProj", "http://127.0.0.1:4173#projects" -PassThru
    $p.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmpProj) {
        Copy-Item $tmpProj "$brainDir\screenshot-projects.png" -Force
        Copy-Item $tmpProj "screenshots\screenshot-projects.png" -Force
    }

    # About Section Screenshot (1280x900)
    $tmpAbout = "$env:TEMP\screenshot-about.png"
    $p = Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=3000", "--user-data-dir=$profileDir", "--window-size=1280,900", "--screenshot=$tmpAbout", "http://127.0.0.1:4173#about" -PassThru
    $p.WaitForExit(15000)
    Start-Sleep -Seconds 1
    if (Test-Path $tmpAbout) {
        Copy-Item $tmpAbout "$brainDir\screenshot-about.png" -Force
        Copy-Item $tmpAbout "screenshots\screenshot-about.png" -Force
    }
}
finally {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
