import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardCuenta from "../CardCuenta/CardCuenta";
import "./ListCuentas.css";

function ListCuentas() {
  const { idcliente } = useParams();
  const [listaCuentas, setListaCuentas] = useState([]);
  const [verMas, setVerMas] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:1500/api/cuentas/" + idcliente)
      .then((res) => setListaCuentas(res.data))
      .catch((error) => alert(error.response.data.message));
  }, []);
  const handlevermas = () => {
    setVerMas(!verMas);
  };
  return (
    <>
      <h3 className="h3">Consulta de saldo</h3>
      <h2 className="h3">Selecciona la Cuenta a Consultar</h2>
      <div className="listCardContainer">
        {listaCuentas?.map((cuenta, i) => {
          if (verMas === false) {
            if (i < 5) {
              return (
                <CardCuenta
                  numeroCuenta={cuenta.numero_cuenta}
                  tipoCuenta={
                    cuenta.tipo_cuenta?.substring(0, 1).toUpperCase() +
                    cuenta.tipo_cuenta?.substring(1, cuenta.tipo_cuenta?.length)
                  }
                  idcliente={idcliente}
                  idcuenta={cuenta.id}
                />
              );
            }
          } else {
            return (
              <CardCuenta
                numeroCuenta={cuenta.numero_cuenta}
                tipoCuenta={
                  cuenta.tipo_cuenta?.substring(0, 1).toUpperCase() +
                  cuenta.tipo_cuenta?.substring(1, cuenta.tipo_cuenta?.length)
                }
                idcliente={idcliente}
                idcuenta={cuenta.id}
              />
            );
          }
        })}
        {verMas === false ? (
          <button onClick={handlevermas}>Ver mas</button>
        ) : (
          <button onClick={handlevermas}>Ver menos</button>
        )}
      </div>

      <Link className="LinkTrans" to={"/transferencias/" + idcliente}>
        Ver mis Transferencias
      </Link>
    </>
  );
}

export default ListCuentas;
