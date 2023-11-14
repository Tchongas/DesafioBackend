DROP TABLE alunos;

CREATE TABLE alunos (
	id int not null unique primary key,
    aluno varchar(100) not null,
    disciplina varchar(70) not null,
    diaSemana varchar(70) not null,
    turno varchar(70) not null,
    status smallint default 0
);

INSERT INTO alunos (id, aluno, disciplina, diaSemana, turno) VALUES
(1, 'Thomas', '1', '3', '3'),
(2, 'Arthur', '2', '4', '3'),

;

SELECT * FROM alunos 
WHERE produto = 'Cheddar' ORDER BY Produto;

SELECT COUNT(*) FROM alunos;