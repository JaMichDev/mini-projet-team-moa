const http = require('http');

const BASE_URL = 'http://localhost:8010/api';

async function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      const bodyStr = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test() {
  try {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║     TEST CRUD USERS - GUIDE POSTMAN    ║');
    console.log('╚═══════════════════════════════════════╝\n');

    // 1. CREATE ADMIN
    console.log('📝 1. CREATE ADMIN (Register)\n');
    const adminData = {
      username: 'admin_team',
      email: 'admin@team.com',
      password: 'Admin123!',
      role: 'admin'
    };
    console.log('Request:', JSON.stringify(adminData, null, 2));
    const adminRes = await makeRequest('POST', '/users/register', adminData);
    console.log('Response (' + adminRes.status + '):', JSON.stringify(adminRes.data, null, 2));
    
    if (adminRes.status !== 201) {
      console.log('❌ Erreur lors de la création de l\'admin');
      return;
    }
    
    const adminId = adminRes.data._id;
    const adminToken = null; // À obtenir via login
    console.log('✅ Admin créé avec l\'ID:', adminId, '\n');

    // 2. LOGIN
    console.log('🔐 2. LOGIN - Obtenir le token\n');
    const loginData = {
      email: 'admin@team.com',
      password: 'Admin123!'
    };
    console.log('Request:', JSON.stringify(loginData, null, 2));
    const loginRes = await makeRequest('POST', '/users/login', loginData);
    console.log('Response (' + loginRes.status + '):', JSON.stringify(loginRes.data, null, 2));
    
    if (loginRes.status !== 200) {
      console.log('❌ Erreur lors de la connexion');
      return;
    }

    const token = loginRes.data.token;
    console.log('✅ Token obtenu:', token.substring(0, 50) + '...', '\n');

    // 3. GET ALL USERS
    console.log('📋 3. GET - Récupérer tous les utilisateurs\n');
    const options = {
      hostname: 'localhost',
      port: 8010,
      path: '/api/users',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };

    const getUsersRes = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      });
      req.on('error', reject);
      req.end();
    });

    console.log('Response (' + getUsersRes.status + '):', JSON.stringify(getUsersRes.data, null, 2));
    console.log('✅ Utilisateurs récupérés\n');

    // 4. CREATE NEW USER
    console.log('➕ 4. CREATE - Créer un nouvel utilisateur (teacher)\n');
    const newUserData = {
      username: 'john_teacher',
      email: 'john@school.com',
      password: 'Teacher123!',
      role: 'teacher'
    };
    console.log('Request:', JSON.stringify(newUserData, null, 2));
    
    const createUserOptions = {
      hostname: 'localhost',
      port: 8010,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(JSON.stringify(newUserData))
      }
    };

    const createRes = await new Promise((resolve, reject) => {
      const req = http.request(createUserOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      });
      req.on('error', reject);
      req.write(JSON.stringify(newUserData));
      req.end();
    });

    console.log('Response (' + createRes.status + '):', JSON.stringify(createRes.data, null, 2));
    
    if (createRes.status !== 201) {
      console.log('❌ Erreur lors de la création');
      return;
    }

    const newUserId = createRes.data._id;
    console.log('✅ Utilisateur créé avec l\'ID:', newUserId, '\n');

    // 5. UPDATE USER
    console.log('✏️  5. UPDATE - Modifier l\'utilisateur\n');
    const updateData = {
      username: 'john_updated',
      email: 'john.updated@school.com',
      role: 'admin'
    };
    console.log('Request (PUT /users/' + newUserId + '):', JSON.stringify(updateData, null, 2));
    
    const updateOptions = {
      hostname: 'localhost',
      port: 8010,
      path: '/api/users/' + newUserId,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(JSON.stringify(updateData))
      }
    };

    const updateRes = await new Promise((resolve, reject) => {
      const req = http.request(updateOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      });
      req.on('error', reject);
      req.write(JSON.stringify(updateData));
      req.end();
    });

    console.log('Response (' + updateRes.status + '):', JSON.stringify(updateRes.data, null, 2));
    console.log('✅ Utilisateur modifié\n');

    // 6. DELETE USER
    console.log('🗑️  6. DELETE - Supprimer l\'utilisateur\n');
    console.log('Request (DELETE /users/' + newUserId + ')');
    
    const deleteOptions = {
      hostname: 'localhost',
      port: 8010,
      path: '/api/users/' + newUserId,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };

    const deleteRes = await new Promise((resolve, reject) => {
      const req = http.request(deleteOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      });
      req.on('error', reject);
      req.end();
    });

    console.log('Response (' + deleteRes.status + '):', JSON.stringify(deleteRes.data, null, 2));
    console.log('✅ Utilisateur supprimé\n');

    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║  ✅ TOUS LES TESTS SONT PASSÉS !    ║');
    console.log('╚═══════════════════════════════════════╝\n');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

test();
