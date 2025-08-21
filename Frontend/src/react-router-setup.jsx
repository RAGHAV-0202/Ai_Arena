import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Chat from "./pages/Chat"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import RedirectNewChat from "./pages/RedirectNewChat"

const ReactRouter = ()=>{
    return (
        <Router>
            <Routes>
                <Route path = "/"  element={<HomePage/>}/>
                <Route path = "/login"  element={<LoginPage/>}/>
                <Route path = "/register"  element={<RegisterPage/>}/>
                <Route path = "/chat"  element={<RedirectNewChat/>}/>
                <Route path = "/chat/:id"  element={<Chat/>}/>
            </Routes>
        </Router>
    )
}

export default ReactRouter