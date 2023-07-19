import { useEffect, useState } from 'react'
import {styled} from 'styled-components'
import ImagenCripto from './img/imagen-criptos.png'
import Spinner from './components/Spinner.jsx'
import Formulario from './components/Formulario.jsx'
import Resultado from './components/Resultado.jsx'


const Heading = styled.h1`
  font-size:2rem;
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin: 100px 0 0px 0;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;

  }

`

const Contenedor = styled.div`
position: relative;
max-width: 900px;
margin: 0 auto;
width:95%;
height: 100dvh;
@media(min-width:992px){
  display:grid;
  grid-template-columns: repeat(2,1fr);
  column-gap:2rem;
}
`

const Imagen = styled.img`
max-width:400px;
width:80%;
margin:100px auto 0 auto;
display:block;
`


function App() {

  const [monedas,setMonedas] = useState({});
  const[cotizacion,setCotizacion] = useState({});
  const [cargando,setCargando] = useState(false);

  useEffect(()=>{ //DESPUES DE OBTENER LAS MONEDAS DEL FORMULARIO BUSCO EN LA API LA INFO CORRESPONDIENTE
    if(Object.keys(monedas).length>0){
      async function cotirzarCripto(){

        setCargando(true);
        setCotizacion({})

        const {moneda,criptoMoneda} = monedas;
        const url  = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const resultado = await fetch(url);
        const data = await resultado.json();
        // console.log("🚀 ~ file: App.jsx:58 ~ cotirzarCripto ~ data:", data.DISPLAY[criptoMoneda][moneda]) //busco las propiedades o valores que tenga la moneda y criptomoneda
        setCotizacion(data.DISPLAY[criptoMoneda][moneda]) //seteo los datos de la cotizacion de las monedas en un state de Objeto
        setCargando(false)
      }

      cotirzarCripto();
    }

  },[monedas])

  return (
    <>
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes criptos"/>

      <div className="form-cripto">
      <Heading>Cotiza Criptomonedas al Instante</Heading>


      <Formulario
       setMonedas = {setMonedas}
      />   

      </div>

    {cargando && <Spinner/>}
     {Object.keys(cotizacion).length>0 && //verifico si el objeto tiene valores
      <Resultado
        cotizacion = {cotizacion}
      />
     }

     

    </Contenedor>

    </>
  )
}

export default App
