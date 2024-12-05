import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../components/CartProvider";
import { filterData, formatNumber, sum } from "../../utils";


import styles from "./Carrito.module.css"


export const Carrito = () => {

    const { cart, setCart, removeFromCart } = useCart();

    const [productos, setProductos] = useState()

    useEffect(()=> {
        fetch('/digitus/producto/todos')
        .then(r=>r.json())
        .then(r=>{
            setProductos(r)
        })

    },[])

    const cartSubtotales = () => {
        if (!cart) return [];
      
        const data = cart.map((producto) => {
        return {
            ...producto,
            subtotal: producto.cantidad * producto.precio,
          };
        });

        return sum(data, 'subtotal')
      };

  const handleIncrement = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].cantidad += 1;
      return updatedCart;
    });
  };

  const handleDecrement = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].cantidad > 1) {
        updatedCart[index].cantidad -= 1;
      }
      return updatedCart;
    });
  };

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
                        {
                            productos && cart &&
                            cart.length > 0 ?
                            cart.map((e, index) => {
                                const producto = filterData(productos, 'idProducto', e.idProducto);


                                return (
                                    <>
                                    <div className={`row ${styles.item}`}>
                                        <div className="col-2">
                                            <img src={producto.imagenProducto} alt="" />
                                        </div>
                                        <div className="col-10 container-fluid">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h6>{producto.nombre}</h6>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6>{formatNumber(producto.precio * e.cantidad, true)}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                        <h6>Cant: {e.cantidad} pz.</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <p style={{ color: 'gray' }}>{formatNumber(producto.precio, true)} c/u</p>
                                                </div>
                                                <div className="col-6">&nbsp;</div>
                                                <div className="col-3 d-flex justify-content-end">
                                                    <button className="btn bi bi-trash-fill" onClick={()=>removeFromCart(e.idProducto)} style={{ height:'40px', color:'red' }}>&nbsp;Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    </>                                    
                                )
                            })
                            :
                            <h5 className='text-center text-secondary'>Aún no has agregado ningún artículo</h5>
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${styles.card} container`}>
                        <div className="row">
                            <div className="col-6">
                                <h6>Subtotal</h6>
                            </div>
                            <div className="col 6 text-end">
                                <h6>{cart && productos && formatNumber(cartSubtotales() / 1.16, true)}</h6>
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
                                <h7>{cart && productos && formatNumber(cartSubtotales() - (cartSubtotales() / 1.16), true)}</h7>
                            </div>
                        </div>
                        <hr style={{ borderTop:'dashed 1px' }}/>
                        <div className="row">
                            <div className="col-6">
                                <h5>Total</h5>
                            </div>
                            <div className="col-6 text-end">
                                <h5>{cart && productos && formatNumber(cartSubtotales() + 200, true)}</h5>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12"><Link className="btn btnPrimario" to="/checkout">Proceder al pago</Link></div>
                        </div>
                        <div className="row">
                            <div className="col-12"><Link className="btn" to="/more" style={{ width:'100%', border:'1px lightgray solid', marginTop:'10px' }}>Seguir comprando</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}