CREATE DATABASE providers_backend CHARACTER SET utf8 COLLATE utf8_general_ci;

use providers_backend;

create table pc_companies(
	id int not null auto_increment primary key,
    estado char(2) not null,
    nome_fantasia varchar(50) not null,
    cnpj varchar(20) not null,
    data_cadastro datetime
)default charset utf8;

create table pc_providers(
	id int not null auto_increment primary key,
    id_empresa int,
    nome varchar(50) not null,
    telefone varchar(16) not null,
    tipo_pessoa varchar(8) not null,
    nro_documento varchar(20),
    nro_rg varchar(20),
    data_nascimento datetime,
    data_cadastro datetime,
    foreign key(id_empresa) references pc_companies(id) on update cascade on delete cascade
)default charset utf8;

drop table pc_companies;
drop table pc_providers;

select * from pc_companies;
select * from pc_providers;

truncate pc_companies;
truncate pc_providers;