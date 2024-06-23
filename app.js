const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

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

app.get('/', (req, res) => {

  // res.send('<p>home page</p>');
  //res.sendFile('./views/index.html', { root: __dirname });

  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {

  // res.send('<p>about page</p>');
  //res.sendFile('./views/about.html', { root: __dirname });

  res.render('about', { title: 'About' });
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