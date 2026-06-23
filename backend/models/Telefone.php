<?php

class Telefone {
    public function __construct(
        private string $numero,
        private string $descricao
    ) {}

    public function getNumero(): string {
        return $this->numero;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }
}