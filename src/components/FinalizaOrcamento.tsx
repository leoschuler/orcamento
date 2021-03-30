import '../styles/FinalizaOrcamento.css'
import { useContext} from 'react';
import {formataMoeda} from '../util/util';
import { OrcamentoContext } from '../contexts/OrcamentoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileInvoice , faPaperPlane}  from '@fortawesome/free-solid-svg-icons'


export default function  FinalizaOrcamento() {
 
    const  { editarOrcamento, totalOrcamento } = useContext(OrcamentoContext);

    /* const tipos:any = {
        "bolsa":{name:"Bolsas",img:"Bolsa.png"},
        "camiseta":{name:"Camisetas",img:"camiseta.png"},
        "caneca":{name:"Canecas",img:"Bolsa.png"},
    }*/
    
    
 
    return (<>

                <li className="itemOrcamento" id="total-orcamento">
                        <h1 className="titulo">Total</h1>
                        <h1 className="valor-item-orcamento">{formataMoeda(totalOrcamento)}</h1>
                </li> 
                <li className="itemOrcamento" id="actions-total-orcamento">
                    <button className="main-button" id="btn-editar" onClick={editarOrcamento}><FontAwesomeIcon icon={faFileInvoice} />Editar Orçamento</button>
                    {false && (<button className="main-button" id="btn-finalizar"><FontAwesomeIcon icon={faPaperPlane} />Enviar Por Email</button>)}                    
                </li> 
        </>
        )
    

}