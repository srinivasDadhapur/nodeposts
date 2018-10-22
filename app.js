const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

mongoose.connect('mongodb://127.0.0.1:27017/mongoposts',{useNewUrlParser:true});

mongoose.connection.on('connected',()=>{
    console.log('Connected');
    
})

mongoose.connection.on('error',()=>{
    console.log('cannot connect to the mongoose');
    
})

const schema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    posts:[{}]
});


const MongoModel = mongoose.model('user',schema);

const jwtSchema = mongoose.Schema({
    token:String,
    user : schema
});


const jwtModel = mongoose.model('jwttoken',jwtSchema);

// const exampleschema = new jwtModel({token:'fsdddfsd',user:{name:'sriniJWTTEst',email:'jwtemail@mail.com',password:'somejwtpass'}});
// exampleschema.save(()=>{
//     console.log('added');
// });



// const exampleschema = new MongoModel({name:'SriniDadapp',email:'Sometestingemail@testmail.com',password:'abcd123'});
// exampleschema.save(()=>{
//     console.log('added');
// });


app.post('/jwtaccess',(req,res)=>{
    console.log(req.body.jwttoken);
    jwtModel.findOne({token:req.body.jwttoken},(err,token)=>{

        if(!token){
            return res.status(403).send({tokenexists:false});
        }
        res.send({tokenexists:true,token:token});
    });
})


app.get('/',(req,res)=>{
    res.send('Hello there');
});

app.get('/getposts',(req,res)=>{
    console.log(req.body.email);
    MongoModel.find({},(err,data)=>{
        if(data){
            console.log(data);
           return res.send(data);
        }
        res.send({error:err})
    })
});

app.put('/postcomment',(req,res)=>{
    console.log(req.body.user);
    MongoModel.findOne({email:req.body.user},(err,data)=>{
        if(data){
            let post;
            console.log(req.body.post);
            data.posts.forEach(element => {
                if(element.post==req.body.post){
                    console.log(data.posts);
                    //  data.posts.comments.push({"comment":"success adding comment","user":"admin"});
                    data.save(error=>{
                        return console.log('returned');
                    });
                }
            });
           return res.send({success:true,msg:"posted the comment successfully!"});
        }
        res.send({error:err})
    })
});



app.post('/register',(req,res)=>{
    newUser = new MongoModel({name:req.body.name,email:req.body.email,password:req.body.password,posts:req.body.posts});
    addUser(newUser,(err,user)=>{
        if(err) {
             res.send({success:false,msg:err}) 
             console.log('Failure');
             
            }
        else {
            res.send({success:true,msg:user});
            console.log('Success!');
            
        }
    });
});

app.post('/authenticate',(req,res)=>{
    const query = {email:req.body.email};
    MongoModel.findOne(query,(err,user)=>{
        if(!user){
            return res.status(403).send({success:false,msg:'invalid user'});
        }
        comparePassword(req.body.password,user.password,(err,ismatch)=>{
            if(ismatch){
                const token = jwt.sign({data:user},'my secret key',
					{
						expiresIn: 602333

                });
                new jwtModel({token:token,user:user}).save((err,token)=>{
                        console.log(token);
                        
                });
                res.send({success:true,token:token,email:user.email, msg:'Logged in'});
            }else{
                res.status(403).send({success:false,msg:'invalid password'});
            }
        });
        
    });
})

function comparePassword(userPass,password,callback){
    bcrypt.compare(userPass, password, function(err, resp) {
        if(err) console.log(err);
        else {
            callback(null,resp);
        }
        
    });
}


function addUser(addUser,callback){
    bcrypt.hash(addUser.password,10,(err,hash)=>{
        addUser.password = hash;
        addUser.save(callback);
        
    });
}



app.listen(8080,()=>{
    console.log('listening on 8080');
})