import React from "react";

import styles from "./Login.module.css";

export const Login = () => {
    return (
        <div className="container justify-content-center" style={{ height:'calc(100vh - 98px)' }}>
            <div className="row">
                <div className="col-md-4"></div>
                <div className={`col-md-4 ${styles.card} container`}>
                    <div className="row gy-4">
                        <div className="col-12">
                            <h6>Sesión de administrador</h6>
                        </div>
                        <div className="col-12">
                            <label htmlFor="">Correo electrónico</label>
                            <input type="text" className="form-control" placeholder="tucorreo@ejemplo.com" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="">Contraseña</label>
                            <input type="password" className="form-control" placeholder="******"/>
                        </div>
                        <div className="col-12">
                            <button className="btn btnPrimario">Acceder</button>
                        </div>
                        <div className="col-12"><button className="btn btnSecundario">Cancelar</button></div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}