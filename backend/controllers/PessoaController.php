<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$db_host = getenv('POSTGRES_HOST') ?: 'db';
$db_port = getenv('POSTGRES_PORT') ?: '5432';
$db_name = getenv('POSTGRES_DB') ?: 'netsupre_crud';
$db_user = getenv('POSTGRES_USER') ?: 'admin';
$db_pass = getenv('POSTGRES_PASSWORD') ?: 'admin';

$connection_string = "host=$db_host port=$db_port dbname=$db_name user=$db_user password=$db_pass";
$db = pg_connect($connection_string);

if (!$db) {
    http_response_code(500);
    echo json_encode(["erro" => "Não foi possível conectar ao banco de dados PostgreSQL."]);
    exit;
}

require_once '../models/Pessoa.php';
require_once '../models/Telefone.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$dados = json_decode(file_get_contents("php://input"), true);

$cpfUrl = $_GET['cpf'] ?? null;

switch ($metodo) {

    case 'GET': 
        try {
            echo json_encode(Pessoa::listarTodos($db));
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["erro" => $e->getMessage()]);
        }
        break;

    case 'POST': 
        if (empty($dados['nome']) || empty($dados['cpf'])) {
            http_response_code(400);
            echo json_encode(["erro" => "Nome e CPF são obrigatórios."]);
            break;
        }

        try {
            pg_query($db, "BEGIN");
            $pessoa = new Pessoa(
                $db, $dados['nome'], $dados['cpf'], $dados['rg'] ?? '', $dados['cep'] ?? '',
                $dados['logradouro'] ?? '', $dados['complemento'] ?? '', $dados['setor'] ?? '',
                $dados['cidade'] ?? '', $dados['uf'] ?? ''
            );

            if (!empty($dados['telefones'])) {
                foreach ($dados['telefones'] as $t) {
                    if (isset($t['numero']) && trim($t['numero']) !== '') {
                        $pessoa->adicionarTelefone(new Telefone($t['numero'], $t['descricao'] ?? ''));
                    }
                }
            }

            $idGerado = $pessoa->salvar();
            pg_query($db, "COMMIT");

            $dados['id'] = $idGerado;
            echo json_encode($dados);
        } catch (Exception $e) {
            pg_query($db, "ROLLBACK");
            http_response_code(500);
            echo json_encode(["erro" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        if (!$cpfUrl) {
            http_response_code(400);
            echo json_encode(["erro" => "CPF ausente na URL para atualização."]);
            break;
        }

        try {
            pg_query($db, "BEGIN");
            $pessoa = new Pessoa(
                $db, $dados['nome'], $dados['cpf'], $dados['rg'] ?? '', $dados['cep'] ?? '',
                $dados['logradouro'] ?? '', $dados['complemento'] ?? '', $dados['setor'] ?? '',
                $dados['cidade'] ?? '', $dados['uf'] ?? ''
            );

            if (!empty($dados['telefones'])) {
                foreach ($dados['telefones'] as $t) {
                    if (isset($t['numero']) && trim($t['numero']) !== '') {
                        $pessoa->adicionarTelefone(new Telefone($t['numero'], $t['descricao'] ?? ''));
                    }
                }
            }

            $atualizado = $pessoa->atualizarPorCpf($cpfUrl);
            
            if ($atualizado) {
                pg_query($db, "COMMIT");
                echo json_encode(["sucesso" => true]);
            } else {
                pg_query($db, "ROLLBACK");
                http_response_code(404);
                echo json_encode(["erro" => "CPF não encontrado no banco."]);
            }
        } catch (Exception $e) {
            pg_query($db, "ROLLBACK");
            http_response_code(500);
            echo json_encode(["erro" => $e->getMessage()]);
        }
        break;

    case 'DELETE': 
        if (!$cpfUrl) {
            http_response_code(400);
            echo json_encode(["erro" => "CPF ausente na URL para exclusão."]);
            break;
        }

        try {
            $excluido = Pessoa::excluirPorCpf($db, $cpfUrl);
            if ($excluido) {
                echo json_encode(["sucesso" => true]);
            } else {
                http_response_code(404);
                echo json_encode(["erro" => "CPF não encontrado para remoção."]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["erro" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["erro" => "Método não suportado."]);
        break;
}