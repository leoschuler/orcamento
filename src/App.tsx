import './styles/global.css';
import  './App.css';
import ListaOrcamento from './components/ListaOrcamento';
import { TiposOrcamentoProvider } from './contexts/TiposOrcamentoContext';
import {OrcamentoProvider} from './contexts/OrcamentoContext';
import EditItem from './components/EditItem';

function App() {
  return (
    <div className="mainContainer">
      <header>
        <img src="imgs/logo.png" alt="logo do SeuBrinde" />
      </header>
      <main>
        <TiposOrcamentoProvider>
          <OrcamentoProvider>
            <ListaOrcamento />
            <EditItem />
          </OrcamentoProvider>
        </TiposOrcamentoProvider>
        
      </main>
    </div>
  );
}
//"homepage":"https://seubrinde.com.br/orcamento",
export default App;
