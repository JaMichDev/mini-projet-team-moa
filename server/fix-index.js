const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb+srv://orelus_db_user:Admin123@cluster0.szo0cmo.mongodb.net/sms?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db;
    
    try {
      // Liste les indexes
      const indexes = await db.collection('students').indexes();
      console.log('📋 Indexes actuels:', JSON.stringify(indexes, null, 2));
      
      // Cherche et supprime l'index id_1 problématique
      const hasIdIndex = indexes.some(idx => idx.name === 'id_1');
      
      if (hasIdIndex) {
        try {
          await db.collection('students').dropIndex('id_1');
          console.log('✅ Index id_1 supprimé avec succès');
        } catch (error) {
          console.log('❌ Erreur lors de la suppression:', error.message);
        }
      } else {
        console.log('ℹ️ Index id_1 n\'existe pas ou est déjà supprimé');
      }
      
      // Liste les indexes après suppression
      const indexesAfter = await db.collection('students').indexes();
      console.log('📋 Indexes après suppression:', JSON.stringify(indexesAfter, null, 2));
      
      console.log('\n✅ Opération terminée ! Tu peux créer/supprimer des étudiants sans erreur.');
      process.exit(0);
    } catch (error) {
      console.error('❌ Erreur:', error.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Erreur de connexion:', err.message);
    process.exit(1);
  });
