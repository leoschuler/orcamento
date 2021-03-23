import '../styles/itemOrcamento.css'
import { useState, useContext} from 'react';
import { TiposOrcamentoContext, tipo } from '../contexts/TiposOrcamentoContext';
import { OrcamentoContext } from '../contexts/OrcamentoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faFileInvoiceDollar }  from '@fortawesome/free-solid-svg-icons'


export default function  NovoItemOrcamento() {
    const [add , setAdd] = useState(false);
    
    const [selectedTipo,setTipo] = useState("");

    const {tipos} = useContext(TiposOrcamentoContext);
    const  { addItem, calculaOrcamento  } = useContext(OrcamentoContext);

    /* const tipos:any = {
        "bolsa":{name:"Bolsas",img:"Bolsa.png"},
        "camiseta":{name:"Camisetas",img:"camiseta.png"},
        "caneca":{name:"Canecas",img:"Bolsa.png"},
    }*/
    
 
    if( !add ) {
        return (
                <li className="itemOrcamento novoItem">
                        
                            <button className="main-button" id="btn-adicionar" onClick={()=>{setAdd(true);}}><FontAwesomeIcon icon={faPlusCircle} /> Adicionar Item</button>
                            <button className="main-button" id="btn-finalizar" onClick={()=>{calculaOrcamento();}}><FontAwesomeIcon icon={faFileInvoiceDollar} /> Calcular Orçamento</button>
                        
                </li> 
        )
    } else if(selectedTipo === "") {
        return (
            <li className="novoItem selecionar">
                    {Object.keys(tipos).map(el=>{ return (
                        <button type="button" key={el} onClick={()=>{addItem(tipos[el].key);setAdd(false)}}>
                              <img alt={tipos[el].name} src={`imgs/${tipos[el].img}`} /><span>{tipos[el].name}</span>
                        </button>
                    )})}

            </li>
            
        );
     } else {
             const curTipo:tipo = tipos[selectedTipo];
             return (
                <li className="itemOrcamento novoItem selecionado">
                       <div>
                              <img alt={curTipo.name} src={`imgs/${curTipo.img}`} /><span>{curTipo.name}</span>
                              <button onClick={()=>{setTipo("");setAdd(false);}}>cancelar</button>
                        </div>
                </li>    
             )
     }

}