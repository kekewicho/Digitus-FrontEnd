import React from "react";
import { useCart } from "../../components/CartProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize, formatNumber } from "../../utils";


import styles from "./Detalles.module.css"


export const Detalles = () => {

    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const product = {
            idProducto: state.idProducto,
            cantidad: 1,
            precio: state.precio
        }

        addToCart(product);
    }

    const handleComprar = () => {
        handleAddToCart();
        navigate('/cart');
    }

    return (
        <div className="container" style={{ height: 'calc(100vh - 98px)' }}>
            <div className="row">
                <div className="col-md-8">
                    <img className="w-75" src={state.imagenProducto} />
                </div>
                <div className="col-md-4 ">
                    <div className={`${styles.card} container`}>
                        <div className="row gy-4">
                            <div className="col-12">
                                <h6>{state.nombre}</h6>
                                <h6>Marca: {state.marca}</h6>
                                <span className="category">{capitalize(state.categoria)}</span>
                            </div>
                            <div className="col-12">
                                <h3>{formatNumber(state.precio, true)}</h3>
                            </div>
                            <div className="col-12">
                                <button className="btn btnPrimario" onClick={handleComprar}>Comprar</button>
                            </div>
                            <div className="col-12">
                                <button className="btn btnSecundario" onClick={handleAddToCart}>Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}