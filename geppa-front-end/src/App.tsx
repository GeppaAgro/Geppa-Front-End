import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./Presentation/Components/Header/Header.tsx";
import PaginaInicial from "./Presentation/Pages/CommonUser/Inicial/PaginaInicial.tsx";
import PaginaSobre from "./Presentation/Pages/CommonUser/Sobre/Sobre.tsx";
import PaginaListaConteudos from "./Presentation/Pages/CommonUser/ListaDeConteudos/PaginaListaConteudos.tsx";
import PaginaIndicadores from "./Presentation/Pages/CommonUser/Indicadores/PaginaIndicadores.tsx";
import Footer from "./Presentation/Components/Footer/Footer.tsx";
import PaginaListaBoletins from "./Presentation/Pages/CommonUser/ListaDeBoletins/PaginaListaBoletins.tsx";


function App() {

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<PaginaInicial/>}/>
                    <Route path="/boletins" element={<PaginaListaBoletins/>}/>
                    <Route path="/conteudos" element={<PaginaListaConteudos/>}/>
                    <Route path="/indicadores" element={<PaginaIndicadores/>}/>
                    <Route path="/sobre" element={<PaginaSobre/>}/>
                </Routes>
                <Footer/>
            </Router>
        </>
    )
}

export default App
