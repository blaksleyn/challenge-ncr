import "./ListadoTransferencias.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ListadoTransferencias() {
  const { idcliente } = useParams();
  const [listaTransferencias, setListaTransferencias] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1500/api/transferencias/" + idcliente)
      .then((res) => setListaTransferencias(res.data))
      .catch((error) => alert(error.response.data.message));
  }, []);
  return (
    <div className="transContainer">
      <table>
        <thead>
          <tr>
            <th>Numero de transferencia</th>
            <th>Cuenta Origen</th>
            <th>Cuenta Destino</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {listaTransferencias?.map((tra) => {
            return (
              <tr>
                <td>{tra.numero_transferencia}</td>
                <td>#{tra.cuenta_origen}</td>
                <td>#{tra.cuenta_destino}</td>
                <td>${tra.monto}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link className="LinkToHome" to={"/" + idcliente}>
        {"<< VOLVER"}
      </Link>
    </div>
  );
}
export default ListadoTransferencias;
