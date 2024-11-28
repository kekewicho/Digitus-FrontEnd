import React from "react";
import { Link } from "react-router-dom";

import styles from "./More.module.css"

export const More = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">🔎</span>
                                    <input type="text" class="form-control" placeholder="Categoría, producto" aria-label="Username" aria-describedby="basic-addon1" />
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
                                <input type="text" className="form-control" placeholder="Mínimo" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Máximo" />
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
                                <select name="" id="" className="form-select" placeholder='hola'>
                                    <option value="" selected>Selecciona una marca</option>
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
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Selecciona categoría</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="itemWrapper col-md-4 ">
                                <Link className={styles.itemCard}>
                                    <img src="https://www.soriana.com/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw4cf82f91/images/product/7500525617453_A.jpg" alt="" />
                                    <p>Laptopt AMD Ryzen 5 +  16 GB RAM, GPU GeForce 2500x</p>
                                    <h3>$ 10,599.59</h3>
                                </Link>
                            </div>
                            <div className="itemWrapper col-md-4 ">
                                <Link className={styles.itemCard}>
                                    <img src="https://www.soriana.com/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw4cf82f91/images/product/7500525617453_A.jpg" alt="" />
                                    <p>Laptopt AMD Ryzen 5 +  16 GB RAM, GPU GeForce 2500x</p>
                                    <h3>$ 10,599.59</h3>
                                </Link>
                            </div>
                            <div className="itemWrapper col-md-4 ">
                                <Link className={styles.itemCard}>
                                    <img src="https://www.soriana.com/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw4cf82f91/images/product/7500525617453_A.jpg" alt="" />
                                    <p>Laptopt AMD Ryzen 5 +  16 GB RAM, GPU GeForce 2500x</p>
                                    <h3>$ 10,599.59</h3>
                                </Link>
                            </div>
                            <div className="itemWrapper col-md-4 ">
                                <Link className={styles.itemCard}>
                                    <img src="https://www.soriana.com/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw4cf82f91/images/product/7500525617453_A.jpg" alt="" />
                                    <p>Laptopt AMD Ryzen 5 +  16 GB RAM, GPU GeForce 2500x</p>
                                    <h3>$ 10,599.59</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}