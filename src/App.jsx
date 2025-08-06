import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path={'pricing'} element={<Pricing />} />
                <Route path={'product'} element={<Product />} />
                <Route path={'login'} element={<Login />} />
                <Route path={'app'} element={<AppLayout />} >
                    <Route index element={<p> List of cities</p>} />
                    <Route path={'cities'} element={<p>List of cities</p>}/>
                    <Route path={'countries'} element={<p>Countries</p>}/>
                    <Route path={'form'} element={<p>Form</p>}/>
                </Route>
                <Route path={'*'} element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;