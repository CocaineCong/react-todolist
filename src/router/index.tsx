import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import List from "../pages/List";

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/list' element={<List />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    </Router>
)

export default BaseRouter