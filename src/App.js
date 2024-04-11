import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const YourComponent = () => {
  const [produtos, setProdutos] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [pedidosEncontrados, setPedidosEncontrados] = useState([]);
  const [erro, setErro] = useState(null); // Estado para armazenar mensagens de erro

  useEffect(() => {
    axios.get('http://localhost:5000/api/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        setErro('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
      });

    axios.get('http://localhost:5000/api/pedidos')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        setErro('Erro ao carregar pedidos. Por favor, tente novamente mais tarde.');
      });
  }, []);

  const handleDataChange = (event) => {
    setDataSelecionada(event.target.value);
  };

  const buscarItensVendidos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pedidos/data${dataSelecionada}`);
      setPedidosEncontrados(response.data);
      setErro(null); // Limpar erro se a busca for bem-sucedida
    } catch (error) {
      setErro('Erro ao buscar itens vendidos.');
    }
  };

  return (
    <div>
      {erro && <div className="erro-msg">{erro}</div>}
      <div>
        <h1>Itens vendidos por data</h1>
        <br />
        <input
          type="text"
          placeholder="Data (YYYY-MM-DD)"
          value={dataSelecionada}
          onChange={handleDataChange}
        />
        <button onClick={buscarItensVendidos}>Buscar</button>
      </div>

      <div>
        <h1>Estoque</h1>
        <ul>
          {produtos.map(produto => (
            <li key={produto.idprod}>
              <strong>{produto.nome_jogo}</strong> <br />
              Quantidade em estoque: {produto.estoqprod}<br />
              Categoria: {produto.catprod}
              <br /><br />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Pedidos</h1>
        <ul>
          {pedidos.map(pedido => (
            <li key={pedido.id_pedidos}>
              <strong>{pedido.id_pedidos}</strong><br />
              Cliente: {pedido.nome_cliente}<br />
              Data: {pedido.data}<br />
              Valor: {pedido.total}<br /><br />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <br /><br />
        <h1>Vendas por categoria</h1>
        <div>
          <h2>Jogo de Tabuleiro</h2>
          {produtos.filter(produto => produto.catprod === 'jogo de tabuleiro').map(produto => (
            <ul key={produto.idprod}>
              <li>
                Nome: {produto.nome_jogo}<br />
                Vendas: {produto.vendprod}<br /><br />
              </li>
            </ul>
          ))}
        </div>

        <div>
          <h2>Miniatura</h2>
          {produtos.filter(produto => produto.catprod === 'miniatura').map(produto => (
            <ul key={produto.idprod}>
              <li>
                Nome: {produto.nome_jogo}<br />
                Vendas: {produto.vendprod}<br /><br />
              </li>
            </ul>
          ))}
        </div>

        <div>
          <h2>Jogo de cartas</h2>
          {produtos.filter(produto => produto.catprod === 'jogo de cartas').map(produto => (
            <ul key={produto.idprod}>
              <li>
                Nome: {produto.nome_jogo}<br />
                Vendas: {produto.vendprod}<br /><br />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
