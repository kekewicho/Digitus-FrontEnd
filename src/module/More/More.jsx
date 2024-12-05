import React, { useState, useEffect } from "react";
import { data, Link, useSearchParams } from "react-router-dom";
import { dropDuplicates, capitalize, formatNumber } from "../../utils";

import styles from "./More.module.css"

export const More = () => {

    const [searchParams] = useSearchParams();
    const [productos, setProductos] = useState([]);
    const [filterParams, setFilterParams] = useState({
        searchString: '',
        priceMin: null,
        priceMax: null,
        marca: 'todas',
        categoria: 'todas'
    })


    useEffect(() => {
        fetch('/digitus/producto/todos')
            .then(r => r.json())
            .then(r => {

                const productos = r.map((producto) => ({
                    ...producto,
                    searchString: `${producto.nombre} ${producto.categoria} ${producto.marca}`.toUpperCase()
                }))

                setProductos(productos)
            })

        searchParams.get('categoria') && setFilterParams({ ...filterParams, categoria: searchParams.get('categoria') })


        searchParams.get('marca') && setFilterParams({ ...filterParams, marca: searchParams.get('marca') })

    }, [])

    const filteredProductos = productos.filter((producto) => {
        const {
            searchString,
            priceMin,
            priceMax,
            marca,
            categoria
        } = filterParams;

        const matchesSearchString =!searchString || producto.searchString.includes(searchString.toUpperCase());
        const matchesPriceMin = priceMin === null || producto.precio >= priceMin;
        const matchesPriceMax = priceMax === null || producto.precio <= priceMax;
        const matchesMarca = marca === 'todas' || producto.marca === marca;
        const matchesCategoria = categoria === 'todas' || producto.categoria === categoria;

        return (
            matchesSearchString &&
            matchesPriceMin &&
            matchesPriceMax &&
            matchesMarca &&
            matchesCategoria
        );
    });


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">🔎</span>
                                    <input value={filterParams.searchString} type="text" className="form-control" placeholder="Categoría, producto" aria-label="Username" aria-describedby="basic-addon1" onChange={e=>{setFilterParams({...filterParams, searchString:e.target.value})}}/>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h6>Precio</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="number" className="form-control" placeholder="Mínimo" value={filterParams.priceMin} onChange={e=>{setFilterParams({...filterParams, priceMin:e.target.value})}} />
                            </div>
                            <div className="col-md-6">
                                <input type="number" className="form-control" placeholder="Máximo" value={filterParams.priceMax} onChange={e=>{setFilterParams({...filterParams, priceMax:e.target.value})}} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h6>Marca</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <select name="" value={filterParams.marca} onChange={e=>{setFilterParams({...filterParams, marca:e.target.value})}} id="" className="form-select" placeholder='hola'>
                                    <option value="todas" selected>Todas</option>
                                    {
                                        dropDuplicates(productos, ['marca']).map(m => {
                                            return (
                                                <option key={m.marca} value={m.marca}>{m.marca}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h6>Categoría</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <select name="" value={filterParams.categoria} onChange={e=>{setFilterParams({...filterParams, categoria:e.target.value})}} id="" className="form-select">
                                    <option value="todas" selected>Todas</option>
                                    {
                                        dropDuplicates(productos, ['categoria']).map(c => {
                                            return (
                                                <option key={c.categoria} value={c.categoria}>{capitalize(c.categoria)}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                filteredProductos.map(p => {
                                    return (
                                        <div className="itemWrapper col-md-4 " key={p.idProducto}>
                                            <Link className={styles.itemCard} to={`/detalles`} state={p}>
                                                <img src={p.imagenProducto} alt="" />
                                                <p>{p.nombre}</p>
                                                <h3>{formatNumber(p.precio, true)}</h3>
                                                {p.stock <= 5 && <p className="text-danger">📣 ¡Ultimas piezas!</p>}
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}