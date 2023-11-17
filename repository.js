var db = require('./dbconnection'); //reference of dbconnection.js

var Escola = {
   //Pega todos os alunos da table aluno, e a sala dele na Table student_class
   getAlunos: function (callback) {
      console.log('Obtendo todos os registros dos alunos!!!');
      return db.query("SELECT aluno.*, student_class.class_id FROM aluno LEFT JOIN student_class ON aluno.id = student_class.student_id ORDER BY aluno.id", null, callback);
   },
   //insere as informacoes do HTML na table Aluno, acha a sala que tem os mesmos horarios que especificou
   addAluno: function (venda, callback) {
      db.query("INSERT INTO aluno (id, nome, email) VALUES (?,?,?)", 
         [
            venda.id, 
            venda.aluno, 
            venda.email
         ], function(err) {
            if (err) {
               callback(err, null);
            } else {
               db.query("SELECT id FROM class WHERE diaSemana = ? AND turno = ?", [venda.diaSemana, venda.turno], function(err, rows) { 
                  if (err) {
                     callback(err, null);
                  } else {
                     if (rows.length > 0) {
                        const classId = rows[0].id;
                        db.query("INSERT INTO student_class (student_id, class_id) VALUES (?, ?)", [venda.id, classId], callback);
                     } else {
                        callback("No class found with the given criteria", null);
                     }
                  }
               });
            }
         });
   },

   //nao fiz ainda
   updateAlunos: function (venda, callback) {

      return db.query("UPDATE alunos SET aluno=?, disciplina=?, diaSemana=?, turno=?, WHERE id=?", 
      [
         venda.produto, venda.vendedor, venda.cliente, venda.valor,
         venda.data.getFullYear()+'/'+(venda.data.getMonth()+1)+'/'+venda.data.getDate(), 
         venda.id
      ], callback);
   }

};

module.exports = Escola;