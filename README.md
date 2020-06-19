# Teste SysFar - Desenvolvedor Web PHP

## Instalando o projeto:
<p>Acesse o diretório em que deseja instalar o projeto e execute o comando:</p>
<pre><code>git clone https://nikolastimoteo@bitbucket.org/nikolastimoteo/teste-sysfar.git</code></pre>

<p>Acesse o diretório do projeto, crie uma cópia do arquivo <b>.env.example</b> com o nome <b>.env</b> e altere as variáveis de ambiente abaixo, no novo arquivo, para as configurações do seu banco de dados:</p>
<pre><code>DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=</code></pre>

<p>Instale as dependências do PHP executando o comando:</p>
<pre><code>composer install</code></pre>

<p>Instale as dependências do Node executando o comando:</p>
<pre><code>npm install</code></pre>

<p>Gere a chave da aplicação executando o comando:</p>
<pre><code>php artisan key:generate</code></pre>

<p>Gere a chave de encriptação do JWT executando o comando:</p>
<pre><code>php artisan jwt:secret</code></pre>

<p>Execute as migrações e <i>seeders</i> do projeto com o comando:</p>
<pre><code>php artisan migrate --seed</code></pre>

<p>Execute a compilação contínua do front-end com o comando:</p>
<pre><code>npm run watch</code></pre>

<p>Execute o servidor de teste com o comando:</p>
<pre><code>php artisan serve</code></pre>

<p>Acesse http://localhost:8000 e entre no sistema com as credenciais:</p>
<pre><code>E-mail: usuario@teste.com.br
Senha: 123456</code></pre>