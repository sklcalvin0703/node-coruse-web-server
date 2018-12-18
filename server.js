const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//make a new express app
var app = express();

//add partials template
hbs.registerPartials(__dirname + '/views/partials');
//middleware lets you configure how the express applcaition work (3rd party add-on)
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
    //if you dont use next(), the below function will not be going
    //req - anthing comes from the client
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(); //will be logged if you make any request from the site
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err){
            console.log('unable to append');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintanence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});
//setup HTTP route handler
//HTTP get request
app.get('/', (req, res)=>{
   // res.send('<h1>Hello Express</h1>');
//    res.send({ //will auto format to JSON view
//        name: 'Andrew',
//        likes: [
//            'Biking',
//            'Cities'
//        ]
//    });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this page',
    })
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'error'
    })
});
//bind the application to the port local nachine
app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});
