# Projektname: Modul 295 LB- Element B
### Eigenes Backend realisieren

## Autor
Ismael Abdi Blandon

## Beschreibung
Diese Anwendung ist ein einfacher Task-Manager mit REST-API-Endpunkten. Benutzer können Aufgaben erstellen, aktualisieren, abrufen und löschen. Es gibt auch eine einfache Authentifizierungsfunktion für den Zugriff auf die API.

## Entwicklungsumgebung
- Node.js
- npm (Node Package Manager)
- Express.js
- body-parser
- express-session
- swagger-ui-express

## Setup
1. Installiere Node.js und npm von [https://nodejs.org/](https://nodejs.org/).
2. Clone dieses Repository: `git clone [Repository-URL]`.
3. Navigiere in das Projektverzeichnis: `cd [Projektverzeichnis]`.
4. Installiere die Abhängigkeiten: `npm install`.
5. Starte die Anwendung: `npm start`.

## Runtime
Die Anwendung läuft auf dem Port 3000. Du kannst auf die API unter [http://localhost:3000](http://localhost:3000) zugreifen.

## API-Dokumentation
Die API-Endpunkte können mit Swagger unter [http://localhost:3000/swagger-gui](http://localhost:3000/swagger-gui) visualisiert werden. Die Dokumentation ist auch im [swagger-output.json](./swagger-output.json) verfügbar.

## Authentifizierung
Die Anwendung verwendet eine einfache Authentifizierung über einen Token. Ein Administrator-Token ist erforderlich, um auf bestimmte Endpunkte zuzugreifen.

### Administratorzugriff
- Benutzername: [Admin-Benutzername]
- Passwort: [Admin-Passwort]
- Token: [Admin-Token]

## API-Endpunkte

### GET /tasks
Abrufen aller Aufgaben. Erfordert Administratorzugriff.

### POST /tasks
Erstellen einer neuen Aufgabe. Erfordert Administratorzugriff.

### GET /tasks/:id
Abrufen einer spezifischen Aufgabe anhand ihrer ID. Erfordert Administratorzugriff.

### PUT /tasks/:id
Aktualisieren einer Aufgabe anhand ihrer ID. Erfordert Administratorzugriff.

### DELETE /tasks/:id
Löschen einer Aufgabe anhand ihrer ID. Erfordert Administratorzugriff.

### POST /login
Einloggen mit Administratorzugangsdaten. Erfordert Administratorzugriff.

### GET /verify
Überprüfen des aktuellen Authentifizierungsstatus. Erfordert Administratorzugriff.

### DELETE /logout
Ausloggen und Invalidieren des Authentifizierungstokens. Erfordert Administratorzugriff.

## Hinweis
Stelle sicher, dass du berechtigt bist, bevor du auf die API-Endpunkte zugreifst. Die Authentifizierung erfolgt über das Token-System.

