import { createContext , useState, ReactNode, useContext, ChangeEvent} from 'react';
import {TiposOrcamentoContext} from './TiposOrcamentoContext';

interface OrcamentoProps {
    children: ReactNode;
}
interface attrValues {
    [key:string]: string;
} 
export interface item {
    tipo:string;
    attr:attrValues;
    qtd:number;
    valor_orcamento:number;
}

interface OrcamentoContextData {
    items:item[];
    selectedItem:null|item;
    selectedIndex:number;    
    orcamentoPronto:boolean;
    isSelected:()=>boolean;
    addItem:(key: string, autoSelect?: boolean)=>item ;
    selectItem:( index:number )=>null|item;
    removeItem:(index:number)=>void;    
    updateAttr:(e:ChangeEvent)=>void;
    updateGrade:(attrname:string,index:number,value:string)=>void;
    calculaOrcamento:()=>void;
    editarOrcamento:()=>void;
    totalOrcamento:number;
}

interface CalculoPorTipoInterface {
    [key:string]:{qtd:number,unitario:number};
}

export const OrcamentoContext = createContext({} as OrcamentoContextData);

export function OrcamentoProvider ({ children, ...rest }:OrcamentoProps) {
    const [selectedItem,setSelectedItem] = useState<item|null>(null)
    const [selectedIndex,setSelectedIndex] = useState(-1)
    const [items,setItems] = useState<Array<item>>([]);
    const [orcamentoPronto, setOrcamentoPronto] = useState(false);
    const [totalOrcamento, setTotalOrcamento] = useState(0);
        
    
    const isSelected = ()=>selectedItem !== null;
    const { tipos } = useContext(TiposOrcamentoContext)
    
    const addItem = ( key:string , autoSelect:boolean = true):item => {
        
        const newAttr:attrValues= {};
        tipos[key].attr.forEach(t => { newAttr[ t.key ] = t.type==="grade"?"0":(t.options?t.options[0].value:"") });
        const newItem:item = {tipo:key , attr: newAttr, qtd:0, valor_orcamento:0};        
        const newSelected = items.length
        setItems([...items,newItem]);
        if( autoSelect ) {
            setSelectedItem(newItem);
            setSelectedIndex(newSelected)
        }
        return newItem;
    }
    
    const updateGrade = (attrname:string,index:number,value:string) => {
        const newItems = [...items];        
        newItems[index].attr[attrname] = value;
        const itemDef = tipos[newItems[index].tipo];        
        const qtd = itemDef.attr
            .filter(i=>i.type==="grade") //obtem todas as opcoes de grade
            .map(a=>newItems[index].attr[a.key]) //pega as quantidades atribuidas a cada grade
            .reduce((soma,valor)=>soma+parseInt(valor),0)  //soma todas as quantidades individuais
        newItems[index].qtd = qtd;
        setItems(newItems);
    }
    const updateAttr = (e:ChangeEvent) => {
        
        if (!(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLSelectElement)) {
            return;
          }
        const newItems = [...items];
        const vIndex:string = e.target.dataset.index || "0"
        newItems[parseInt(vIndex)].attr[e.target.name] = e.target instanceof HTMLInputElement?e.target.value:e.target.options[e.target.selectedIndex].value;
        setItems(newItems);
        
        

    }
    const selectItem = ( index: number ) => {
        if( index > -1 && index < items.length ) {
            setSelectedIndex(index);
            setSelectedItem(items[index]);
            return items[index];
        
        } else {
            setSelectedIndex(-1);
            setSelectedItem(null);    
            return null;
        }
        
        
    }

    const removeItem = (index: number):void => {
        if( index > -1 && index < items.length ) {
            items.splice(index,1);
            setItems([...items]);
            setSelectedItem(null);
            setSelectedIndex(-1);
        }
    }

    const editarOrcamento = () => {
        setOrcamentoPronto(false);
    }

    const calculaOrcamento = () => {
        
        
        const TipoNoOrcamento = new Set( items.map(i=>i.tipo));
        const CalculoPorTipo:CalculoPorTipoInterface = {};
        
        const newItems = [...items]

        TipoNoOrcamento.forEach(t=>CalculoPorTipo[t]={qtd:0,unitario:0});
        
        newItems.forEach( _item => {
            CalculoPorTipo[_item.tipo].qtd += _item.qtd
        });

        TipoNoOrcamento.forEach( t=>{
            const tabela = tipos[t].bulk_value.filter(bv=>CalculoPorTipo[t].qtd >= bv.qtd)
            
            CalculoPorTipo[t].unitario = tabela.length>1?tabela.slice(-1)[0].valor:0;
        })
        
        //const custoPorItem =
        newItems.map( _item => { 
            
            const itemDef = tipos[ _item.tipo ];
            const attrComVarCusto = 
                itemDef.attr.filter(i=>i.cost_var === true) //somente atributos com custo variavel (sem contar grade)
                .map( attr=> { 
                    const opcao_escolhida = _item.attr[attr.key]
                    return attr.options && {label:attr.label, ...attr.options.find(opt=>opt.value === opcao_escolhida )};
                    }) //retorna somente a variacao da opcao escolhida
                .filter( opt => opt && opt.cost_var !== undefined ) //retorna somente se opcao escolhida tiver custo variavel
            
            
            const var_unitario = attrComVarCusto.reduce((soma, valor)=>soma+(valor !== undefined && valor.cost_var?valor.cost_var:0),0);

            const var_grade = itemDef.attr.filter(i=>i.type === "grade" && typeof i.cost_var == "number" && _item.attr[i.key] !== "0")
                    .map( grade=>{ 
                        const custo_var:number = typeof grade.cost_var  === "number"?grade.cost_var:0; 
                        const qtd:number = parseInt(_item.attr[grade.key])
                        return {
                            label:grade.label,
                            var_unitario:custo_var,
                            var_total:(qtd*custo_var),
                        }
                    });
                    
            
            const custoDoItem = {unitario_original:CalculoPorTipo[_item.tipo].unitario, variacoes:attrComVarCusto, var_unitario: var_unitario, var_grade:var_grade, total:0}

            custoDoItem.total = _item.qtd*(custoDoItem.unitario_original + custoDoItem.var_unitario) + custoDoItem.var_grade.reduce((soma, valor)=>soma+(valor !== undefined && valor.var_total?valor.var_total:0),0);

            _item.valor_orcamento = custoDoItem.total;

            return custoDoItem;
        });
        
            
            setTotalOrcamento( newItems.reduce( (soma,_item) => soma+_item.valor_orcamento , 0 ))
            setItems(newItems);            
            setOrcamentoPronto(true);
        /*
            const itemDef = tipos[t];
            const grades = itemDef.attr.filter(i=>i.type==="grade");

            items
                .filter(i=>i.tipo===t)
                .map(i=>i)

        */
/*
         items.for.map(i=>i.tipo).unique();
        itemDef.attr.filter(i=>i.type==="grade").map(a=>props.attr[a.key]).reduce((soma,valor)=>parseInt(soma)+parseInt(valor));
        */
    }

    return (
        <OrcamentoContext.Provider 
            value={{ 
                items,
                selectedItem,
                selectedIndex,
                isSelected,
                addItem,
                selectItem,
                removeItem,
                updateAttr,
                updateGrade,
                calculaOrcamento,
                orcamentoPronto,
                editarOrcamento,
                totalOrcamento
            }}
        >
            {children}
        </OrcamentoContext.Provider>
    )
}