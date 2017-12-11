const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

// Obligatorio para Heroku!!!! //
// Heroku pone el puerto de escucha en una variable de entorno.
// La recuperamos así
const port=process.env.PORT || 3000;
/*
Tambien hace falta poner "start" en "scripts" en package.json:

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node server.js"
},
*/

var app=express();

// Registra los partials de los templlates.
// Un partial es un trozo de vista que se puede reutilizar en el resto de vistas //
hbs.registerPartials(__dirname+'/views/partials')
// Para estabecer el template que se utilizará //
app.set('view engine', 'hbs');
// Los Helper son funciones que se ejecutan dentro de los templates y de los partials //
hbs.registerHelper('getCurrentYear', () => {
  return 'Año:'+new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Con "use" se añade un Middleware //
// Los Middleware son funciones que se ejecutan en el orden en el que se declaran //
app.use((req, res, next) => {
  var now=new Date().toString();
  var msg=`${now} ${req.method} ${req.url}`;
  console.log(msg);
  fs.appendFile('server.log', msg+'\n', (err) => {
    if(err) {
      console.log('Unable to append to files');
    }
  });
  // Con next se le dice que ya se ha terminado de ejecutar ese Middleware. Si no se le dice, se bloquea //
  next();
});
// Ejemplo de Middleware que devuleve una pagina y no llama a next() //
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
// __dirname indica la ruta del directorio del proyecto //
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello express!!!</h1>');
  // res.send({
  //   name: 'Heinz',
  //   likes:[
  //     'bikes',
  //     'donuts'
  //   ]
  // })
  res.render('welcome.hbs', {
    headerMessage: 'Welcome header',
    welcomePage: 'Welcome page!!!',
    welcomeMessage: 'Welcome message'
  });
});

app.get('/about', (req, res) => {
  //res.send('<h1>About page</h1>');
  // Para renderizar la vista //
  res.render('about.hbs', {
    headerMessage: 'About header',
    aboutPage: 'About page!!!'
  });
});

app.get('/projects', (req, res) => {
  // Para renderizar la vista //
  res.render('projects.hbs', {
    headerMessage: 'Project header',
    projectPage: 'Project page!!!',
    projectMessage: 'Project message'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'An error!!!'
  })
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port} :)`);
});
