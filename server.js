var express = require('express');
var session = require ('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views',__dirname+'/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'ssshhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



var sess;
app.get('/',function(req,res){
    sess=req.session;

    if(sess.email){


        res.redirect('/.admin');
    }
    else{res.render('index.html')
    }

    sess.email;
    sess.username;

});

app.post('/login',function(req,res){
   sess = req.session;
   sess.email=req.body.email;
   res.end('done');
});

app.get('/admin',function(req,res){
   sess=req.session;
   if(sess.email){
       res.write('<h1>Hello '+sess.email+'</h1>');
       res.end('<a href="+">logout</a>');
       }
       else
   {
    res.write('<h1>Please Login</h1>');
    res.end('<a href="+">login</a>');

   }
});
app.get('/logout',function(res,req){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.direct('/');
        }

    });
    });

app.listen(3000,function(){
    console.log("App Started on Port 3000")
});
