<h1 align="center">SeguraHome - API para Seguros Residenciais</h1>
<h3 align="center">Por Alan Dias, Eduardo Reis, Enrique Andreazza, Kali França, Karoline S. Fassel, Lívia Dias e Pâmela dos Reis</h3>

---

## 📌 Descrição Geral
O **SeguraHome** é uma API de gerenciamento de cadastro de imóveis e gerenciamento de planos voltado para empresas que atuam no ramo dos Seguros Residenciais. A aplicação permite o Registro dos Imóveis Segurados e ligação aos Planos de Seguro contratados para os mesmos, possibilitando consultar, editar e excluir informações - Tanto sobre os Imóveis Segurados quanto sobre os Planos oferecidos - sempre que necessário.

---

## 🧩 Entidades e Atributos
# 🏡 Entidade **Imóvel** 
A entidade principal do sistema é o **Imóvel** cadastrado pela empresa. Os atributos definidos além do ID são:

- **cep** – CEP da área onde o Imóvel se localiza  
- **bairro** – Bairro do Imóvel  
- **rua** – Rua do imóvel  
- **numero** – Número do imóvel  
- **complemento** – Complemento no endereço (Número de bloco/apartamento, caso exista)  
- **tipoImovel** – Tipo do imóvel (Apartamento)  
- **areaConstruida** – Área construída do imóvel em metros quadrados  
- **valor** – Valor do seguro calculado com base na área construída, multiplicado pelo valor por metro quadrado definido pelo plano. Caso a área construída seja maior que 200m², ocorre um acréscimo de 15% sobre o valor do seguro.
- **plano** – Atributo que relaciona o imóvel com o plano contratado no momento de registro. O Plano é representado na API como uma entidade separada, e tem sua própria tabela no banco de dados.

Esses atributos foram escolhidos por representarem informações essenciais para sistemas utilizados na representação de imóveis por qualquer seguradora do ramo.

---

## 🧩 Entidades e Atributos
# 🤝 Entidade **Plano**
A entidade  **Plano** é criada e gerenciada pela empresa. Os atributos definidos além do ID são:

- **nome** – Nome do plano  
- **precoArea** – Valor do seguro por metro quadrado    
- **imovel** – Lista de imóveis segurados pelo plano

Esses atributos foram escolhidos por representarem informações que refletem bem os dados importantes de um plano de Seguro Residencial.

---

## ⚙️ Funcionalidades Principais (CRUD)
Operações básicas de CRUD, comuns aos dois recursos (Imóvel e Plano):

- **findAll()** – Lista todos os Planos/Imóveis cadastrados  
- **findById()** – Busca Planos/Imóveis específicos por ID  
- **create()** – Cadastra um novo Imóvel/Plano  
- **update()** – Atualiza os dados de um Plano/Imóvel existente  
- **delete()** – Remove um Plano/Imóvel do sistema  

---

## ⚙️ Funcionalidades Específicas de cada recurso
Métodos que atendem a necessidades específicas de cada recurso (lógica de negócio):

- **PlanoService.findAllByName()** – Busca Imóveis registrados por palavra-chave
- **ImovelService.calcularValor()** – Faz o cálculo de valor do seguro baseado no plano contratado e área construída. Se a área for maior que 200m², ocorre um acréscimo de 15% do valor base. 

---

## 🛠️ Tecnologias Utilizadas
### **Backend e Banco de Dados**
- **TypeScript** – Linguagem utilizada no desenvolvimento do backend, garantindo tipagem estática e melhor manutenção do código.  
- **TypeORM** – ORM utilizado para mapear entidades, gerenciar migrations e facilitar a comunicação com o banco de dados.  
- **NestJS** – Framework backend responsável pelos endpoints, controllers, services e modules.  
- **MySQL** – Banco de dados relacional usado para armazenar e organizar os registros.
- **Insomnia** – Ferramenta para testar as rotas da API, validar requisições e simular operações CRUD.


### **Ferramentas de Apoio**
- **Trello** – Organização das tarefas, separação de atividades e acompanhamento do progresso do time.
- **Canva** – Criação do logotipo, identidade visual e design geral do projeto.


