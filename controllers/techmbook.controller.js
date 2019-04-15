const Register = require('../models/techmbook.model');
const Post = require('../models/techmbook.post');
//const PostC = require('../models/techmbook.postC');
var jwt=require('jsonwebtoken')
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};




exports.register = function (req, res) {
    const register = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        uname: req.body.uname,
        password: req.body.password,
      });
console.log(register);
      register.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.status(200).json({message:' Register'});
       console.log('Product Created successfully');
    })
};


exports.login = function (req, res, next) {
        let promise = Register.findOne({uname: req.body.username,password:req.body.password}).exec();
        promise.then(function(doc){
         if(doc) { // if user is available in database
          console.log(' Request - Username and Password ' + req.body.username + ' ' + req.body.password);
         // console.log(' Inside doc - Username and Password ' + doc.values.username + ' ' + doc.values.password);
      
          console.log('User name is available in database');
           if(req.body.password!=null) {
           // if(doc.isValidate(req.body.password)){
               // generate token
               let token = jwt.sign({username: req.body.username},'secret', {expiresIn : '3h'});
               return res.status(200).json(token);
           } else {
             return res.status(501).json({message:' Invalid Credentials'});
           }
         }
         else {
           return res.status(501).json({message:'Username is not registered.'})
         }
        });
      
        promise.catch(function(err){
          return res.status(501).json({message:'Some internal error'});
        })
};

exports.username = function (req, res) {
//router.get('/username', verifyToken, function(req,res,next){
    //console.log(decodedToken.username);
    var decodedToken='';
    let token = req.query.token;
    console.log(token);
    jwt.verify(token,'secret', function(err, tokendata){
      // console.log("err " + err);
      // console.log(" tokendata "+ tokendata);
      if(err){
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        console.log('Token Data' + tokendata);
        decodedToken = tokendata;
        console.log(decodedToken);
        next();
      }
    })
    return res.status(200).json(decodedToken.username);
  };
  

  exports.addpost = function (req, res) {
    const post1 = new Post({
        ptitle: req.body.ptitle,
        pdesc: req.body.pdesc,
        uname: req.body.uname
        //date: req.body.date
      });

post1.save(function (err) {
        if (err) {
            return next(err);
        }
        return res.status(200).json({message:' added'});
       // res.send('added.');
       console.log('Post Created successfully');
    })
};

//router.get('/getpost',function(req,res){
    exports.getpost = function (req, res) {
       // router.get('/getpost',function(req,res){
            console.log('Requesting posts');
            
            Post.find({})
            .exec(function(err,getpost){    2
              if(err){
               console.log('Error getting the getpost');
              }
              else {
               res.json(getpost);
               console.log(getpost);
              }
             });
           }
   

           
            exports.deletepost = function (req, res) {
                Post.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
            console.log(post);
            if (err) res.json(err);
            else 
            return res.status(200).json({message:' Deleted'});
            //res.json('Postgram Deleted Successfully');
            });
            
            }

            exports.editpost = function (req, res) {
            Post.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, post) {
                console.log(req.params.id);
                if (err) return next(err);
                return res.status(200).json({message:' updated'});
               //res.send('updated.');
            });
            
            }   

           