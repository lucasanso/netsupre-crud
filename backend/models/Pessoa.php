<?php
// models/Pessoa.php

class Pessoa {
    private array $telefones = [];

    public function __construct(
        private $db, 
        private string $nome,
        private string $cpf,
        private string $rg = '',
        private string $cep = '',
        private string $logradouro = '',
        private string $complemento = '',
        private string $setor = '',
        private string $cidade = '',
        private string $uf = ''
    ) {}

    public function adicionarTelefone(Telefone $telefone): void {
        $this->telefones[] = $telefone;
    }

    public function salvar(): int {
        $sql = "INSERT INTO pessoas (nome, cpf, rg, cep, logradouro, complemento, setor, cidade, uf) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id";
                      
        $params = [
            $this->nome, $this->cpf, $this->rg, $this->cep, $this->logradouro,
            $this->complemento, $this->setor, $this->cidade, $this->uf
        ];

        $result = pg_query_params($this->db, $sql, $params);
        $row = pg_fetch_assoc($result);
        $pessoaId = (int)$row['id'];

        if (!empty($this->telefones)) {
            $sqlTel = "INSERT INTO telefones (pessoa_id, numero, descricao) VALUES ($1, $2, $3)";
            foreach ($this->telefones as $t) {
                pg_query_params($this->db, $sqlTel, [$pessoaId, $t->getNumero(), $t->getDescricao()]);
            }
        }

        return $pessoaId;
    }

    public static function listarTodos($db): array {
        $sql = "SELECT id, nome, cpf, rg, cep, logradouro, complemento, setor, cidade, uf FROM pessoas ORDER BY id DESC";
        $result = pg_query($db, $sql);
        $pessoas = pg_fetch_all($result) ?: [];

        foreach ($pessoas as $index => $pessoa) {
            $sqlTel = "SELECT numero, descricao FROM telefones WHERE pessoa_id = $1";
            $resTel = pg_query_params($db, $sqlTel, [$pessoa['id']]);
            $pessoas[$index]['telefones'] = pg_fetch_all($resTel) ?: [];
        }

        return $pessoas;
    }

    public function atualizarPorCpf(string $cpfAntigo): bool {
        $sqlPessoa = "UPDATE pessoas SET 
                        nome = $1, cpf = $2, rg = $3, cep = $4, logradouro = $5, 
                        complemento = $6, setor = $7, cidade = $8, uf = $9 
                      WHERE cpf = $10 RETURNING id";
                      
        $paramsPessoa = [
            $this->nome, $this->cpf, $this->rg, $this->cep, $this->logradouro,
            $this->complemento, $this->setor, $this->cidade, $this->uf, $cpfAntigo
        ];

        $resultPessoa = pg_query_params($this->db, $sqlPessoa, $paramsPessoa);
        
        if ($row = pg_fetch_assoc($resultPessoa)) {
            $pessoaId = $row['id'];

            pg_query_params($this->db, "DELETE FROM telefones WHERE pessoa_id = $1", [$pessoaId]);

            if (!empty($this->telefones)) {
                $sqlTelefone = "INSERT INTO telefones (pessoa_id, numero, descricao) VALUES ($1, $2, $3)";
                foreach ($this->telefones as $t) {
                    pg_query_params($this->db, $sqlTelefone, [$pessoaId, $t->getNumero(), $t->getDescricao()]);
                }
            }
            return true;
        }

        return false;
    }

    public static function excluirPorCpf($db, string $cpf): bool {
        $sql = "DELETE FROM pessoas WHERE cpf = $1";
        $result = pg_query_params($db, $sql, [$cpf]);
        return pg_affected_rows($result) > 0;
    }
}