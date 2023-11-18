DROP TABLE alunos;

CREATE TABLE aluno (
    id INT NOT NULL UNIQUE PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT  NULL
);

CREATE TABLE teacher (
    id INT NOT NULL UNIQUE PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE school_subject (
    id INT NOT NULL UNIQUE PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE class (
    id INT NOT NULL UNIQUE PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    turno VARCHAR(100) NOT NULL,
    diaSemana VARCHAR(100),
    id_disciplina INT,
    id_professor INT,
    FOREIGN KEY (id_disciplina) REFERENCES school_subject(id),
    FOREIGN KEY (id_professor) REFERENCES teacher(id)
);

CREATE TABLE student_class (
    student_id INT,
    class_id INT,
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (class_id) REFERENCES class(id)
);



INSERT INTO class (id, nome, turno, diaSemana, id_disciplina, id_professor)
VALUES (2, 'Test Class2', '2', '2', 1, 1);

INSERT INTO teacher (id,nome,email) VALUES (1,"Joao","Joao@email.com");
INSERT INTO school_subject (id,nome,descricao) VALUES (1,"mat","test");

SELECT * FROM class;