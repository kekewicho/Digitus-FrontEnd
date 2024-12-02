import React from "react";

import styles from "./DetallesPedido.module.css"


export const DetallesPedido = () => {
    return (
        <div className="container" style={{ minHeight:'calc(100vh - 98px)' }}>
            <div className="row">
                <div className="col-12 mb-3">
                    <h3>Órden No. 3281903</h3>
                </div>
                <div className="col-md-8">
                    <div className={styles.card}>
                    <hr />
                        <div className={`row ${styles.item}`}>
                            <div className="col-2">
                                <img src="https://www.soriana.com/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw4cf82f91/images/product/7500525617453_A.jpg" alt="" />
                            </div>
                            <div className="col-10 container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <h6>Laptop AMD Ryzen 5 + 16 RAM blabblabla</h6>
                                    </div>
                                    <div className="col-6 text-end">
                                        <h6>$ 10,599.00</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <p style={{ color: 'gray' }}>$ 10,599.00 c/u</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <h6>4 pzas. solicitadas</h6>
                                    </div>
                                    <div className="col-3">&nbsp;</div>
                                    <div className="col-6 d-flex justify-content-end text-end">
                                        <button className="btn bi bi-ban" style={{ height:'40px', color:'red' }}>&nbsp;Cancelar este item</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${styles.card} container-fluid`}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <h6>Datos del cliente</h6>
                            </div>
                            <div className="col-3 text-body-secondary">Nombre</div>
                            <div className="col-9 text-end">Luis Ruben Ramos Cortes</div>
                            <div className="col-3 text-body-secondary">Email</div>
                            <div className="col-9 text-end">luisruben2997@gmail.com</div>
                            <div className="col-3 text-body-secondary">Teléfono</div>
                            <div className="col-9 text-end">492-218-1446</div>
                            <div className="col-12 my-3">
                                <h6>Datos del domicilio del pedido</h6>
                            </div>
                            <div className="col-3 text-body-secondary">Domicilio</div>
                            <div className="col-9 text-end">El Carmen 705</div>
                            <div className="col-3 text-body-secondary">Colonia</div>
                            <div className="col-9 text-end">Colonia Ejemplo</div>
                            <div className="col-3 text-body-secondary">C.P.</div>
                            <div className="col-9 text-end">99100</div>
                            <div className="col-3 text-body-secondary">Ciudad</div>
                            <div className="col-9 text-end">Zapopan</div>
                            <div className="col-3 text-body-secondary">Estado</div>
                            <div className="col-9 text-end">Jalisco</div>
                            <div className="col-12 my-3">
                                <h6>Datos del pago</h6>
                            </div>
                            <div className="col-4 text-body-secondary">Monto total</div>
                            <div className="col-8 text-end">$ 4,599.00 MXN</div>
                            <div className="col-12 text-end">BBVA XXXX-XXX-XXX-6644</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}