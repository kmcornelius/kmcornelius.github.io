# kmcornelius.github.io — User-Site (für Envela Einladungs-Deep-Link)

Dieses Repo wird zu **https://kmcornelius.github.io/** (GitHub-User-Site, kostenlos).
Es liefert die zwei Dateien, die der Universal Link „ein Brief wartet auf dich"
braucht:

- `.well-known/apple-app-site-association` → sagt iOS: „`/join*` gehört zur Envela-App"
- `join/index.html` → Seite für Leute OHNE App (zeigt Code, leitet zum App Store)
- `.nojekyll` → **wichtig**, sonst versteckt GitHub Pages den `.well-known`-Ordner
- `index.html` → schlichte Startseite

## Einmalig veröffentlichen (Terminal)
Der Repo-Name MUSS exakt `kmcornelius.github.io` heißen (das macht es zur User-Site).
```
cd ~/Desktop/kmcornelius.github.io
git init -b main
git add -A            # -A nimmt auch .nojekyll & .well-known mit
git commit -m "Envela: AASA + Einladungs-Landingpage"
gh repo create kmcornelius.github.io --public --source=. --push
```
Ohne `gh`: Repo `kmcornelius.github.io` manuell auf github.com anlegen, dann
`git remote add origin https://github.com/kmcornelius/kmcornelius.github.io.git && git push -u origin main`.

## GitHub Pages aktivieren
Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch **main / (root)** → Save.

## Prüfen (nach ~1 Min)
```
curl -s https://kmcornelius.github.io/.well-known/apple-app-site-association
```
→ muss das JSON zeigen (nicht 404). Bei 404: `.nojekyll` fehlt oder Pages noch nicht live.
Danach `https://kmcornelius.github.io/join?code=AB3X9F` im Handy-Browser öffnen → Karte erscheint.

## Wichtig für die App
- Das Entitlement `applinks:kmcornelius.github.io` ist in der App schon gesetzt (Build 1.1).
- Universal Links greifen ERST mit dem nächsten hochgeladenen Build + auf ECHTEM Gerät
  (nicht im Simulator). Beim ersten App-Start lädt iOS die AASA — also Seite VOR dem
  Geräte-Test live haben.
- Apple cached die AASA teils bis 24 h; bei Neuinstallation der App greift sie sofort.
- App-ID-Capability „Associated Domains" wird von Xcode (Automatic Signing) beim
  Geräte-Build automatisch am Developer-Portal aktiviert.
