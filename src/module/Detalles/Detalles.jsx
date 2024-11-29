import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import styles from "./Detalles.module.css"


export const Detalles = () => {
    return (
        <div className="container" style={{ height: 'calc(100vh - 98px)' }}>
            <div className="row">
                <div className="col-md-8">
                    <img className="w-75" src="https://www.soriana.com/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw4cf82f91/images/product/7500525617453_A.jpg" />
                </div>
                <div className="col-md-4 ">
                    <div className={`${styles.card} container`}>
                        <div className="row gy-4">
                            <div className="col-12">
                                <h6>Procase Funda Compatible Con iPad 10ª Gen 10.9 2022 Modelos A2696 A2757 A2777, Carcasa Delgada Posterior Translúcido Smart Cover Para iPad Décima Generación 10.9 Pulgadas -marino</h6>
                                <span className="category">Laptops</span>
                            </div>
                            <div className="col-12">
                                <h3>$ 10,599.00 MXN</h3>
                            </div>
                            <div className="col-12">
                                <button className="btn btnPrimario">Comprar</button>
                            </div>
                            <div className="col-12">
                                <button className="btn btnSecundario">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}