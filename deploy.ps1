# --- Automatisches Deployment für React + Vite auf publish Branch ---

# 1️⃣ Build erzeugen
Write-Host "Installing dependencies..."
npm install

Write-Host "Building project..."
npm run build

# 2️⃣ Zu publish Branch wechseln
Write-Host "Switching to publish branch..."
git checkout publish

# 3️⃣ Alte Dateien löschen (außer .git)
Write-Host "Cleaning old files..."
git rm -rf .

# 4️⃣ dist-Inhalte in Root kopieren
Write-Host "Copying build files..."
Copy-Item -Path .\dist\* -Destination .\ -Recurse

# 5️⃣ dist Ordner entfernen
Remove-Item -Recurse -Force .\dist

# 6️⃣ Git Commit & Push
Write-Host "Adding files to git..."
git add .

Write-Host "Committing..."
git commit -m "Auto deploy from main branch"

Write-Host "Pushing to remote publish branch..."
git push origin publish

# 7️⃣ Zurück zu main
Write-Host "Switching back to main branch..."
git checkout main

Write-Host "✅ Deployment complete!"

