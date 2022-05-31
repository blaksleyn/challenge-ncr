import { Link } from "react-router-dom";
import "./BotonInicio.css";

function BotonInicio({ link }) {
  return (
    <div className="containerboton">
      <Link className="boton" to={link}>
        <button>Ver mis cuentas</button>
      </Link>
    </div>
  );
}

export default BotonInicio;
