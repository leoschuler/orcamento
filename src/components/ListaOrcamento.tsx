import { itemOrcamentoProps } from "./commonInterfaces";
import {useContext} from 'react';
import ItemOrcamento from "./ItemOrcamento";
import NovoItemOrcamento from "./NovoItemOrcamento";
import FinalizaOrcamento from "./FinalizaOrcamento"
import '../styles/listaOrcamento.css'
import { OrcamentoContext } from '../contexts/OrcamentoContext';



interface ListaOrcamentoProps {
    items?: [item:itemOrcamentoProps];
}
export default function  ListaOrcamento(props:ListaOrcamentoProps) {
    const  { items, selectedIndex , orcamentoPronto } = useContext(OrcamentoContext);
    return (
        <section id="listaOrcamento" className={selectedIndex!==-1?undefined:"active"}>
        <ul>
            {items.map( (el,index) => {
                return (
                    <ItemOrcamento 
                        key={index}
                        active={index===selectedIndex}
                        index={index}
                        tipo={el.tipo}
                        attr={el.attr}
                        qtd={el.qtd}
                        valor_orcamento={el.valor_orcamento}
                        editmode={selectedIndex!==-1}
                     />
                )
            })}           
            {!orcamentoPronto && <NovoItemOrcamento />}
            {orcamentoPronto && <FinalizaOrcamento />}
            
        </ul>
        </section>
    )
}