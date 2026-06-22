import React from 'react';

export default function BotoesFormulario({ indexSendoEditado, handleExcluir, handleCancelar }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <button 
        type="submit" 
        style={{ 
          flex: '1', padding: '15px', backgroundColor: indexSendoEditado !== null ? '#28a745' : '#007BFF', 
          color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'
        }}
      >
        {indexSendoEditado !== null ? 'Atualizar Cadastro' : 'Salvar Cadastro'}
      </button>

      {indexSendoEditado !== null && (
        <>
          <button 
            type="button" onClick={handleExcluir}
            style={{ 
              flex: '1', padding: '15px', backgroundColor: '#dc3545', color: '#fff', 
              border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'
            }}
          >
            Excluir Cadastro
          </button>

          <button 
            type="button" onClick={handleCancelar}
            style={{ 
              flex: '1', padding: '15px', backgroundColor: '#6c757d', color: '#fff', 
              border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'
            }}
          >
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}