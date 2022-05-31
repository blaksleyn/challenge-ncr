// import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListCuentas from "./components/ListCuentas/ListCuentas";
import DetalleCuenta from "./components/DetalleCuenta/DetalleCuenta";
import NuevaTransferencia from "./components/NuevaTransferencia/NuevaTransferencia";
import ListadoTransferencias from "./components/ListadoTransferencias/ListadoTransferencias";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BotonInicio from "./components/BotonInicio/BotonInicio";
import "./App.css";

function App() {
  const [link, setLink] = useState("/");
  const [idcliente, setClienteId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:1500/api/cliente/")
      .then((res) => {
        setLink(link + res.data[0].id);
        setClienteId(res.data[0].id);
      })
      .catch((error) => alert(error.response.data.message));
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <img className="logo" src="pngegg.png" alt="Logo" />
        </header>
        <Routes>
          <Route exact path="/" element={<BotonInicio link={link} />} />
          <Route exact path="/:idcliente" element={<ListCuentas />} />
          <Route
            path="/detalle/:idcuenta/:idcliente"
            element={<DetalleCuenta />}
          />
          <Route
            path="/nuevaTransferencia/:idcuenta"
            element={<NuevaTransferencia idcliente={idcliente} />}
          />
          <Route
            path="/transferencias/:idcliente"
            element={<ListadoTransferencias />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
