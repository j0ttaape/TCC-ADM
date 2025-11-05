create database tcc;
use tcc;


CREATE TABLE cadastro_users (
    id_cadastro INT AUTO_INCREMENT PRIMARY KEY,     
    nome_completo VARCHAR(150) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,                
    cpf CHAR(11) NOT NULL UNIQUE,             
    telefone VARCHAR(15),
    estado CHAR(2),  
	tipo_sanguineo ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-','Não Sei'),
    sexo ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    origem VARCHAR(100),                      
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



create table cadastro_adm (
	id_adm int auto_increment primary key,
    nome varchar (200),
	email varchar (100),
	senha varchar (50),
    permissao boolean
);

create table hemocentros (
	id_hemocentro int auto_increment primary key,
    nome_hemocentro varchar(50),
    cidade_hemocentro varchar(50),
    bairro_hemocentro varchar(50),
    rua_hemocentro varchar(50)
);

create table agenda (
id int primary key auto_increment,
data_disponivel date,
horario_disponivel time,
id_hemocentro int,

foreign key (id_hemocentro) references hemocentros (id_hemocentro)

);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    hemocentro_id INT , 
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    estado VARCHAR(50),
    cpf char (11),
    cidade VARCHAR(100),
    tipo_sanguineo ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-','Não sei'),
    data_agendamento DATE,
    horario TIME,
    observacoes TEXT,
    confirmou_requisitos BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES cadastro_users(id_cadastro) ON DELETE CASCADE,
    FOREIGN KEY (hemocentro_id) REFERENCES hemocentros(id_hemocentro) ON DELETE CASCADE
);

select * from agendamentos;
create table agenda_user (
	id_agenda int auto_increment primary key,
    data_disponivel date,
    horario_disponivel time,
    hemocentros_id int,
    usuario_id int,
    foreign key (usuario_id) references cadastro_users (id_cadastro) ON DELETE CASCADE,
    foreign key (hemocentros_id) references hemocentros (id_hemocentro) ON DELETE CASCADE
);

create table estoque (
id int primary key auto_increment,
tipo_sanguineo enum('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
quantidade_bolsas decimal (10,2),
quantidade_maxima decimal (10,2),
id_hemocentro int,

foreign key (id_hemocentro) references hemocentros (id_hemocentro)
);



create table voluntarios(
id int primary key auto_increment,
nome varchar (200),
email varchar (200),
cpf char (11),
telefone char (11),
disponibilidade varchar (1000),
mensagem varchar (1000),
permissao boolean,
id_hemocentro int,
usuario_id int,

foreign key (id_hemocentro) references hemocentros (id_hemocentro) on delete cascade ,
foreign key (usuario_id) references cadastro_users (id_cadastro) on delete cascade
);



create view geralQuantidadeLitros as
select distinct tipo_sanguineo, sum(quantidade_bolsas) As quantidade_Tipo from estoque
group by tipo_sanguineo;

