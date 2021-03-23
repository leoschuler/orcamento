import { OrcamentoContext } from '../contexts/OrcamentoContext';
import {useContext} from 'react';
import '../styles/grade.css'
interface GradFieldProps {
        label:string;
        value:string | number;
        index:number;
        name:string;
        updateAttr:any;
}


export default function  GradeField( props:GradFieldProps) {        
        const { updateGrade } = useContext(OrcamentoContext)
        const changeValue = ( v:number ) => {
                console.log(v)
                const campo = (document.getElementById(props.name) as HTMLInputElement);
                if( !campo ) return null;

                const newValue = Math[v>0?"min":"max"](v>0?100:0, parseInt(campo.value) + v ).toString()
                updateGrade(props.name, parseInt(campo.dataset.index?campo.dataset.index:"0") , newValue);
        }

        return (
                <>
                <label key={props.name} className="gradeField">
                        <span className="label-text">{props.label}:</span>
                        <span className="button-wrapper">
                                <button type="button" key="button_m_10" onClick={changeValue.bind(null,-10)}>-10</button>
                                <button type="button" key="button_m_1" onClick={changeValue.bind(null,-1)}>-1</button>
                                <input
                                        id={props.name}
                                        min={0}
                                        max={100}
                                        type="number" 
                                        data-index={props.index}
                                        name={props.name}
                                        value={props.value}
                                        onChange={props.updateAttr}               
                                />    
                                <button type="button" key="button_p_1" onClick={changeValue.bind(null,1)}>+1</button>
                                <button type="button" key="button_p_10" onClick={changeValue.bind(null,10)}>+10</button>
                        </span>
                </label>
                </>
        )
}