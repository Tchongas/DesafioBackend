var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');


// const bd = require('./dados');
const db = require('./repository');

app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// let vendas = [];


app.get('/venda', function (req, res) {
   db.getVendas(function (err, rows) {
      if (err) {
         res.json(err);
      } else {
         console.log('Enviando resposta');
         res.json(rows);
      }
   });
});

app.post('/venda', function (req, res) {
   var obj = req.body;
   console.log(obj);
   obj.data = new Date(obj.data);

   if (!obj.id) {
      obj.id = Math.trunc((new Date().getTime()) / 1000);
      db.addVenda(obj, function (err, rs) {
         if (err) {
            res.json(err);
         } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('{ "msg": "Inserido com sucesso" }');
         }
      });
   } else {
      db.updateVenda(obj, function (err, rs) {
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

app.delete('/venda/:vid', function (req, res) {
   console.log('Excluindo venda do id ' + req.params.vid);
   db.excluirVenda(req.params.vid, function (err, rs) {
      if (err) {
         res.json(err);
      } else {
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.end('{ "msg": "Sucesso" }');
      }
   });
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log(`Example app listening at http://%s:%s`, host, port);

});

