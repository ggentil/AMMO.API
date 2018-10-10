# AMMO.API
Este projeto está publicado no Heroku (https://www.heroku.com), e pode ser acessado através da URL (https://ammo-api.herokuapp.com/).

## Rotas disponíveis:

 ### Cadastrar produto
 - (POST)/produtos
 - O formato está exemplificado no arquivo "produto.json" na raiz do projeto

 ### Listar produtos
 - (GET)/produtos/:qtdeProdutoPorPagina?/:pagina?/:termo?

 ### Obter produto
 - (GET)/produtos/:id

 ### Remover produto
 - (DELETE)/produtos/:id

 ## Rodar projeto local
 Com os arquivos já baixados, navegue para o diretório alvo do projeto, use "npm install" (já com node instalado) pra instalar os pacotes necessários.
 Em seguida use "nodemon server.js" para emular localmente as APIs.