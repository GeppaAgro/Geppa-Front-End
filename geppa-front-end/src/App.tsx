import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./Presentation/Components/Header/Header.tsx";
import PaginaInicial from "./Presentation/Pages/CommonUser/Inicial/PaginaInicial.tsx";
import PaginaSobre from "./Presentation/Pages/CommonUser/Sobre/Sobre.tsx";
import PaginaListaConteudos from "./Presentation/Pages/CommonUser/ListaDeConteudos/PaginaListaConteudos.tsx";
import PaginaIndicadores from "./Presentation/Pages/CommonUser/Indicadores/PaginaIndicadores.tsx";
import PaginaBoletim from "./Presentation/Pages/CommonUser/Boletim/PaginaBoletim.tsx";
import Footer from "./Presentation/Components/Footer/Footer.tsx";
import PaginaListaBoletins from "./Presentation/Pages/CommonUser/ListaDeBoletins/PaginaListaBoletins.tsx";
import React from "react";
import AdminInicial from "./Presentation/Pages/AdminUser/AdminInicial/AdminInicial.tsx";
import Sidebar from "./Presentation/Components/Sidebar/Sidebar.tsx";

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
                    <Route path="/boletim/:edicao" element={<PaginaBoletim/>}/>
                    <Route path="/"/>
                </Routes>
                <Footer/>
            </Router>
            <Router>
                <Sidebar />
                <Routes>
                    { //<Route path="/admin/auth" element={<AdminLogin/>}/> }
                    <Route path="/admin/" element={ <AdminInicial/> }/>
                    { //<Route path="/admin/boletins" element={<AdminBoletins/>}/> }
                    { //<Route path="/admin/criar-boletins" element={<AdminCriarBoletins/>}/> }
                    { //<Route path="/admin/perfil" element={<AdminPerfil/>}/> }
                    { //<Route path="/admin/aluno" element={<AdminAlunos/>}/> }
                    { //<Route path="/admin/"/> };
                </Routes>
            </Router>
        </>
    )
}

export default App
