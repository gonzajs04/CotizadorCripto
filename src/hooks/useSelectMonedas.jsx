import { styled } from "styled-components";
import {useState} from 'react'
export default function useSelectMonedas(label, monedas) {

  const SelectMonedasStyled = styled.select`
    padding: .8rem 2rem;
    width: 100%;
    background-color: #000000c0;
    border-radius: 10px;
    color: white;
    border: none;
    margin: 2rem 0;
    font-size: 16px;
    font-weight: 700;
  `;
  const [state,setState] = useState(''); //ALMACENA REFERENCIA A UN SELECT REUTILIZABLE


  //LOS HOOKS RETORNAR OBJETOS U ARREGLOS
  const SelectMonedas = () => {
    return (
      <>
        <label style={{ display: "block" }}>{label}</label>
          <SelectMonedasStyled value={state} onChange={e=>setState(e.target.value)}> {/**SELECT DE MONEDAS TIENE COMO VALOR LA MONEDA Y AL REALIZARSE UN CAMBIO, SE SETEA EL VALOR DE LA MONEDA QUE EL USUARIO CAMBIO DEL SELECT */}

              <option value="">Seleccione</option>
              {monedas.map((moneda) => (
            
                    <option key={moneda.id} value={moneda.id}>
                      {moneda.nombre}
                    </option>
              ))}
        </SelectMonedasStyled>
      </>
    );
  };

  return [state, SelectMonedas]; //Retorno SelectMonedas para poder usarlo en otro componente y la moneda(STATE), USD, BTC, SOL, ETH,ARG, PESO, CAKE, ETC...
}
