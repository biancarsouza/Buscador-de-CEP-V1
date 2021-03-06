import axios from "axios";
import { toast } from 'react-toastify';
import React, { useState, FormEvent } from "react";
import InputMask from "react-input-mask";
import { Container } from "./styles";

import 'react-toastify/dist/ReactToastify.min.css';

export function CEPInput(props: { onChange: React.ChangeEventHandler<HTMLInputElement> | undefined; value: string | number | readonly string[] | undefined; }) {

  const [cep, setCep] = useState('');

  const [code, setCode] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [adress, setAdress] = useState([]);

  async function handleSearchNewCep(event: FormEvent) {

    event.preventDefault();
    setCep('');

  };

  function searchCep() {
    axios.get(`https://ws.apicep.com/cep/${cep}.json`)
      .then((response) => {
        setCode(response.data.code);
        setState(response.data.state);
        setCity(response.data.city);
        setDistrict(response.data.district);
        setAdress(response.data.address);

        if (response.data.code === undefined) {
          toast.error("Digite um CEP válido.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'toast',
          });
          return;
        }

      })
  }
  
  return (

    <Container onSubmit={handleSearchNewCep}>

      <span>
        
        <InputMask mask="99999-999" placeholder="Digite aqui o CEP!" value={cep} className="input" onChange={event => setCep(event.target.value)} />
        <button type="submit" onClick={searchCep}>Buscar CEP</button>

      </span>

      <table>

        <thead>

          <tr>

            <th>CEP</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Rua</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>{code}</td>
            <td>{state}</td>
            <td>{city}</td>
            <td>{district}</td>
            <td>{adress}</td>

          </tr>

        </tbody>

      </table>

    </Container>

  );

}