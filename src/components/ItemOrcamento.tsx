import { itemOrcamentoProps } from "./commonInterfaces"
import '../styles/itemOrcamento.css'
import { TiposOrcamentoContext } from '../contexts/TiposOrcamentoContext';
import { OrcamentoContext } from '../contexts/OrcamentoContext';
import React, {useContext} from 'react';
import {formataMoeda} from '../util/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faTrashAlt}  from '@fortawesome/free-solid-svg-icons'


export default function  ItemOrcamento(props:itemOrcamentoProps) {
        const {tipos} = useContext(TiposOrcamentoContext)
        const {removeItem,selectItem,orcamentoPronto} = useContext(OrcamentoContext)
        const itemDef = tipos[props.tipo]
       // const qtd = itemDef.attr.filter(i=>i.type==="grade").map(a=>props.attr[a.key]).reduce((soma,valor)=>parseInt(soma)+parseInt(valor));
        const clickHandler = orcamentoPronto?undefined:(e:React.MouseEvent)=>{e.stopPropagation();selectItem(props.index);}
        
    return (
            <li className="itemOrcamento" onClick={clickHandler}>
                    {!orcamentoPronto&& props.editmode && (
                            <div className={`editLayer ${props.active?"active":undefined}`}></div>
                    )}
                    <div className="thumb">
                        <img src={`imgs/${itemDef.img}`} alt={props.tipo} className="itemThumb"></img>
                    </div>
                    <div>
                            <h1>{itemDef.name}</h1>                            
                            <dl className="item-propriedades">
                                <dt className={`item-qtd ${props.qtd===0?"alert":undefined}`}>Qtd:</dt>
                                <dd className={`item-qtd ${props.qtd===0?"alert":undefined}`}>{props.qtd}</dd>
                               { props.attr.cor && (<><dt className="item-cor">Cor:</dt>
                                <dd className="item-cor">{props.attr.cor} </dd></>)}
                            </dl> 
                            
                    </div>
                    {orcamentoPronto && (
                            <div className="valor-item-orcamento">
                                    {formataMoeda(props.valor_orcamento)}
                            </div>
                    )}

                    {!orcamentoPronto && !props.editmode && (
                    <div className="actions">
                        <button className="remove" onClick={(e)=>{e.stopPropagation();removeItem(props.index);}}><FontAwesomeIcon icon={faTrashAlt} /></button>
                        <button className="edit" onClick={clickHandler}><FontAwesomeIcon icon={faPen} /></button>
                        
                    </div>)}
                   
            </li>
   
    )
}