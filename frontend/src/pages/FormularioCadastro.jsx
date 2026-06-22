import React, { useState } from 'react';
import DadosGravados from '../components/DadosGravados'; 
import CadastroPessoa from '../components/CadastroPessoa';
import CadastroTelefones from '../components/CadastroTelefones';
import BotoesFormulario from '../components/BotoesFormulario';

const telefonesIniciais = Array.from({ length: 5 }, () => ({ numero: '', descricao: '' }));
const estadoInicial = {
  nome: '', cpf: '', rg: '', cep: '', logradouro: '',
  complemento: '', setor: '', cidade: '', uf: '', telefones: telefonesIniciais
};

export default function FormularioCadastro() {
  const [formData, setFormData] = useState(estadoInicial);
  const [registros, setRegistros] = useState([]);
  const [indexSendoEditado, setIndexSendoEditado] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (indexSendoEditado !== null) {
      const registrosAtualizados = [...registros];
      registrosAtualizados[indexSendoEditado] = formData;
      setRegistros(registrosAtualizados);
      setIndexSendoEditado(null);
    } else {
      setRegistros([...registros, formData]);
    }
    setFormData(estadoInicial);
  };

  const handleEditar = (index) => {
    setFormData(registros[index]);
    setIndexSendoEditado(index);
  };

  const handleExcluir = () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este cadastro?");
    if (confirmar && indexSendoEditado !== null) {
      const novosRegistros = registros.filter((_, index) => index !== indexSendoEditado);
      setRegistros(novosRegistros);
      setFormData(estadoInicial);
      setIndexSendoEditado(null);
    }
  };

  const handleCancelar = () => {
    setFormData(estadoInicial);
    setIndexSendoEditado(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          <CadastroPessoa 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <CadastroTelefones 
            telefones={formData.telefones} 
            handleTelefoneChange={handleTelefoneChange} 
            removerTelefone={removerTelefone} 
            adicionarTelefone={adicionarTelefone} 
          />

        </div>

        <BotoesFormulario 
          indexSendoEditado={indexSendoEditado} 
          handleExcluir={handleExcluir} 
          handleCancelar={handleCancelar} 
        />
      </form>

      {registros.length > 0 && (
        <DadosGravados 
          registros={registros} 
          indexSendoEditado={indexSendoEditado}
          handleEditar={handleEditar} 
        />
      )}

    </div>
  );
}