const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    uname: String,
    password: String

});

module.exports=mongoose.model('register',postSchema,'register');
