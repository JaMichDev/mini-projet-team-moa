const { data: users, loadding, error, createUser, updateUser, deleteUser } = useUsers(true);

//creer un nouvel utilisateur
const handleCreate = async () => {
    await createUser({ username: 'moa', email: 'moa@email.com', role: 'admin' });
    };

//mettre a jour un utilisateur
const handleUpdate = async (userId) => {
    await updateUser(userId, { username: 'andre', role: 'user', email: 'newemail@example.com' });
    };

//supprimer un utilisateur: 
const handleDelete = async (userId) => {
    await deleteUser(userId);
    };
   