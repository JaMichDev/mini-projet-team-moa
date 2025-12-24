# 📮 Guide Postman - Test CRUD Users

## 🚀 Préalables
- Serveur Node.js démarré sur `http://localhost:8010`
- Base de données MongoDB connectée

---

## 1️⃣ Créer un utilisateur ADMIN (Register)

**URL** : `POST http://localhost:8010/api/users/register`

**Headers** :
```
Content-Type: application/json
```

**Body (JSON)** :
```json
{
  "username": "admin_team",
  "email": "admin@team.com",
  "password": "Admin123!",
  "role": "admin"
}
```

**Réponse attendue (201)** :
```json
{
  "_id": "67662a1234...",
  "username": "admin_team",
  "email": "admin@team.com",
  "role": "admin"
}
```

---

## 2️⃣ Se connecter (Login)

**URL** : `POST http://localhost:8010/api/users/login`

**Headers** :
```
Content-Type: application/json
```

**Body (JSON)** :
```json
{
  "email": "admin@team.com",
  "password": "Admin123!"
}
```

**Réponse attendue (200)** :
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

**⚠️ Copier le token pour les requêtes suivantes !**

---

## 3️⃣ RÉCUPÉRER tous les utilisateurs (GET)

**URL** : `GET http://localhost:8010/api/users`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {token_de_l_admin}
```

**Réponse attendue (200)** :
```json
[
  {
    "_id": "67662a1234...",
    "username": "admin_team",
    "email": "admin@team.com",
    "role": "admin"
  }
]
```

---

## 4️⃣ CRÉER un nouvel utilisateur (CREATE)

**URL** : `POST http://localhost:8010/api/users`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {token_de_l_admin}
```

**Body (JSON)** :
```json
{
  "username": "john_teacher",
  "email": "john@school.com",
  "password": "Teacher123!",
  "role": "teacher"
}
```

**Réponse attendue (201)** :
```json
{
  "_id": "67662a5678...",
  "username": "john_teacher",
  "email": "john@school.com",
  "password": "$2a$10$...",  // hashé
  "role": "teacher"
}
```

---

## 5️⃣ MODIFIER un utilisateur (UPDATE)

**URL** : `PUT http://localhost:8010/api/users/{user_id}`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {token_de_l_admin}
```

**Body (JSON)** :
```json
{
  "username": "john_updated",
  "email": "john.new@school.com",
  "role": "admin"
}
```

**Réponse attendue (200)** :
```json
{
  "_id": "67662a5678...",
  "username": "john_updated",
  "email": "john.new@school.com",
  "role": "admin"
}
```

---

## 6️⃣ SUPPRIMER un utilisateur (DELETE)

**URL** : `DELETE http://localhost:8010/api/users/{user_id}`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {token_de_l_admin}
```

**Réponse attendue (200)** :
```json
{
  "success": true
}
```

---

## 📝 Notes

- ✅ **Endpoint `/register`** : Accessible sans authentification (pour créer le premier admin)
- ✅ **Endpoint `/login`** : Accessible sans authentification
- 🔐 **Autres endpoints (`/api/users`)** : Nécessitent un token JWT + rôle `admin`
- ⏰ **Token expire** : Après 1 jour (24h)
- 🔄 **Password** : Automatiquement hashé avec bcrypt

---

## ⚡ Commandes CURL (optionnel)

```bash
# Register
curl -X POST http://localhost:8010/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_team","email":"admin@team.com","password":"Admin123!","role":"admin"}'

# Login
curl -X POST http://localhost:8010/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@team.com","password":"Admin123!"}'

# GET users (remplacer TOKEN par le token reçu)
curl -X GET http://localhost:8010/api/users \
  -H "Authorization: Bearer TOKEN"

# CREATE user
curl -X POST http://localhost:8010/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"username":"john","email":"john@school.com","password":"Teacher123!","role":"teacher"}'
```

---

## 🐛 Dépannage

| Erreur | Cause | Solution |
|--------|-------|----------|
| 401 Unauthorized | Token manquant ou invalide | Vérifier le header `Authorization: Bearer {token}` |
| 403 Forbidden | Rôle insuffisant (pas admin) | Utiliser un compte admin |
| 404 Not Found | User ID inexistant | Vérifier l'ID dans l'URL |
| 500 Internal Server Error | Erreur serveur | Vérifier les logs du serveur |

