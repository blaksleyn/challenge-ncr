import "./NuevaTransferencia.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function NuevaTransferencia({ idcliente }) {
  const { idcuenta } = useParams();
  const navigate = useNavigate();
  const [cuentas, setCuentas] = useState([]);
  const [nuevaTrans, setNuevaTrans] = useState({
    monto: "",
    cuenta_destino: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:1500/api/cuentas/" + idcliente)
      .then((res) => setCuentas(res.data))
      .catch((error) => alert(error.response.data.message));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:1500/api/transferencias/crearTransferencia/" +
          idcuenta,
        nuevaTrans
      )
      .then((res) => {
        alert("Transferencia realizada con éxito");
        navigate("/" + idcliente);
      })
      .catch((error) => alert(error.response.data.message));
  };
  const handleInput = (e) => {
    setNuevaTrans({
      ...nuevaTrans,
      [e.target.name]: +e.target.value,
    });
  };

  return (
    <div className="nuevaTransContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="monto">Monto:</label>
        <input
          type="number"
          name="monto"
          id="monto"
          value={nuevaTrans.monto}
          onChange={(e) => {
            handleInput(e);
          }}
        ></input>
        <select name="cuenta_destino" onChange={(e) => handleInput(e)}>
          <option value={""}>Seleccionar una cuenta</option>
          {cuentas?.map((cuenta) => {
            if (cuenta.id !== idcuenta) {
              return (
                <option value={cuenta.numero_cuenta}>
                  {cuenta.numero_cuenta}
                </option>
              );
            }
          })}
        </select>
        <button
          type="submit"
          disabled={nuevaTrans.monto === "" || nuevaTrans.cuenta_destino === ""}
        >
          Realizar transferencia
        </button>
      </form>
      <Link to={"/" + idcliente}>{"<< VOLVER"}</Link>
    </div>
  );
}
export default NuevaTransferencia;
