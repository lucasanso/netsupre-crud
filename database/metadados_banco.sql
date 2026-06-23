-- Inicialização de Metadados

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