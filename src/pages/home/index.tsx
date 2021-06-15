/* eslint-disable jsx-a11y/label-has-associated-control */
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, Tabela } from './styles';

interface ICliente {
  id: string;
  cliente: string;
  telefone: string;
  email: string;
}

interface INovoCliente {
  cliente: string;
  telefone: string;
  email: string;
}

const Home: React.FC = () => {
  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [clientes, setClientes] = useState<ICliente[]>([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/clients',
    })
      .then((response: AxiosResponse<ICliente[]>) => {
        setClientes(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  function submitForm(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    /* criando o objeto disciplina para poder adicionar no array e tipando com Idisciplina */
    const obj: INovoCliente = {
      cliente,
      telefone,
      email,
    };

    axios({
      method: 'post',
      url: 'http://localhost:3333/clients',
      data: obj,
    })
      .then((response: AxiosResponse<ICliente>) => {
        const novoCliente: ICliente = {
          id: response.data.id,
          cliente: response.data.cliente,
          telefone: response.data.telefone,
          email: response.data.email,
        };
        setClientes([...clientes, novoCliente]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function deletarCliente(clienteID: string): void {
    axios({
      method: 'delete',
      url: `http://localhost:3333/clients/${clienteID}`,
    })
      .then((response: AxiosResponse<ICliente>) => {
        const novosClientes = clientes.filter(cl => {
          return cl.id !== clienteID;
        });
        setClientes(novosClientes);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <h1>AVD 2</h1>

      {/* formulario pra poder cadastrar a disciplina e no evento de submit do form ele chama uma função */}
      <Form onSubmit={submitForm}>
        <label>Seu Cliente:</label>
        <input
          placeholder="Digite seu cliente"
          value={cliente}
          onChange={(e: any) => {
            setCliente(e.target.value);
          }}
        />

        {/* value representa o valor do input quando e iniciado  */}
        {/* onchange vai refletir o valor do input na variavel  */}
        <label>telefone:</label>
        <input
          placeholder="Digite seu telefone"
          value={telefone}
          onChange={(e: any) => {
            setTelefone(e.target.value);
          }}
        />

        <label>Seu E-mail:</label>
        <input
          placeholder="Digite seu email"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit">Cadastrar Cliente</button>
      </Form>

      <Tabela>
        <thead>
          <tr>
            <td>nome</td>
            <td>telefone</td>
            <td>email</td>
            <td> </td>
          </tr>
        </thead>

        <tbody>
          {clientes.map(item => {
            return (
              <tr key={item.id}>
                <td> {item.cliente} </td>
                <td> {item.telefone} </td>
                <td> {item.email} </td>
                <td>
                  <button type="button">
                    <Link to={`/editar/${item.id}`}>Alterar</Link>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deletarCliente(item.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tabela>
    </Container>
  );
};

export default Home;
