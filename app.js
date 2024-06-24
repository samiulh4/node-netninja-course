const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

const dbURI = 'mongodb://localhost:27017/node_net_ninja_db';

 // avoid deprication message
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests


// middleware & static files
app.use(express.static('public'));

// custom middleware
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

// 3rd party middleware
app.use(morgan('dev'));

// mongoose & mongo tests
/*app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 3',
    snippet: 'about my new blog 3',
    body: 'more about my new blog 3'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('6679ce4b8efc301a3ccb0c67')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});*/

/*app.get('/', (req, res) => {

  // res.send('<p>home page</p>');
  //res.sendFile('./views/index.html', { root: __dirname });

  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});*/

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {

  // res.send('<p>about page</p>');
  //res.sendFile('./views/about.html', { root: __dirname });

  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page, it should go very bottom otherwise not working previous
app.use((req, res) => {

  //res.status(404).sendFile('./views/404.html', { root: __dirname });

  res.render('create', { title: 'Create a new blog' });
});