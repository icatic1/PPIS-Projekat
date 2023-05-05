import "./App.css";
import Login from "./components/shared/login";
import Home from "./components/shared/home";
import PrivateRoute from "./components/shared/privateroute";
import {Routes,Route} from "react-router-dom";
import { useState } from "react";

function App() {
  const [user,setUser] = useState();


  return (
    <div>
    <Routes>
      <Route
        path="/"
        element= {<PrivateRoute />}
      >
        <Route path="/" element={<Home ></Home>}></Route>
        </Route>
      <Route
        path="/login"
        element= {<Login></Login>}
      />
    </Routes>
    </div>
  );
}

export default App;
