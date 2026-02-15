import "./css/FiltroError.css";
import { MdOutlineEmail } from "react-icons/md";

const FiltroError = ({ status, error, message }) => {
    return (
        <div className="filtroError">
            <div className="containerError">
                <h1>ERROR <span className="status">{status}</span></h1>
                <p className="error">{error}</p>
                <p className="mensaje">{message}</p>
            </div>
            <div className="containerInformativo">
                <h3 className="infoTitulo">¿Por qué ocurre este error?</h3>
                <p>No debería de aparecer ningún error en el filtro. Si lo está viendo, podría deberse a:</p>
                <ul className="listaMotivos">
                    <li>Problemas de conexión a internet</li>
                    <li>El servidor está inactivo o no responde</li>
                    <li>Error temporal en la conexión con la fuente de datos (API)</li>
                    <li>Si no es ninguna de las anteriores, por favor, póngase en contacto con el desarrollador</li>
                </ul>
                <div className="contacto">
                    <MdOutlineEmail className="iconoEmail" />
                    <span>Contacto: elsodah12@gmail.com</span>
                </div>
            </div>
        </div>
    );
};

export default FiltroError;