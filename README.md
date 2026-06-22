# Como Executar o Projeto com Docker
### 1. Clonar o Repositório

```bash
git clone https://github.com/lucasanso/netsupre-crud.git

cd netsupre-crud
```
### 2. Configurar as Variáveis de Ambiente
O projeto utiliza variáveis de ambiente para gerenciar de forma segura as credenciais de acesso ao banco de dados e as portas dos serviços.
Portanto, antes de subir os containers, você precisa criar o arquivo .env com base no modelo fornecido (.env.sample).
### 3. Inicializar os Containers
Na raiz do projeto (onde se encontra o arquivo docker-compose.yml), execute o comando para construir e iniciar os serviços em plano de fundo:

```bash
docker compose up -d --build
```
O Docker se encarregará de inicializar o banco de dados para criar as tabelas: Pessoa e Telefone.

### 4. Acessar a Aplicação
Frontend: http://localhost:3000

Backend: http://localhost:8000/controllers/PessoaController.php

---
## Metadados do Banco de Dados
O banco de dados possui o seguinte mapeamento:
```sql
CREATE TABLE IF NOT EXISTS pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    rg VARCHAR(20),
    cep VARCHAR(15), 
    logradouro VARCHAR(255),
    complemento VARCHAR(100), 
    setor VARCHAR(100),      
    cidade VARCHAR(100),     
    uf CHAR(2)                
);

CREATE TABLE IF NOT EXISTS telefones (
    id SERIAL PRIMARY KEY,
    pessoa_id INT NOT NULL,
    numero VARCHAR(20) NOT NULL,
    descricao VARCHAR(50),
  
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE
);
```
---

## Parar o Ambiente
Para encerrar os containers e liberar as portas do sistema, utilize:

```bash
docker compose down
```
Se deseja apagar também os volumes persistentes criados pelo banco de dados:

```bash
docker compose down -v
```
