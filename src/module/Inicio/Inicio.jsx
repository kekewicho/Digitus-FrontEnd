import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopN, formatNumber, capitalize, dropDuplicates, group, filterData } from "../../utils";

import styles from "./Inicio.module.css"

export const Inicio = () => {

    const [productos, setProductos] = useState([])
    const [hotProducts, sethotProducts] = useState([])

    useEffect(()=> {
        fetch('/digitus/producto/todos')
        .then(r=>r.json())
        .then(r=>{
            setProductos(r)
        })

        fetch('/digitus/pedidos/todosLosPedidos')
        .then(r=>r.json())
        .then(r=>{
            const pedidos = r.flatMap((pedido) =>
                pedido.productos.map((producto) => ({
                    ...producto,
                    idProducto:producto.idProducto,
                    nombre:producto.nombre,
                    imagenProducto:producto.imagenProducto,
                    cantidad:producto.cantidad
                }))
            );

            const pedidosAgrupados = group({
                data:pedidos,
                key:'idProducto',
                value:['cantidad'],
                order:{key:'cantidad', descending:true}
            })

            sethotProducts(pedidosAgrupados);


        })

    },[])

    return (
        <div className={`y-scroll scrollable container-fluid`} style={{ height: '100%', overflowX:'hidden' }}>
            <div className="row" style={{ height:'80vh', paddingInline:'5%' }}>
                <div className="col-md-6" style={{ display: 'flex', textAlign: 'left', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '9rem', zIndex:-1, position:'relative', color: 'var(--dark-text)' }}>TECNOLOGÍA</h1>
                    <h1 style={{ fontSize: '4rem', color: 'var(--dark-text)' }}>CUANDO QUIERAS</h1>
                    <h1 style={{ fontSize: '4rem', color: 'var(--dark-text)' }}>DONDE QUIERAS</h1>
                </div>
                <div className="col-md-5">
                    <dotlottie-player style={{ marginTop:'5%' }} src="https://lottie.host/d2e67320-d7a3-4b37-bcea-ce5a3ce31ef5/oDj0lNPEsn.lottie" background="transparent" speed="1" loop autoplay></dotlottie-player>
                </div>
            </div>
            <br /><br /><br />
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', marginInline: '5%' }}>
                    <h1>🔍 Explora nuestras categorías</h1><br /><br />
                </div>
                <div className="x-scroll scrollable">
                    {
                        dropDuplicates(productos, ["categoria","imagenCategoria"]).map(c=>{
                            return (
                                <Link key={c.categoria} className={styles.categorycard} to={`/more?categoria=${c.categoria}`} >
                                    <img src={c.imagenCategoria} alt="" />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <br /><br /><br />
            <div className="row">
                <div style={{ marginInline: '5%'}}>
                    <h1>🔥 En tendencia ahora</h1><br /><br />
                </div>
                <div className="x-scroll scrollable">
                    {
                        getTopN(hotProducts, 'cantidad', 6, 'desc').map(p=>{
                            const producto = filterData(productos, 'idProducto', p.idProducto);


                            return (
                                <Link key={p.idProducto} className={styles.card} to="/detalles" state={producto}>
                                    <h4>{producto.nombre}<br />{formatNumber(producto.precio, true)}</h4>
                                    <img src={producto.imagenProducto} alt="" />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <br /><br /><br />
            <div className="row">
                <div style={{ marginInline: '5%'}}>
                    <h1>🏷️ Outlet</h1><br /><br />
                </div>
                <div className="x-scroll scrollable">
                    {
                        getTopN(productos, 'stock', 6, 'desc').map(p=> {
                            return (
                                <Link className={styles.card} to="/detalles" state={p} key={p.idProducto}>
                                    <h4>{p.nombre}<br/>{formatNumber(p.precio, true)}<br /><span style={{ color:'brown', fontSize:'12pt' }}>¡Solo quedan {p.stock} unidades!</span></h4>
                                    <img src={p.imagenProducto} alt="" />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}