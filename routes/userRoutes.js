const { register, login, setAvatar, getAllUsers,addUser,editUser,deleteById } = require('../controllers/userController');

const router = require('express').Router();
router.post("/register",register);
router.post("/login",login);
router.post("/adduser",addUser);
router.put("/editUser/:id",editUser);
router.get("/getAllUser",getAllUsers);
router.post('/setAvatar',setAvatar) 
router.post('/allUsers/:id',getAllUsers)    
router.delete('/deleteById/:id',deleteById)    

module.exports = router;