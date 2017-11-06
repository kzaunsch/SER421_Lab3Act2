// lab3act2.js
// load the things we need
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

var userName = '';
var userRoles = '';


var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var jsonString = {};
var newsData = {};

var fs = require('fs'),
    parseString = require('xml2js').parseString;

var data = fs.readFileSync('news.xml');  
  
    // we then pass the data to our method here
    parseString(data, function(err, result){
        if(err) console.log(err);
        // here we log the results of our xml string conversion
        jsonString = result;
       
        newsData = result;
   });


console.log("json Object " +jsonString); 

for(var index= 0; index< jsonString.NEWS.ARTICLE.length; index++){
console.log(jsonString.NEWS.ARTICLE[index].TITLE);
}




// set the view engine to ejs
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

// use middleware
app.use(bodyParser());
// index page 
app.get('/', function(req, res) {
   console.log('userName at get' + userName);
       res.render('pages/index',{userName: userName});    
    
   
});
app.get('/add', function(req, res) {
   console.log('userName at get' + userName);
       res.render('pages/add',{userName : userName,
                              userRoles: userRoles});      
});
app.post('/add', function(req, res) {
   console.log('userName at get' + userName);
       res.render('pages/add',{userName : userName,
                              userRoles: userRoles});   
   
});

// about page 
app.get('/logger', function(req, res) {
    userName = req.body.username;
    //console.log('userName: ' + userName);
    res.render('pages/logger');
});
app.post('/logger', function(req, res) {  
     userName = req.body.username;
     userRoles = req.body.usertype;
    if(userName != null){
      console.log('userName' + userName + " and usertype " + userRoles);
       res.render('pages/loggerPost', {nameName: userName,
                                       userRoles: userRoles  
    
       });
    }else{
    console.log('userName: Logger' + userName);
       res.render('pages/logger')} 
});
// articles page 
app.get('/articles', function(req, res) {
    res.render('pages/articles');
});

//articlesListPage
app.get('/articlesList', function(req, res) {
   console.log('userName at get' + userName);
       res.render('pages/articlesList',{userName : userName,
                              userRoles: userRoles,
                                       jsonString: jsonString});      
});
app.post('/articlesList', function(req, res) {
   console.log('userName at get' + userName);
       res.render('pages/articlesList',{userName : userName,
                              userRoles: userRoles});   
   
});


app.listen(8080);
console.log('8080 is the magic port');
