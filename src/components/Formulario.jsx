import { styled } from "styled-components";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas.js";
import { useEffect, useState } from "react";
import Error from '../components/Error'

const InputSubmit = styled.input`
  background-color: #9497ff;
  color: white;
  border: none;
  outline: none;
  width: 100%;
  padding: 10px;
  font-weight: 700;

  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background 0.5s ease-in-out;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

export default function Formulario({setMonedas}) {
  
  const [arrayCriptos, setArrayCriptos] = useState([]); //array con los objetos con la informacion de las criptos.
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas); //Desestructuro La funcion selectMonedas() del custom hook useSelectMonedas;
  // const [SelectCripto] = useSelectMonedas("Elige tu CriptoMoneda"); //Desestructuro La funcion selectMonedas() del custom hook useSelectMonedas y le adiciono otro nombre y otro valor incial;
  //STATE TIENE EL VALOR DE MONEDA YA SEA USD,EUR, ETC... QUE ES OTORGADO DESDE EL HOOK useSelectMonedas
  const [criptoMoneda, SelectCripto] = useSelectMonedas("Elige tu criptomoneda",arrayCriptos);


  useEffect(() => { //consume api para obtener todas las criptos
    async function consultarAPI() {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"; //CONSUMIMOS API DE CRIPTO
      const rta = await fetch(url);
      const data = await rta.json();

      const arrayCriptos = data.Data.map((cripto) => {
        //ESTE ARRAY TENDRA TODOS LOS OBJETOS QUE SE CREARAMNN ENM LA ITERACION

        const objeto = {
          //CREAMOS UN OBJETO CON LA EL NAME Y FULL NAME PARA CADA UNA DE LAS CRIPTOS.
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return objeto;
      });

      setArrayCriptos(arrayCriptos);
    }
    consultarAPI();
  }, []);




  //handle submit formulario
  function handleSubmit(e) { //DESPUES DE ELEGIRT LAS MONEDAS Y DARLE AL SUBMIT.
    e.preventDefault();
    if (moneda == "" || criptoMoneda == "") {
      setError(true);
      return;
    }
    setError(false);

    setMonedas({ //seteo las monedas en el objeto de APP MONEDAS
      moneda,
      criptoMoneda

    })

  }

  return (
    <>
      {error && <Error><p>Todos los campos son obligatorios</p></Error>}

      <form action="" onSubmit={handleSubmit}>
        <SelectMonedas />

        {/* <SelectCripto/> */}
        <SelectCripto />

        <InputSubmit value="Cotizar" type="submit" />

      </form>
    </>
  );
}
