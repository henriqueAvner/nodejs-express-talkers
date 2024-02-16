
# README
## Talkers Project :mortar_board:
![image](https://github.com/henriqueAvner/nodejs-express-talkers/assets/133919307/53913ffa-2da4-4ef8-9a67-9d826ddb5c64)

> Este projeto teve como intuito a criar uma API Restful em Node.js e Express para um grupo de palestrantes, onde era possível:
>- Fazer a requisição pra um endpoint de todos os palestrantes;
>- Buscar cada um dos palestrantes baseado em seu id;
>- Adicionar mais palestrantes a API;
>- Editar os dados de algum palestrante,
>- Remover algum palestrante da API;
>- Filtrar palestrantes pela sua nota ou seu nome através da barra de pesquisa;
## :computer: Os arquivos desenvolvidos  foram: :computer:
  - Os arquivos dentro da pasta src, referentes à:
  -  Middlewares:
     > Validação de token gerado após o cadastro do palestrante, além de regras de negócio para busca, criação, edição, e remoção;
  - Utils:
    > Criação do token utilizado como validação;
  - Arquivo index:
    > Onde toda a implementação do CRUD da API foi realizado;

## Rotas:

| Rota                 | Funcionalidade                                       | Tipo de Requisição |
|----------------------|------------------------------------------------------|--------------------|
| /talker              | Retorna todos os palestrantes                        | GET                |
| /talker/search       | Busca palestrantes por nome                          | GET                |
| /talker/:id          | Retorna um palestrante específico pelo ID            | GET                |
| /login               | Realiza o login do usuário                           | POST               |
| /talker/             | Adiciona um novo palestrante                         | POST               |
| /talker/:id          | Atualiza os dados de um palestrante específico       | PUT                |
| /talker/:id          | Remove um palestrante específico                     | DELETE             |
|/talker/search?q&rate | Busca palestrantes por nota ou nome                  | GET                |


## :exclamation:ATENÇÃO:exclamation:
 - Todos os outros arquivos que não foram mencionados anteriormente, foram criados pela Trybe :white_check_mark:
