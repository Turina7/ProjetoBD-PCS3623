import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/produtos')
      .then(response => {
        setProdutos(response.data);
      })

    axios.get('http://localhost:5000/api/pedidos')
      .then(response => {
        setPedidos(response.data);
      })

    axios.get('http://localhost:5000/api/clientes')
      .then(response => {
        setClientes(response.data);
      })

      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Estoque</h1>
      <ul>
        {produtos.map(produtos => (
          <li key={produtos.idprod}>
            <strong>{produtos.nome_jogo}</strong> <br />
            Quantidade em estoque: {produtos.estoqprod}<br />
            Categoria: {produtos.catprod}
            <br />
            <br />
          </li>
        ))}
      </ul>

      <h1>Pedidos</h1>
      <ul>
        {pedidos.map(pedidos => (
          <li key={pedidos.id_pedidos}>
            <strong>{pedidos.id_pedidos}</strong><br />
            Cliente: {pedidos.nome_cliente}<br />
            Data: {pedidos.data}<br />
            Valor: {pedidos.total}<br />
            <br />
            <br />
          </li>
        ))}
      </ul>
      <button>
        Exibir Pedidos
      </button>

      <h1>Clientes por valor</h1>
      <input
        type="value"
        placeholder="Valor mínimo gasto"
      />
      <ul>
        {clientes.map(clientes => (
          <li key={clientes.id_clientes}>
            <strong>{clientes.nome_cliente}</strong><br />
            Endereço: {clientes.endereco}<br />
            Telefone: {clientes.telefone}<br />
            Email: {clientes.email}<br />
            <br />
            <br />
          </li>
        ))}
      </ul>

      <h1>Vendas por categoria</h1>
      <h2>Jogo de Tabuleiro</h2>
      {produtos.catprod === 'jogo de tabuleiro' &&( //Esse if nao funcionou
      <ul>
        {produtos.map( produtos => (
          <li key={produtos.idprod}>
          Nome: {produtos.nome_jogo}<br />
          Vendas: {produtos.vendprod}<br />
          <br />
          <br />
          </li>
        ))}
      </ul>
      )}

      <h2>Miniatura</h2>
      <h2>Jogo de cartas</h2>

      <h1>Itens vendidos por data</h1>
      <input
        type="text"
        placeholder="Data (DD/MM/AAAA)"
      />

    </div>
  );
};

export default YourComponent;

//Listar todos os produtos em estoque.
//- Mostrar detalhes de um pedido específico, incluindo os itens comprados.
//- Encontrar clientes que gastaram mais de um determinado valor em compras.
//- Calcular o total de vendas por categoria de produto.
//- Mostrar itens vendidos em uma data específica
