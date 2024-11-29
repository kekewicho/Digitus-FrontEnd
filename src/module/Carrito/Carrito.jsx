import React from "react";

import styles from "./Carrito.module.css"


export const Carrito = () => {
    return (
        <div className={`container ${styles.mainContainer}`}>
            <div className="row" style={{ height:'100%' }}>
                <div className="col-md-8 scrollable y-scroll" style={{ maxHeight:'100%' }}>
                    <div className={`${styles.card} container-fluid`}>
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Artículos en tu carrito</h5>
                            </div>
                        </div>
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
                                        <div class="input-group mb-3" style={{ padding:'0px', border:'lightgray 1px solid', borderRadius:'10px' }}>
                                            <button class="btn" type="button">-</button>
                                            <input type="number" min={1} class="form-control text-center" />
                                            <button class="btn" type="button">+</button>
                                        </div>
                                    </div>
                                    <div className="col-6">&nbsp;</div>
                                    <div className="col-3 d-flex justify-content-end">
                                        <button className="btn bi bi-trash-fill" style={{ height:'40px', color:'red' }}>&nbsp;Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${styles.card} container`}>
                        <div className="row">
                            <div className="col-6">
                                <h6>Subtotal</h6>
                            </div>
                            <div className="col 6 text-end">
                                <h6>$ 0.00</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h7>Envío</h7>
                            </div>
                            <div className="col-6 text-end">
                                <h7>$ 200.00</h7>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h7>I.V.A. (16 %)</h7>
                            </div>
                            <div className="col-6 text-end">
                                <h7>$ 200.00</h7>
                            </div>
                        </div>
                        <hr style={{ borderTop:'dashed 1px' }}/>
                        <div className="row">
                            <div className="col-6">
                                <h5>Total</h5>
                            </div>
                            <div className="col-6 text-end">
                                <h5>$ 359.99</h5>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12"><button className="btn btnPrimario">Proceder al pago</button></div>
                        </div>
                        <div className="row">
                            <div className="col-12"><button className="btn" style={{ width:'100%', border:'1px lightgray solid', marginTop:'10px' }}>Seguir comprando</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}