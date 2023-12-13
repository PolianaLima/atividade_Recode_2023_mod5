## Projeto Agencia de Viagens
### Tabelas de banco de dados

#### Modulo para usuario final do front end
<h2>Cliente:</h2>
<hr/>
Id<br>
Nome<br>
Sobrenome<br>
data nascimento<br>
cpf<br>
Genero<br>
Contato<br>
Email<br>
Senha


<h2>Passageiros:</h2>
<hr/>
Id<br>
Id_Cliente<br>
Nome<br>
Sobrenome<br>
data nascimento<br>
cpf<br>
Genero<br>

<h2>Compra_Passagens:</h2>
<hr/>
Id_Cliente<br>
Id_Voo<br>
Id_Passageiros<br>
Numero_Reserva<br>
Tipo:<br>



#### Modulo backoffice

<h2>Usuarios:</h2>
<hr/>
Login<br>
Senha<br>
Nome<br>


<h2>Aeroporto:</h2>
<hr/>
Id<br>
Nome<br>
Codigo<br>
Endereco<br>
Cidade<br>
Estado<br>
Pais<br>

<h2>Companhia Aereas:</h2>
<hr/>
Id<br>
Nome<br>
CNPJ<br>

<h2>Voo:</h2>
<hr/>
Id<br>
Numero<br>
Id_Companhia_Aerea<br>
Id_aeroporto_partida<br>
Id_aeroporto_chegada<br>
Hora_partida<br>
Duracao<br>
Numero_assentos<br>
Preco<br>
Desconto<br>



