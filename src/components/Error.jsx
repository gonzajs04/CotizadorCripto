import {styled} from 'styled-components'
const Texto = styled.div`
    margin: 1rem 0;
    background-color: #B7322C;
    color: white;
    padding: 15px;
    font-size: 15px;
    text-transform: uppercase;
    text-align: center;
`
export default function Error({children}){
return(
    <Texto>{children}</Texto>
)
}