import React from 'react';

export default function DadosGravados({ registros, indexSendoEditado, handleEditar }) {
    
    return (
        <div style={{ marginTop: '40px' }}>
            <h2 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '10px' }}>Dados Gravados</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>CPF</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>RG</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>CEP</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Telefone - Descrição</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (

                    <tr key={registro.id || index} style={{ backgroundColor: indexSendoEditado === registro.id ? '#fff3cd' : 'transparent' }}>
                        <td style={{ padding: '10px', border: '1px solid #ddd', verticalAlign: 'top' }}>{registro.nome}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', verticalAlign: 'top' }}>{registro.cpf}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', verticalAlign: 'top' }}>{registro.rg || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', verticalAlign: 'top' }}>{registro.cep || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', verticalAlign: 'top' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {registro.telefones
                            ?.filter(tel => tel && ((tel.numero && tel.numero.trim() !== '') || (tel.descricao && tel.descricao.trim() !== '')))
                            .map((tel, i) => (
                                <div key={i}>
                                {tel.numero || 'S/N'} {tel.descricao && `- ${tel.descricao}`}
                                </div>
                            ))}
                        </div>
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', verticalAlign: 'top', textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={() => handleEditar(registro)} 
                            style={{
                            padding: '6px 12px', backgroundColor: '#ffc107', color: '#212529',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                            }}
                        >
                            Editar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}