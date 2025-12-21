# Guide Postman Complet - CRUD Users

## ⚠️ IMPORTANT

**Le serveur doit être démarré sur le port 8010 :**

```bash
cd server
node index.js
```

Vous devez voir :
```
🚀 Server running on port 8010
✅ MongoDB connected successfully
```

---

## 📋 Flux complet à tester dans Postman

### 1️⃣ CRÉER UN ADMIN (Register)

**Endpoint :** `POST http://localhost:8010/api/users/register`

**Headers :**
```
Content-Type: application/json
```

**Body (Raw JSON) :**
```json
{
  "username": "admin_team",
  "email": "admin@team.com",
  "password": "Admin123!",
  "role": "admin"
}
```

**Réponse attendue (201) :**
```json
{
  "_id": "67662a1234...",
  "username": "admin_team",
  "email": "admin@team.com",
  "role": "admin"
}
```

**COPIER l'ID (_id) pour les prochaines étapes**

---

### 2️⃣ SE CONNECTER (Login)

**Endpoint :** `POST http://localhost:8010/api/users/login`

**Headers :**
```
Content-Type: application/json
```

**Body (Raw JSON) :**
```json
{
  "email": "admin@team.com",
  "password": "Admin123!"
}
```

**Réponse attendue (200) :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "67662a1234...",
    "username": "admin_team",
    "email": "admin@team.com",
    "role": "admin"
  }
}
```

**⚠️ COPIER LE TOKEN (token) - VOUS EN AUREZ BESOIN POUR TOUS LES GET/POST/PUT/DELETE**

---

### 3️⃣ TESTER LE GET /api/students

**Endpoint :** `GET http://localhost:8010/api/students`

**Headers :**
```
Content-Type: application/json
Authorization: Bearer {VOTRE_TOKEN}
```

**Remplacer `{VOTRE_TOKEN}` par le token reçu à l'étape 2**

**Réponse attendue (200) :**
```json
[]
```

ou si des students existent :

```json
[
  {
    "_id": "...",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com"
  }
]
```

---

### 4️⃣ CRÉER UN NOUVEL UTILISATEUR (CREATE)

**Endpoint :** `POST http://localhost:8010/api/users`

**Headers :**
```
Content-Type: application/json
Authorization: Bearer {VOTRE_TOKEN}
```

**Body (Raw JSON) :**
```json
{
  "username": "john_teacher",
  "email": "john@school.com",
  "password": "Teacher123!",
  "role": "teacher"
}
```

**Réponse attendue (201) :**
```json
{
  "_id": "67662a5678...",
  "username": "john_teacher",
  "email": "john@school.com",
  "password": "$2a$10$...",
  "role": "teacher",
  "createdAt": "2025-12-21T...",
  "updatedAt": "2025-12-21T..."
}
```

**COPIER L'ID (_id) pour les prochaines étapes**

---

### 5️⃣ MODIFIER UN UTILISATEUR (UPDATE)

**Endpoint :** `PUT http://localhost:8010/api/users/{USER_ID}`

**Remplacer `{USER_ID}` par l'ID copié à l'étape 4**

**Headers :**
```
Content-Type: application/json
Authorization: Bearer {VOTRE_TOKEN}
```

**Body (Raw JSON) :**
```json
{
  "username": "john_updated",
  "email": "john.new@school.com",
  "role": "admin"
}
```

**Réponse attendue (200) :**
```json
{
  "_id": "67662a5678...",
  "username": "john_updated",
  "email": "john.new@school.com",
  "role": "admin"
}
```

---

### 6️⃣ SUPPRIMER UN UTILISATEUR (DELETE)

**Endpoint :** `DELETE http://localhost:8010/api/users/{USER_ID}`

**Remplacer `{USER_ID}` par l'ID de l'utilisateur à supprimer**

**Headers :**
```
Content-Type: application/json
Authorization: Bearer {VOTRE_TOKEN}
```

**Réponse attendue (200) :**
```json
{
  "success": true
}
```

---

## 🚨 Si vous avez une erreur 500

**Vérifiez :**

1. ✅ Le serveur est démarré (`npm run dev` ou `node index.js`)
2. ✅ MongoDB est connecté (vous devez voir `✅ MongoDB connected successfully`)
3. ✅ Vous utilisez le bon token JWT (recopié de l'étape 2)
4. ✅ Le JSON est valide (utilisez `{` et `:`, pas `=`)
5. ✅ L'endpoint est correct (`/api/users`, `/api/students`, etc.)

**Si ça ne marche toujours pas :** Regardez les logs du serveur pour voir l'erreur exacte.

---

## 📋 Résumé des routes

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/api/users/register` | ❌ Non | Créer un nouvel utilisateur |
| POST | `/api/users/login` | ❌ Non | Se connecter et obtenir le token |
| GET | `/api/users` | ✅ Oui | Obtenir tous les users (admin only) |
| POST | `/api/users` | ✅ Oui | Créer un user (admin only) |
| PUT | `/api/users/:id` | ✅ Oui | Modifier un user (admin only) |
| DELETE | `/api/users/:id` | ✅ Oui | Supprimer un user (admin only) |
| GET | `/api/students` | ✅ Oui | Obtenir tous les students |
| GET | `/api/courses` | ✅ Oui | Obtenir tous les courses |
| GET | `/api/grades` | ✅ Oui | Obtenir toutes les grades |

---

## 💡 Conseils

- Gardez le token dans un bloc-notes pendant le test
- Testez dans cet ordre : 1️⃣ → 2️⃣ → 3️⃣ → 4️⃣ → 5️⃣ → 6️⃣
- Utilisez "Collections" dans Postman pour sauvegarder les requêtes
