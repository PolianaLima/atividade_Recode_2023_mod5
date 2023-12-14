# Projeto-recode-v5 - entrega 05
Entrega 05 projeto Recode 2023

# Objetivo
Este projeto tem como objetivo criar um site de agencia de viagens, contendo um backoffice para cadastro de voos, aeroportos e empresas aereas. 
E para o cliente lista de voos e compra de passagem.

## 🎲 Rodando o Back End (Desenvolvida em Java com Spring Boot com implementação do Spring Security)

### Clone este repositório
$ git clone <https://github.com/PolianaLima/atividade_Recode_2023_mod5.git>

### Acesse a pasta : agencia e instale as dependências pelo utilizando o maven
$ mvn install

### Execute a aplicação
Utilizando o postman ou outra aplicaçao semelhante crie um usuario ADMIN para acessar o <b> BackOffice</b><br>
Rota: http://localhost:8080/auth/register<br>
<b>JSON:</b> <br>
{<br>
    "login":"login",<br>
    "nome":"nome",<br>
    "senha":"senha",<br>
    "role":"ADMIN"<br>
}<br>

## 🎲 Rodando o Front End (Desenvolvida em NEXTJS):

### Acesse a pasta: agencia_v5 e instale as dependências pelo utilizando o npm
$ npm install

### Execute a aplicação
$ npm run dev

<p>Ao acessar o site acesse a pagina de admin e cadastro e efetue os cadastros de Aeroportos, Empresas Aereas e Voos. </p>
<p>Para inserir os dados mais rapidamente execute o script <b>INSERÇÃO DE DADOS</b> </p>

## 🛠 Tecnologias utilizadas:
<li>Java com Spring Boot</li>
<li>Spring Security</li>
<li>Next.Js</li>
<li>BootStrap</li>
<li>Html</li>
<li>Css</li>
<li>Javascript</li>
<li>Banco de dados: MySql</li>

### Proximas Features
<li>Implementar tratativas de erros na API</li>
<li>Testes de Softwares</li>
<li>Implementar Vendas de Pacotes</li>

## Estrutura do projeto:
<p>Telas do projeto!</p>

![Home](https://github.com/PolianaLima/atividade_Recode_2023_mod5/assets/55353539/fa85692a-99f1-44c4-88c5-05a62b81d42b)
![Destinos](https://github.com/PolianaLima/atividade_Recode_2023_mod5/assets/55353539/5c22fc28-cd91-46b5-925c-b99c3dda60ad)
![Promoções](https://github.com/PolianaLima/atividade_Recode_2023_mod5/assets/55353539/68b8303f-9dc9-4e4d-9653-ae1eefcff9d0)
![Pagina Card Passagem](https://github.com/PolianaLima/atividade_Recode_2023_mod5/assets/55353539/24bb31ff-b98c-4de7-8eff-8916c77d99c3)
![Contato](https://github.com/PolianaLima/atividade_Recode_2023_mod5/assets/55353539/b99e61a3-fa1e-4ce3-9adb-1eeff6a0ea5a)
![Dashbord - backoffice](https://github.com/PolianaLima/atividade_Recode_2023_mod5/assets/55353539/76612812-f98f-4cc4-97ad-31c5509a061f)

<h2>ATENÇÃO</h2>
<p>Os dados ja estão sendo renderizados do banco de dados.</p>

