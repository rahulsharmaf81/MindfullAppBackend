const User = require('../model/userModel')
const AllUser = require('../model/addUserModel')
const bcrypt = require('bcrypt')


module.exports.register =  async (req,res,next) => {
console.log("req",req.body);
try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password,
      hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
} catch (error) {
    console.log("error in catch",error.message);
    next(error);
}
}
module.exports.addUser =  async (req,res,next) => {
console.log("req",req.body);
try {
    const { username, email, phone,time,lastModified } = req.body;
    const user = await AllUser.create({
      username,
      email,
      phone, 
      time,
      lastModified 
    });
    return res.json({ status: true, user });
} catch (error) {
    console.log("error in catch",error.message);
    next(error);
}
}
module.exports.editUser =  async (req,res,next) => {
console.log("req",req.body);
try {
    const {id, username, email, phone,time,lastModified } = req.body;
    const updatedUser = await addUser.findByIdAndUpdate(id, {
        username,
        email,
        phone, 
        time,
        lastModified 
    }, {
        new: true, // Return the updated document
      });
  
    return res.json({ status: true ,updatedUser});
} catch (error) {
    console.log("error in catch",error.message);
    next(error);
}
}


module.exports.login =  async (req,res,next) => {
try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.json({ msg: "Incorrect username ", status: false });
    }

   const isPasswordValid = await bcrypt.compare(password,user.password);
   console.log();

console.log(user.password, password,typeof user.password, typeof password ,"status is");
if (password !== user.password) {
        console.log("password not matched");
      return res.json({ msg: "Incorrect password", status: false });
    }
    
    delete user.password;
    return res.json({ status: true, user });
} catch (error) {
    console.log("error in catch",error.message);
    next(error);
}
}


module.exports.setAvatar = async (req,res,next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet : true,
            avatarImage,
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage, 
        })
    } catch (error) {
        next(error);
    }
}
module.exports.editUser =  async (req,res,next) => {
    console.log("req",req.body);
    const { username, email, phone,time,lastModified } = req.body;
    const userId = req.params.id;

    try {
        const updatedUser = await AllUser.findByIdAndUpdate(userId, {
            username,
            email,
            phone, 
            time,
            lastModified 
        },
        );
      
        return res.json({ status: true ,updatedUser});
    } catch (error) {
        console.log("error in catch",error.message);
        next(error);
    }
    }
module.exports.deleteById =  async (req,res,next) => {
    const userId = req.params.id;
    try {
        const updatedUser = await AllUser.findByIdAndDelete(userId)
        return res.json({ status: true ,msg:"Deleted successfully"});
    } catch (error) {
        console.log("error in catch",error.message);
        next(error);
    }
    }

module.exports.getAllUsers = async(req,res,next) =>{
try {
    const users = await AllUser.find({
        _id:{$ne:req.params.id}
    }).select([
        "username",
        "email",
        "phone",
    ])
    return res.json(users);
} catch (error) {
    next(error)
}
};