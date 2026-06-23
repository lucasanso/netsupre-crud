import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DadosGravados from '../components/DadosGravados'; 
import CadastroPessoa from '../components/CadastroPessoa';
import CadastroTelefones from '../components/CadastroTelefones';
import BotoesFormulario from '../components/BotoesFormulario';

const API_URL = 'http://localhost:8000/controllers/PessoaController.php';

const telefonesIniciais = Array.from({ length: 5 }, () => ({ numero: '', descricao: '' }));
const estadoInicial = {
  nome: '', cpf: '', rg: '', cep: '', logradouro: '',
  complemento: '', setor: '', cidade: '', uf: '', telefones: telefonesIniciais
};

export default function FormularioCadastro() {
  const [formData, setFormData] = useState(estadoInicial);
  const [registros, setRegistros] = useState([]);
  const [cpfSendoEditado, setCpfSendoEditado] = useState(null); 

  const carregarRegistros = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados do servidor');
      const dados = await response.json();
      setRegistros(dados);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarRegistros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTelefoneChange = (index, campo, valor) => {
    const novosTelefones = [...formData.telefones];
    novosTelefones[index] = { ...novosTelefones[index], [campo]: valor };
    setFormData({ ...formData, telefones: novosTelefones });
  };

  const adicionarTelefone = () => {
    setFormData({ ...formData, telefones: [...formData.telefones, { numero: '', descricao: '' }] });
  };

  const removerTelefone = (indexParaRemover) => {
    const novosTelefones = formData.telefones.filter((_, index) => index !== indexParaRemover);
    setFormData({ ...formData, telefones: novosTelefones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosFiltrados = {
      ...formData,
      telefones: formData.telefones.filter(t => t.numero && t.numero.trim() !== '')
    };

    try {
      if (cpfSendoEditado !== null) {
        const response = await fetch(`${API_URL}?cpf=${cpfSendoEditado}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosFiltrados),
        });

        if (!response.ok) throw new Error('Falha ao atualizar registro.');

        Swal.fire({
          title: 'Sucesso!',
          text: 'Cadastro atualizado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#007BFF'
        });
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosFiltrados),
        });

        if (!response.ok) throw new Error('Falha ao realizar cadastro.');

        Swal.fire({
          title: 'Sucesso!',
          text: 'Cadastro realizado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#007BFF'
        });
      }

      setFormData(estadoInicial);
      setCpfSendoEditado(null);
      carregarRegistros();
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  const handleEditar = (registro) => {
    if (!registro.cpf) {
      Swal.fire({
        title: 'Ops!',
        text: 'O registro clicado não possui um CPF válido.',
        icon: 'warning',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    const vindosDoBanco = registro.telefones || [];
    const completadosAteCinco = [
      ...vindosDoBanco,
      ...Array.from({ length: Math.max(0, 5 - vindosDoBanco.length) }, () => ({ numero: '', descricao: '' }))
    ];

    setFormData({ ...registro, telefones: completadosAteCinco });
    setCpfSendoEditado(registro.cpf); 
  };

  const handleExcluir = async (e) => {
    if (e) e.preventDefault(); 

    if (cpfSendoEditado === null) return;

    const resultadoSwal = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente excluir o cadastro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (!resultadoSwal.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}?cpf=${cpfSendoEditado}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao excluir registro do banco de dados.');
      Swal.fire({
        title: 'Removido!',
        text: 'Cadastro removido com sucesso!',
        icon: 'success',
        confirmButtonColor: '#28a745'
      });

      setFormData(estadoInicial);
      setCpfSendoEditado(null);
      carregarRegistros();
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  const handleCancelar = (e) => {
    if (e) e.preventDefault(); 
    setFormData(estadoInicial);
    setCpfSendoEditado(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <CadastroPessoa formData={formData} handleChange={handleChange} />
          <CadastroTelefones 
            telefones={formData.telefones} handleTelefoneChange={handleTelefoneChange} 
            removerTelefone={removerTelefone} adicionarTelefone={adicionarTelefone} 
          />
        </div>
        <BotoesFormulario 
          indexSendoEditado={cpfSendoEditado} 
          handleExcluir={handleExcluir} handleCancelar={handleCancelar} 
        />
      </form>

      {registros.length > 0 && (
        <DadosGravados registros={registros} handleEditar={handleEditar} />
      )}
    </div>
  );
}