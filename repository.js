var db = require('./dbconnection'); //reference of dbconnection.js

var Vendas = {

   getVendas: function (callback) {
      console.log('Obtendo todos os registros de vendas!!! 8-O');
      return db.query("SELECT * FROM alunos ORDER BY aluno", 
                      null, callback);

   },

   addVenda: function (venda, callback) {
      return db.query("INSERT INTO alunos (id, aluno, disciplina, diaSemana, turno, status) VALUES (?,?,?,?,?,0)", 
         [
            venda.id, venda.aluno, venda.disciplina, venda.diaSemana, venda.turno, venda.status, 
           
         ], callback);
   },

   excluirVenda: function (id, callback) {
      return db.query("DELETE FROM alunos WHERE id=?", [id], callback);
   },

   updateVenda: function (venda, callback) {

      return db.query("UPDATE alunos SET aluno=?, disciplina=?, diaSemana=?, turno=?, WHERE id=?", 
      [
         venda.produto, venda.vendedor, venda.cliente, venda.valor,
         venda.data.getFullYear()+'/'+(venda.data.getMonth()+1)+'/'+venda.data.getDate(), 
         venda.id
      ], callback);
   }

};

module.exports = Vendas;