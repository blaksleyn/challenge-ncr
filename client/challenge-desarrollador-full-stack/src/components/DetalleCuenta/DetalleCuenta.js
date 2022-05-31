import "./DetalleCuenta.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DetalleCuenta() {
  const { idcuenta, idcliente } = useParams();
  const [cuenta, setCuenta] = useState({});
  useEffect(() => {
    axios
      .get(
        "http://localhost:1500/api/cuentas/cuentaById/" +
          idcuenta +
          "/" +
          idcliente
      )
      .then((res) => {
        setCuenta(res.data);
      })
      .catch((error) => alert(error.response.data.message));
  }, []);

  return (
    <div className="detalleContainer">
      <h2>
        Tipo de Cuenta: {cuenta.tipo_cuenta?.substring(0, 1).toUpperCase()}
        {cuenta.tipo_cuenta?.substring(1, cuenta.tipo_cuenta?.length)}
      </h2>
      <h2>Numero de cuenta: #{cuenta.numero_cuenta}</h2>
      <h2>Saldo : ${cuenta.saldo}</h2>
      <Link className="LinkTrans" to={"/nuevaTransferencia/" + idcuenta}>
        Nueva transferencia
      </Link>
      <Link to={"/" + idcliente}>{"<< VOLVER"}</Link>
    </div>
  );
}
export default DetalleCuenta;
