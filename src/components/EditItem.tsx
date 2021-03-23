import '../styles/editItem.css'
import { TiposOrcamentoContext } from '../contexts/TiposOrcamentoContext';
import { OrcamentoContext } from '../contexts/OrcamentoContext';
import GradeField from '../components/GradeField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faTrashAlt }  from '@fortawesome/free-solid-svg-icons'
import {useContext} from 'react';

export default function  EditItem() {
        const {tipos} = useContext(TiposOrcamentoContext)
        const {selectedItem, isSelected, selectItem, selectedIndex,updateAttr,orcamentoPronto, removeItem} = useContext(OrcamentoContext)
       

        if(!orcamentoPronto && isSelected() && selectedItem) {
                
                const itemDef = tipos[selectedItem.tipo]
                const gradeDef = itemDef.attr.filter(el=>el.type==="grade")
                const persDef = itemDef.attr.filter(el=>el.type==="personalizacao")
                const prodDef = itemDef.attr.filter(el=>el.type==="produto")
                
                return (
                        <section id="EditPane" className="active">
                                <h1 id="EditTitle"><img src={`imgs/${itemDef.img}`} alt={itemDef.name} /> {itemDef.name}</h1>
                                
                                { prodDef.length>0 && (
                                <fieldset className="gradeEdit">
                                        <legend>Detalhes do Produto</legend>
                                        {
                                                
                                                prodDef.map(g=>{
                                                        return (
                                                                <label key={g.key} >
                                                                        <span className="label-text">{g.label}</span>
                                                                        <select name={g.key} onChange={updateAttr} data-index={selectedIndex} value={selectedItem.attr[g.key]}>
                                                                                {!!g.options && g.options.map((op,ind)=>{
                                                                                        return (
                                                                                                <option value={op.value} key={ind}> {/*selected={selectedItem.attr[g.key].toString() === op.value.toString()?true:undefined}*/}
                                                                                                        {op.text}
                                                                                                </option>
                                                                                        )
                                                                                })}
                                                                        </select>
                                                                </label>                                                                
                                                                )
                                                })
                                        }
                                </fieldset>)}


                                { gradeDef.length>0 && (
                                <fieldset className="gradeEdit">
                                        <legend>Grade/Quantidade</legend>
                                        {
                                                
                                                gradeDef.map(g=>{
                                                        return (
                                                                <GradeField 
                                                                        index={selectedIndex}
                                                                        label={g.label}
                                                                        name={g.key}
                                                                        value={selectedItem.attr[g.key]}
                                                                        updateAttr={updateAttr}
                                                                />
                                                                
                                                                )
                                                })
                                        }
                                </fieldset>)}

                                { persDef.length>0 && (
                                <fieldset className="gradeEdit">
                                        <legend>Detalhes da personalizacao</legend>
                                        {
                                                
                                                persDef.map(g=>{
                                                        return (
                                                                <label key={g.key} >
                                                                        <span className="label-text">{g.label}</span>
                                                                        <select name={g.key} onChange={updateAttr} data-index={selectedIndex} value={selectedItem.attr[g.key]}>
                                                                                {!!g.options && g.options.map((op,ind)=>{
                                                                                        return (
                                                                                                <option value={op.value} key={ind}>
                                                                                                        {op.text}
                                                                                                </option>
                                                                                        )
                                                                                })}
                                                                        </select>
                                                                </label>                                                                
                                                                )
                                                })
                                        }
                                </fieldset>)}



                                

                                <div className="actions">
                                        <button type="button" id="action-voltar" className="main-button" onClick={()=>selectItem(-1)}><FontAwesomeIcon icon={faChevronCircleLeft} />Voltar</button>                                        
                                        <button type="button" id="action-remover" className="main-button" onClick={(e)=>{e.stopPropagation();removeItem(selectedIndex);}}><FontAwesomeIcon icon={faTrashAlt} />Remover</button>                                        
                                </div>
                        </section>
                
                )
        } else {
                return (
                        <section id="EditPane">
                                <h1>Selecione um item do orçamento</h1>
                        </section>
                
                )
        }
}