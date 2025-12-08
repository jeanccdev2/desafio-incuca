# Teste Fullstack

## Tecnologias

### O que deve conter resumidamente:

* Vue.js
* Componentes de interface gráfica
* Gerenciamento de estado no cliente
* Análise estática de código (lint)
* API REST
* Autenticação com JWT no backend
* Migrações na camada do backend para criação das tabelas e inserção de dados
* Estimativa da implementação em horas
* Um `README.md` explicando a solução, as escolhas e a estimativa preliminar

### Sugestões de tecnologias:

* Pinia para gerenciamento de estado
* Biblioteca para UI: Vuetify
* AdonisJs ou Laravel para o backend
* Jest para escrever os testes

> Caso queira utilizar outra tecnologia, justifique no `README` do projeto.

---

## O teste sádico

Melhore e depois arruine o humor de uma SPA utilizando a API de piadas geek.
API: [https://github.com/sameerkumar18/geek-joke-api](https://github.com/sameerkumar18/geek-joke-api)

> "- Tive uma ideia genial para fazer as pessoas sorrirem, quanto custa? - indagou o cliente perplexo com a falta de felicidade no mundo."

A aplicação inicia com uma tela de login.

### Requisitos do fluxo e comportamento

* O formulário de login deve conter os campos de e-mail e senha (validação para e-mail e mínimo de 8 caracteres para a senha).
* Após o login, a primeira rota (URL do navegador) é `/inicial`, e possui uma tela nem feliz, nem triste `:|`.
* O primeiro clique na tela deve alterar a rota para `/triste`, e por consequência torná-la 100% triste `:(`.
* Um clique na tela triste deve alterar a rota para `/poker-face` e chamar uma piada randômica do backend, para ser apresentada em uma modal.
* A tela deverá progressivamente melhorar o seu humor enquanto lemos a piada (ou mais de uma) para ela `:)`.
* A modal com a piada só poderá ser fechada após a tela estar 100% feliz com a sua vida novamente, e a rota para isso deverá ser `/feliz`.
* Fechada a modal, a SPA volta a sua indecisão `/inicial` sobre o seu humor, sua vida, o universo e tudo mais `:|`.

---

## Mais requisitos

* Faça uma estimativa inicial do tempo necessário em horas para implementar a solução e anote no `README`.
* O projeto deve estar separado entre **backend (API REST)** e **frontend** (que consulta a API REST).
* As chamadas para a API geek devem ser feitas a partir do backend (frontend chama o backend, backend chama a API geek e devolve o resultado para o frontend).
* As tabelas e o usuário inicial precisam ser criados no banco de dados automaticamente a partir de uma migração.
* O usuário inicial deverá ser `cliente@incuca.com.br`, e a senha:

```
seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga
```

* A autenticação deve ser feita por JWT.
* O token deve ser persistido na sessão, ou seja, se eu logar e recarregar o navegador, não preciso fazer um novo login.

---

## Diferenciais

* Testes unitários e de integração.
* Uso do Docker (rodar o comando `docker-compose up` e acessar o navegador em uma URL específica deveria ser todo o necessário para rodar o projeto).

---

## Dicas

* O detalhamento dos requisitos não é extensivo, então cumpra-os, porém fique livre para usar a criatividade nas lacunas.
* Faça a estimativa em horas para implementar **antes** de começar. Serve para autoconhecimento e é algo que fazemos diariamente para manter a transparência com clientes e outros membros do time. Não há problema em errar, pois tudo é um processo de aprendizado.
* A estimativa pode ser separada em duas etapas:

  1. Cumprimento dos requisitos.
  2. O que mais você queira adicionar ao projeto (evolução do produto).
* Os frameworks sugeridos possuem todos os itens necessários para a implementação do teste.
* Caso tenha dúvidas, não hesite em perguntar para `rh@incuca.com.br`.

---

## Avaliação

### Prazo

* Até às 18h do 7º dia.

### Critérios

Entre os critérios de avaliação estão:

* Código limpo e organização
* Documentação de código
* Documentação do projeto (`README.md`)
* Usabilidade
* Criatividade
* Entrega

> Enviar o link do repositório com os arquivos para o e-mail `rh@incuca.com.br`.
