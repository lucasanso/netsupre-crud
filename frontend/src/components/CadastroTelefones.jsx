import React from 'react';

export default function CadastroTelefones({ telefones, handleTelefoneChange, removerTelefone, adicionarTelefone }) {
  return (
    <div style={{ flex: '1 1 400px' }}>
      <fieldset style={{ height: '100%', boxSizing: 'border-box', marginBottom: '20px', padding: '15px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <legend style={{ fontWeight: 'bold', padding: '0 10px' }}>Telefones</legend>

        {telefones.map((telefoneItem, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '15px', 
              paddingBottom: '10px', borderBottom: index < telefones.length - 1 ? '1px dashed #eee' : 'none' 
            }}
          >
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Telefone {index + 1}:</label>
              <input 
                type="tel" value={telefoneItem.numero} 
                onChange={(e) => handleTelefoneChange(index, 'numero', e.target.value)} 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '38px' }} 
                placeholder="(00) 00000-0000"
              />
            </div>

            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Descrição:</label>
              <input 
                type="text" value={telefoneItem.descricao} 
                onChange={(e) => handleTelefoneChange(index, 'descricao', e.target.value)} 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '38px' }} 
                placeholder="Ex: Celular, Comercial..."
              />
            </div>

            <button
              type="button" onClick={() => removerTelefone(index)} title="Remover este telefone"
              style={{
                padding: '0 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', 
                borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', height: '38px'
              }}
            >
              X
            </button>
          </div>
        ))}

        <button 
          type="button" onClick={adicionarTelefone}
          style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', width: '100%' }}
        >
          + Adicionar mais um telefone
        </button>
      </fieldset>
    </div>
  );
}