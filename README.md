## Sobre / About
A simple CRUD with filters for search, somes components, masks, eloquent for database and a providers's list, in which each one provides service for one companie.

Um Simples CRUD com Laravel 5.8 e AngularJS, com filtros para pesquisa, alguns componentes, máscaras, eloquent para o banco de dados e uma lista de fornecedores, na qual cada um presta serviços à uma empresa.

### Tecnologias utilizadas: 
* PHP 7.2
* MySQL
* HTML, CSS, e Javacript

### Frameworks utilizadas:
* Laravel 5.8 (Eloquent)
* Bootstrap 4.3
* AngularJS 1.7.7

### Primeiros passos
Observação: Se você não tem o PHP instalado na sua máquina, baixe-o aqui: [PHP](https://windows.php.net/download#php-7.2)

Esteja ciente que o PHP tenha sido instalado nas variáveis do sistema de sua máquina. Não sabe fazer isso? Entre aqui e siga os passos deste tutorial: [Instalação do PHP e Composer](https://www.jeffgeerling.com/blog/2018/installing-php-7-and-composer-on-windows-10)

Será necessário ter o Apache em sua máquina também para rodar o projeto. 
Para isso existem alguns softwares que ajudam nisso como o [XAMPP](https://www.apachefriends.org/download.html), ou [WAMPP](http://www.wampserver.com/en/), e/ou o próprio [Apache](https://www.apachelounge.com/download/).

Se você baixou o Apache, descompacte a pasta "Apache24" em algum local do seu computador, por exemplo: C:\Apache24

E por último, se não tiver o MySQL instalado, baixe-o aqui: [MySQL Download](https://dev.mysql.com/downloads/mysql/)

Para criação do banco de dados e manipulação por linha de comando SQL, eu recomendo o uso do [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

### Extraindo os arquivos e criando o banco de dados
* Descompacte as pastas de "providers_backend" e "providers_frontend" no local onde seu Apache roda os projetos, por exemplo, no XAMPP ou Apache temos a pasta "htdocs".

* Inicie seu MySQL, ou tenha certeza de que o mesmo esteja funcionando corretamente.

* Crie o banco de dados (é recomendável o uso do Workbench) usando os comandos do arquivo "database.sql".

### Rodando o Frontend
* Abra o terminal/prompt de comando e vá para a pasta do projeto e entre em "providers_frontend". Por exemplo: C:\Apache24\htdocs\providers_frontend

* Em seguida dê o comando de instalação das dependências do Node: npm install

* Dê o comando de deploy dos arquivos criados pelo webpack: npm run dev

* Depois desses dois primeiros comandos rode o projeto com o PHP: php -S localhost:4200

O Front-end estará rodando em http://localhost:4200

### Rodando o Backend
* Abra o terminal/prompt de comando e vá para a pasta do projeto e entre em "providers_backend". Por exemplo: C:\Apache24\htdocs\backend_frontend

* Em seguida dê o comando de instalação das dependências do Laravel usando o Composer: composer install

* Dê o comando a seguir para rodar o backend: php -S localhost:3000 -t public

O Back-end estará rodando em http://localhost:3000


## END

Created in: 14/04/2019
By Matheus Ramos -> https://matheusramos.com/


