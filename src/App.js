import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [produtos, setProdutos] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/produtos')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error('Error fetching produtos:', error);
            });

        axios.get('http://localhost:5000/api/pedidos')
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.error('Error fetching pedidos:', error);
            });

        axios.get('http://localhost:5000/api/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Error fetching clientes:', error);
            });
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pedidos/${dataSelecionada}`);
                setPedidos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dataSelecionada]);

    const handleDataChange = (event) => {
        setDataSelecionada(event.target.value);
    };

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



            <h1>Vendas por categoria</h1>
            <h2>Jogo de Tabuleiro</h2>
            {produtos.filter(produto => produto.catprod === 'jogo de tabuleiro').map(produto => (
                <ul key={produto.idprod}>
                    <li>
                        Nome: {produto.nome_jogo}<br />
                        Vendas: {produto.vendprod}<br />
                        <br />
                        <br />
                    </li>
                </ul>
            ))}

            <h2>Miniatura</h2>
            {produtos.filter(produto => produto.catprod === 'miniatura').map(produto => (
                <ul key={produto.idprod}>
                    <li>
                        Nome: {produto.nome_jogo}<br />
                        Vendas: {produto.vendprod}<br />
                        <br />
                        <br />
                    </li>
                </ul>
            ))}

            <h2>Jogo de cartas</h2>
            {produtos.filter(produto => produto.catprod === 'jogo de cartas').map(produto => (
                <ul key={produto.idprod}>
                    <li>
                        Nome: {produto.nome_jogo}<br />
                        Vendas: {produto.vendprod}<br />
                        <br />
                        <br />
                    </li>
                </ul>
            ))}

            <h1>Itens vendidos por data</h1>
            <input
                type="text"
                placeholder="Data (DD/MM/AAAA)"
                value={dataSelecionada}
                onChange={handleDataChange}
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
