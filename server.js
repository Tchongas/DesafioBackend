var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');

// "db" serve de referencia a base de dados
const db = require('./repository');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Cria pagina http://localhost:3000/aluno
app.get('/aluno', function (req, res) {
   db.getAlunos(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         console.log('Enviando resposta');
         res.json(rows);
      }
   });
});

//adicionar/atualizar items na DataBase
app.post('/aluno', function (req, res) {
   var obj = req.body;
   console.log(obj);

   if (!obj.id) {
      //cria ID unico da entrada
      obj.id = Math.trunc((new Date().getTime()) / 1000);

      //chama a funcao em repository.js 
      db.addAluno(obj, function (err, rs) {
         if (err) {
            res.json(err);
         } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('{ "msg": "Inserido com sucesso" }');
         }
      });

      //caso ID ja exista so atualizar
   } else {
      db.updateAlunos(obj, function (err, rs) {
         if (err) {
            res.json(err);
         } else {
            console.log(rs);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('{ "msg": "Alterado com sucesso" }');
         }
      });   
   }
});



var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log(`Example app listening at http://%s:%s`, host, port);

});

