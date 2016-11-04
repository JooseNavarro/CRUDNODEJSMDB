const express = require ('express');
const bookApp = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jade = require('jade');
const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/twitter', (err, res)=>{
  if(err){
    return res.status(500).send('404');
  }
  else {
    console.log('¡Conexión Ha La Base De Datos Exitosa!... ');
    bookApp.listen(port, ()=>{
         console.log(`The run server http://localhost:${port}`);
    })
  }
});
const tw = require('./app/models/tw');

//Archivos Estaticos
bookApp.use(express.static(__dirname + '/public'));
bookApp.set('views', 'app/views');
bookApp.set('view engine', 'jade');

//Body Parser
bookApp.use(bodyParser.urlencoded({ extended: true }));
bookApp.use(bodyParser.json());

//Peticion Get
bookApp.get('/', (req, res)=>{
    tw.find( (err, contenido)=>{
      if (err) {
        return err
      }else{
        res.render('index', {
          title: 'App',
          collection: contenido
        })
      }
    })
})

//Peticion Post
bookApp.post('/', (req, res)=>{
  console.log(req.body);

  let data = new tw();
  data.nombre = req.body.nombre,
  data.texto = req.body.texto

  data.save(data, (err, twi)=>{
    if (err) {
      return res.status(500).send(err)
    }else{
      res.redirect('/')
    }
  })
})

//Peticion Delete
bookApp.get('/dt/:twId', (req, res)=>{
  let twId = req.params.twId;
  tw.findById(twId, (err, query)=>{
    res.render('dt',{
      query: query
    })
  })
})

bookApp.delete('/borra/:twId', (req, res)=>{
    let twId = req.params.twId;
    tw.findOne(twId, (err, twits)=>{
      if (err) {
        return console.log('ahi un error y es : ' + err);
      }if (!twits) {
        return console.log('No Existe : ' + twId);
      }
      twits.remove((err, twits)=>{
        if(err){
          return console.log(err);
        }else {
          return console.log('El twits fue eliminado correctamente : ' + twId);
        }
      })
    })
})
