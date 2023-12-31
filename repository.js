var db = require('./dbconnection'); //reference of dbconnection.js

var Escola = {
   /* Tudo que esta aqui dentro sao os GET e POST do nosso server, um GET e POST pra cada table que um usuario precisaria */
   getAlunos: function (callback) {
      console.log('Obtendo todos os registros dos alunos!!!');
      return db.query("SELECT aluno.*, student_class.class_id FROM aluno LEFT JOIN student_class ON aluno.id = student_class.student_id ORDER BY aluno.id", null, callback);
   },
   addAluno: function (input, callback) {
      db.query("INSERT INTO aluno (id, nome, email) VALUES (?,?,?)", 
         [
            input.id, 
            input.nome, 
            input.email
         ], function(err) {
            if (err) {
               callback(err, null);
            } else {
               db.query("SELECT id FROM class WHERE diaSemana = ? AND turno = ?", [input.diaSemana, input.turno], function(err, rows) { 
                  if (err) {
                     callback(err, null);
                  } else {
                     if (rows.length > 0) {
                        const classId = rows[0].id;
                        db.query("INSERT INTO student_class (student_id, class_id) VALUES (?, ?)", [input.id, classId], callback);
                     } else {
                        callback("No class found with the given criteria", null);
                     }
                  }
               });
            }
         });
   },

   getTurmas: function (callback) {
      console.log('Obtendo todos os registros de turmas');
      return db.query("SELECT * FROM class;", null, callback);
   },

   addTurma: function (input, callback) {
      return db.query("INSERT INTO class (id, nome, turno, diaSemana, id_disciplina, id_professor) VALUES (?,?,?,?,?,?)", 
         [input.id, input.nome, input.turno,input.diaSemana,input.id_disciplina,input.id_professor], callback);
      },

   getProfessor: function (callback) {
      console.log('Obtendo todos os registros de Professores');
      return db.query("SELECT * FROM teacher;", null, callback);
   },
   
   addProfessor: function (input, callback) {
      return db.query("INSERT INTO teacher (id, nome, email) VALUES (?,?,?)", 
         [input.id, input.nome, input.email], callback);
      },
   
   getDisciplina: function (callback) {
      console.log('Obtendo todos os registros de Disciplinas');
      return db.query("SELECT * FROM school_subject;", null, callback);
   },
   
   addDisciplina: function (input, callback) {
      return db.query("INSERT INTO school_subject (id, nome, descricao) VALUES (?,?,?)", 
         [input.id, input.nome, input.descricao], callback);
      }
   
};

module.exports = Escola;