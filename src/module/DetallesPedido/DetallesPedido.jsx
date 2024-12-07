import React from "react";
import { useLocation, Link } from "react-router-dom";

import styles from "./DetallesPedido.module.css"
import { formatNumber, ocultarNumeroTarjeta, capitalize } from "../../utils";


export const DetallesPedido = () => {

    const location = useLocation();
    const state = location.state;

    state && console.log(state);

    return (
        state && 
        <div className="container" style={{ minHeight:'calc(100vh - 98px)' }}>
            <div className="row">
                <div className="col-12 mb-3">
                    <h3><Link className="bi bi-arrow-left" style={{ color:"black" }} to="/dashboard" />&nbsp;&nbsp;&nbsp;Órden No. {state.folio}</h3>
                </div>
                <div className="col-md-8">
                    <div className={styles.card}>
                    <hr />
                        {
                            state.productos.map(p=>(
                                <>        
                                <div className={`row ${styles.item}`}>
                                    <div className="col-2">
                                        <img src={p.imagenProducto} alt="" />
                                    </div>
                                    <div className="col-10 container-fluid">
                                        <div className="row">
                                            <div className="col-6">
                                                <h6>{p.nombre}</h6>
                                            </div>
                                            <div className="col-6 text-end">
                                                <h6>{formatNumber(p.precio * p.cantidad, true)}</h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <p style={{ color: 'gray' }}>{formatNumber(p.precio)} c/u</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <h6>{p.cantidad} pzas. solicitadas</h6>
                                            </div>
                                            <div className="col-3">&nbsp;</div>
                                            <div className="col-6 d-flex justify-content-end text-end">
                                                <button className="btn bi bi-ban" style={{ height:'40px', color:'red' }}>&nbsp;Cancelar este item</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                </>        
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${styles.card} container-fluid`}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <h6>Datos del cliente</h6>
                            </div>
                            <div className="col-3 text-body-secondary">Nombre</div>
                            <div className="col-9 text-end">{state.receptorDePedido}</div>
                            <div className="col-3 text-body-secondary">Teléfono</div>
                            <div className="col-9 text-end">{state.domicilio.telefono}</div>
                            <div className="col-12 my-3">
                                <h6>Datos del domicilio del pedido</h6>
                            </div>
                            <div className="col-3 text-body-secondary">Domicilio</div>
                            <div className="col-9 text-end">{state.domicilio.calle} {state.domicilio.numero}</div>
                            <div className="col-3 text-body-secondary">Colonia</div>
                            <div className="col-9 text-end">{state.domicilio.colonia}</div>
                            <div className="col-3 text-body-secondary">C.P.</div>
                            <div className="col-9 text-end">{state.domicilio.codigoPostal}</div>
                            <div className="col-3 text-body-secondary">Ciudad</div>
                            <div className="col-9 text-end">{state.domicilio.ciudad}</div>
                            <div className="col-3 text-body-secondary">Estado</div>
                            <div className="col-9 text-end">{state.domicilio.estado}</div>
                            <div className="col-12 my-3">
                                <h6>Datos del pago</h6>
                            </div>
                            <div className="col-4 text-body-secondary">Monto total</div>
                            <div className="col-8 text-end">{formatNumber(state.total, true)}</div>
                            <div className="col-12 text-end">{capitalize(state.metodoPago)} {ocultarNumeroTarjeta(state.numeroTarjeta)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}