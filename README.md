# Projeto Rede Social

## Objetivo
O objetivo principal desse projeto é melhorar o meu repositório ProjetoExtensão tornando-o mais dinâmico para os usuários. Além disso, como consequência, consegui aprimorar e aprender novas habilidades na criação desse projeto, dentre elas: manipulação do banco de dados, aprendizado em NodeJS e segurança da aplicação.

## Descrição
Este projeto é uma rede social onde os usuários podem participar de grupos temáticos e criar postagens associadas a esses temas. Cada grupo possui um tema específico, e as postagens são relacionadas a ele. As postagens podem ser curtidas e comentadas, dando aos usuários a capacidade de interagir e trocar ideias. Além disso, são implementadas medidas de segurança, como a possibilidade de curtir/descurtir postagens e a capacidade de apagar comentários, tanto pelos autores quanto pelos participantes do grupo que realizaram a postagem.

## Funcionalidades
- Adesão a Grupos: Ao se cadastrar, os usuários podem escolher entre grupos existentes e, com a senha correta, participar desses grupos para poderem realizar postagens.
- Criação de Postagens: Os usuários têm a capacidade de criar postagens personalizadas, incluindo título, descrição e imagens, para compartilhar conteúdo com todos os usuários e visitantes.
- Feedback nas postagens: Os usuários podem interagir com as postagens, dando curtidas e adicionando comentários.

## Tecnologias Utilizadas

- Node.js: Ambiente de execução para JavaScript no servidor.
- Express: Framework web para construção de aplicativos Node.js.
- MongoDB: Banco de dados NoSQL para armazenar os dados do projeto.
- Mongoose: ODM (Object Data Modeling) para MongoDB e Node.js. Facilita a interação entre o MongoDB (banco de dados) e a aplicação.
- EJS: Linguagem de modelo para gerar HTML com JavaScript
- Bootstrap: Framework que facilita a criação de telas responsivas e desenvolvimento de interfaces.
- Swiper: Biblioteca para criar slides/carrosseis nas postagens.
- CSURF: Middleware para proteção contra ataques CSRF.
- Bcrypt.js: Biblioteca para hash de senhas.
- Dotenv: Segurança de variáveis de ambiente, além de facilitar a configuração e o gerenciamento dessas variáveis.
- Helmet: Middleware para aumentar a segurança de aplicativos Express.
- Connect-flash: Mensagens para dar feedback ao usuário após uma requisição.
- Connect-mongo: Armazenamento de sessões no MongoDB.
- Multer: Middleware para manipulação de formulários, usado principalmente para tratar imagens das postagens.
- Validator: Biblioteca para validação de dados, usada nos formulários.
