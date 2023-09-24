# Projeto #23 - DrivenPass

## Descrição

O DrivenPass é um gerenciador de senhas desenvolvido com o framework NestJS. Este projeto visa proporcionar aos usuários uma maneira segura e conveniente de gerenciar suas senhas, notas seguras e informações de cartões. Com o DrivenPass, os usuários podem criar contas, armazenar credenciais de login, notas seguras e detalhes de cartões de forma segura e organizada.


## Rotas

### Health (/health)
Rota para verificar o estado da aplicação.
GET /health: Retorna a mensagem "I'm okay!" com o status code 200 OK.

### Usuários (/users)
Rota para criação e autenticação de usuários.  
Criação de Contas:  
Os usuários fornecem um e-mail válido e uma senha para criar uma conta.  
Senhas devem ser seguras, com pelo menos 10 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caractere especial.  
Senhas são armazenadas criptografadas no banco de dados.  
Acesso de Contas:  
Os usuários fazem login com e-mail e senha cadastrados.  
Após o login bem-sucedido, recebem um token JWT para autenticação em requisições subsequentes.  

### Credenciais (/credentials)
Rota para armazenar e recuperar informações de credenciais de login.  
Criação de Credenciais:  
Os usuários fornecem uma URL, um nome de usuário e uma senha para registrar uma nova credencial.  
Cada credencial possui um título único.  
Senhas de credenciais são criptografadas com um segredo da aplicação.  
Busca de Credenciais:  
Os usuários podem buscar todas as suas credenciais ou uma específica por ID.  
Senhas são retornadas descriptografadas.  
Deleção de Credenciais:  
Os usuários podem deletar credenciais pelo seu ID.  

### Notas Seguras (/notes)
Rota para armazenar e recuperar notas seguras.  
Criação de Notas Seguras:  
Os usuários fornecem um título e a anotação em formato de texto.  
Cada nota possui um título único.  
Busca de Notas Seguras:  
Os usuários podem buscar todas as suas notas seguras ou uma específica por ID.  
Deleção de Notas Seguras:  
Os usuários podem deletar notas seguras pelo seu ID.  

### Cartões (/cards)
Rota para armazenar e recuperar informações de cartões de crédito e débito.  
Criação de Cartões:  
Os usuários fornecem número do cartão, nome impresso, código de segurança, data de expiração, senha, se é virtual e o tipo (crédito, débito ou ambos).  
Cada cartão possui um título único.  
Senhas de cartões são criptografadas com um segredo da aplicação.  
Busca de Cartões:  
Os usuários podem buscar todos os seus cartões ou um específico por ID.  
Deleção de Cartões:  
Os usuários podem deletar cartões pelo seu ID.  

### Deletar Dados (/erase)
Rota para permitir que os usuários excluam suas contas e dados associados.  
A senha do usuário deve ser fornecida novamente para confirmar a ação.  
A exclusão inclui dados de credenciais, notas, cartões e o registro do usuário.  


## Instalação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contribua

Contribuições são bem vindas! Sinta-se a vontade para abrir nossos issues e enviar novos pull requests para ajudar a melhorar este projeto

## License

Nest is [MIT licensed](LICENSE).
