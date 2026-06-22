<?php

class Pessoa {
    private array $telefones = [];

    public function __construct(
        private string $nome,
        private string $cpf,
        private string $rg,
        private string $cep,
        private string $logradouro
    ) {}

    public function adicionarTelefone(ControleTelefones $telefone): void {
        $this->telefones[] = $telefone;
    }

    public function getTelefones(): array {
        return $this->telefones;
    }

    public function getNome(): string {
        return $this->nome;
    }
    public function setNome(string $nome): void { 
        $this->nome = $nome;
    }

    public function getPfc(): string { 
        return $this->pfc;
    }

    public function setPfc(string $pfc): void {
        $this->pfc = $pfc;
    }

    public function getRg(): string {
        return $this->rg;
    }

    public function setRg(string $rg): void {
        $this->rg = $rg;
    }

    public function getCep(): string { 
        return $this->cep;
    }

    public function setCep(string $cep): void { 
        $this->cep = $cep;
    }

    public function getLogradouro(): string {
        return $this->logradouro;
    }

    public function setLogradouro(string $logradouro): void {
        $this->logradouro = $logradouro;
    }
    
}
