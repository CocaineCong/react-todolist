import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import List from "../pages/List";

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' ><App />
                <Route path='/list'><List /></Route>
            </Route>
            <Route path='/login'><Login /></Route>
            <Route path='/register'><Register/></Route>
        </Routes>
    </Router>
)

export default BaseRouter