# Teste SysFar - Desenvolvedor Web PHP

## Instalando o projeto:

Acesse o diretório em que deseja instalar o projeto e execute o comando:
``` bash
git clone https://nikolastimoteo@bitbucket.org/nikolastimoteo/teste-sysfar.git
```

Acesse o diretório do projeto, crie uma cópia do arquivo **.env.example** com o nome **.env** e altere as variáveis de ambiente abaixo, no novo arquivo, para as configurações do seu banco de dados:
``` bash
DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Instale as dependências do PHP executando o comando:
``` bash
composer install
```

Instale as dependências do Node executando o comando:
``` bash
npm install
```

Gere a chave da aplicação executando o comando:
``` bash
php artisan key:generate
```

Gere a chave de encriptação do JWT executando o comando:
``` bash
php artisan jwt:secret
```

Execute as migrações e *seeders* do projeto com o comando:
``` bash
php artisan migrate --seed
```

Execute a compilação do front-end com o comando:
``` bash
npm run dev
```

Execute o servidor de teste com o comando:
``` bash
php artisan serve
```

Acesse http://localhost:8000 e entre no sistema com as credenciais:
```
E-mail: usuario@teste.com.br
Senha: 123456
```