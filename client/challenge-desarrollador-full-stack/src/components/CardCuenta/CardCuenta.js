import "./CardCuenta.css";
import { Link } from "react-router-dom";
function CardCuenta({ numeroCuenta, tipoCuenta, idcliente, idcuenta }) {
  return (
    <div className="cardContainer">
      <Link className="link" to={"/detalle/" + idcuenta + "/" + idcliente}>
        <h3>{tipoCuenta}</h3>
        <h3>Numero: {numeroCuenta}</h3>
      </Link>
    </div>
  );
}
export default CardCuenta;
