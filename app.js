const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/blogRoutes');
const path = require('path');

const app = express();

//mongodb uri

const dbURI = 'mongodb+srv://fahadrauf0123:pakistanno1$@cluster0.d29hvcf.mongodb.net/Blogs-db'
mongoose.connect(dbURI)
.then((result) =>
    {
        // console.log('db connected');
        //listen for request 
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// register  view engine
app.set('view engine', 'ejs');

// add routes 

// app.get('/add-blogs', (req, res) => {
//     const blog = new Blog({
//         title: 'new Blog 2',
//         snippet: 'This is about my Blog',
//         body: 'This is body of my Blog'
//     })

//     blog.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.get('/all-blogs', (req, res) => {

//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.get('/single-blog', (req, res) => {

//     Blog.findById('65b413dca1542e59bc8af403')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })
// app.use(express.static(__dirname + '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
    
//     next();
// })
// app.use(morgan('dev'));

app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.sendFile('./views/index.html', {root: __dirname});
    // res.render('index', {title: 'Home', blogs});

    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});

});


// //redirect
// app.get('/about-us', (req, res) => {
//     // res.redirect('/about');
// });

//404
app.use('/blogs', router);
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title: '404'});
});