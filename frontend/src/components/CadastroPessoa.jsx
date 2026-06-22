import React from 'react';

export default function CadastroPessoa({ formData, handleChange }) {
  const ufsBrasil = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div style={{ flex: '1 1 400px' }}>
      <fieldset style={{ marginBottom: '20px', padding: '15px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <legend style={{ fontWeight: 'bold', padding: '0 10px' }}>Cadastro de Pessoas</legend>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px' }}>Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="cpf" style={{ display: 'block', marginBottom: '5px' }}>CPF:</label>
          <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="rg" style={{ display: 'block', marginBottom: '5px' }}>RG:</label>
          <input type="text" id="rg" name="rg" value={formData.rg} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      </fieldset>

      <fieldset style={{ marginBottom: '20px', padding: '15px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <legend style={{ fontWeight: 'bold', padding: '0 10px' }}>Endereço</legend>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="cep" style={{ display: 'block', marginBottom: '5px' }}>CEP:</label>
          <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="logradouro" style={{ display: 'block', marginBottom: '5px' }}>Logradouro:</label>
          <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="complemento" style={{ display: 'block', marginBottom: '5px' }}>Complemento:</label>
          <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="setor" style={{ display: 'block', marginBottom: '5px' }}>Setor:</label>
          <input type="text" id="setor" name="setor" value={formData.setor} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="cidade" style={{ display: 'block', marginBottom: '5px' }}>Cidade:</label>
          <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="uf" style={{ display: 'block', marginBottom: '5px' }}>UF:</label>
          <select id="uf" name="uf" value={formData.uf} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required>
            <option value="">Selecione um estado</option>
            {ufsBrasil.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
}