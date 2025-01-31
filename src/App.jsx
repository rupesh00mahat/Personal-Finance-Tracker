import "./App.css";
import PFTContextProvider from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./ui/home-page/home";
import ProtectedRoutes from "./ui/home-page/ProtectedRoutes";
import Login from "./ui/login/login";

function App() {
  return (
    <>
      <PFTContextProvider>
        <BrowserRouter>
          <Routes>
            <Route  element={<ProtectedRoutes/>}>
              <Route path="/dashboard" element={<Home/>}/>
            </Route>
            <Route path="/" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </PFTContextProvider>
      {/* <Login/> */}
    </>
  );
}

export default App;
