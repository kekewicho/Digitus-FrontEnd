import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./Login.module.css";

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usuario:'',
        password:''
    });

    function submit() {
        formData.usuario == 'admin' &&
        formData.password == '1234' &&
        navigate('/dashboard')
    }

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
                            <input type="text" className="form-control" placeholder="tucorreo@ejemplo.com" value={formData.usuario} onChange={(e)=>{setFormData({...formData, usuario:e.target.value})}} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="">Contraseña</label>
                            <input type="password" className="form-control" placeholder="******" value={formData.password} onChange={(e)=>{setFormData({...formData, password:e.target.value})}}/>
                        </div>
                        <div className="col-12">
                            <button className="btn btnPrimario" onClick={submit}>Acceder</button>
                        </div>
                        <div className="col-12"><Link className="btn btnSecundario" to='/more' >Cancelar</Link></div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}