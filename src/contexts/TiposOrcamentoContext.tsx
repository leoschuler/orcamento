import { createContext ,  ReactNode} from 'react';
import tiposJSON from './configOrcamento.json';

interface TiposOrcamentoProps {
    children: ReactNode;
}
export interface attribute {
    key:string;
    label:string;
    type:string;
    cost_var?:number | boolean;
    options?:{value:string | string,text:string, cost_var?:number}[];
}
export interface tipo {
    key:string;
    name:string;
    img:string;
    attr:attribute[];
    bulk_value:{qtd:number,valor:number}[];
}


interface dictionary {
    [key:string]:tipo;
}

interface TiposOrcamentoContextData {
    tipos:dictionary;
}

export const TiposOrcamentoContext = createContext({} as TiposOrcamentoContextData);

export function TiposOrcamentoProvider ({ children, ...rest }:TiposOrcamentoProps) {
    return (
        <TiposOrcamentoContext.Provider 
            value={{ 
                tipos:tiposJSON
            }}
        >
            {children}
        </TiposOrcamentoContext.Provider>
    )
}