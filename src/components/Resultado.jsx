import {styled} from 'styled-components';

const ContenedorResultado = styled.div`
color: #FFF;
display: flex;
flex-direction: column;
grid-column: 2;
grid-row: 2;
width: 100%;
align-items: center;
justify-content: center;
padding: 0 0 5rem  0;
@media(min-width: 480px){
    flex-direction: row;
    
}
`

const Texto = styled.p`
font-size: 15px;
span{
    font-weight: 700;
}
`

const Precio = styled.p`
font-size: 19px;
span{
    font-weight: 700;
}

`

const Imagen = styled.img`
display:block;
gap: 3rem;
object-fit: cover;
width: 100px;
justify-content: space-evenly;
margin: 2rem;
`

    

export default function Resultado({cotizacion}){
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,IMAGEURL,LASTUPDATE} = cotizacion;
    return(
        <ContenedorResultado>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`}  alt="Imagen cripto" />
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center"}}>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Texto>El precio mas alto del dia es de: <span>{HIGHDAY}</span></Texto>
            <Texto>El precio mas bajo es de de: <span>{LOWDAY}</span></Texto>
            <Texto>Variacion últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Ultima actualizacion<span>{LASTUPDATE}</span></Texto>
            </div>
        </ContenedorResultado>
    )
}