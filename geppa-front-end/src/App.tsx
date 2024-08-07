import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import Header from './Presentation/Components/Header/Header.tsx';
import Footer from './Presentation/Components/Footer/Footer.tsx';
import Sidebar from './Presentation/Components/Sidebar/Sidebar.tsx';
import AdminBoletim from './Presentation/Pages/AdminUser/AdminBoletim/AdminBoletim.tsx';
import AdminAlunos from './Presentation/Pages/AdminUser/AdminAlunos/AdminAlunos.tsx';
import PaginaListaBoletins from './Presentation/Pages/CommonUser/ListaDeBoletins/PaginaListaBoletins.tsx';
import PaginaListaConteudos from './Presentation/Pages/CommonUser/ListaDeConteudos/PaginaListaConteudos.tsx';
import PaginaIndicadores from './Presentation/Pages/CommonUser/Indicadores/PaginaIndicadores.tsx';
import PaginaSobre from './Presentation/Pages/CommonUser/Sobre/Sobre.tsx';
import PaginaBoletim from './Presentation/Pages/CommonUser/Boletim/PaginaBoletim.tsx';
import PaginaNaoEncontrada from './Presentation/Pages/CommonUser/NotFound/PaginaNaoEncontrada.tsx';
import {PaginaLogin} from './Presentation/Pages/AdminUser/Login/PaginaLogin.tsx';
import PaginaInicial from './Presentation/Pages/CommonUser/Inicial/PaginaInicial.tsx';
import ListagemTags from "./Presentation/Pages/AdminUser/Tags/ListagemTags.tsx";
import PaginaCriacaoBoletim from "./Presentation/Pages/AdminUser/AdminCriarBoletim/PaginaCriacaoBoletim.tsx";
import PaginaUnsubscribeNewsletter from "./Presentation/Pages/CommonUser/Newsletter/PaginaUnsubscribeNewsletter.tsx";

function AdminRoutes() {
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return (
        <>
            <Sidebar/>
            <div style={{marginLeft: '280px'}}>
                <Routes>
                    <Route path="/" element={<AdminBoletim/>}/>
                    <Route path="criar-boletins" element={<PaginaCriacaoBoletim/>}/>
                    <Route path="aluno" element={<AdminAlunos/>}/>
                    <Route path="tags" element={<ListagemTags/>}/>
                    <Route path="boletins/:edicao" element={<PaginaCriacaoBoletim/>}/>
                </Routes>
            </div>
        </>
    );
}

function UserRoutes() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<PaginaInicial/>}/>
                <Route path="boletins" element={<PaginaListaBoletins/>}/>
                <Route path="conteudos/:filtro?" element={<PaginaListaConteudos/>}/>
                <Route path="indicadores" element={<PaginaIndicadores/>}/>
                <Route path="sobre" element={<PaginaSobre/>}/>
                <Route path="boletim/:edicao" element={<PaginaBoletim/>}/>
                <Route path="*" element={<PaginaNaoEncontrada/>}/>
                <Route path={"cancelamento-inscricao/:email"} element={<PaginaUnsubscribeNewsletter/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<PaginaLogin/>}/>
                <Route path="admin/*" element={<AdminRoutes/>}/>
                <Route path="/*" element={<UserRoutes/>}/>
            </Routes>
        </Router>
    );
}

export default App;
