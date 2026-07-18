$content = (Get-Content e:\AAT\New2\ProjectGeden4\js\data.js)[295..475] -join "`r`n"
$dest = Get-Content e:\AAT\New2\ProjectGeden4\js\dataWilayah.js -Raw
$dest = $dest -replace '\];', ",`r`n$content`r`n];"
Set-Content -Path e:\AAT\New2\ProjectGeden4\js\dataWilayah.js -Value $dest
