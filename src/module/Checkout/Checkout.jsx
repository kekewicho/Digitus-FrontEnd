import React, { useState } from "react";

import styles from "./Checkout.module.css"

export const Checkout = () => {

    const [advance, setAdvance] = useState(0)


    return (
        <div className="container">
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
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
                        <hr style={{ borderTop: 'dashed 1px' }} />
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
                            <div className="col-12"><button className="btn btnPrimario" disabled={advance <= 4}>Confirmar orden</button></div>
                        </div>
                        <div className="row">
                            <div className="col-12"><button className="btn btnSecundario">Seguir comprando</button></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Ingresa datos para el registro de la órden</h4>
                    <form className="needs-validation" novalidate="">
                        <div className="row g-3">
                            <div className="col-6">
                                <label for="email" className="form-label">Ingresa tu correo electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                <div className="invalid-feedback">
                                    Ingresa un correo electrónico válido.
                                </div>
                            </div>
                            <div className="col-6"></div>
                            {
                                advance > 0 &&
                                <>
                                    <div className="col-sm-6">
                                        <label for="firstName" className="form-label">Nombre(s)</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="" value="" required="" />
                                        <div className="invalid-feedback">
                                            Tu nombre es requerido.
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="lastName" className="form-label">Apellidos</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="" value="" required="" />
                                        <div className="invalid-feedback">
                                            Tus apellidos son requeridos.
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="domiciliosGuardados">Domicilios usados anteriormente</label>
                                        <div className="input-group">
                                            <select className="form-select">
                                                <option value="">Selecciona un domicilio</option>
                                                <option value="">Av. Segunda de Palomares 203 A, Colonia Centro, blabla bla</option>
                                            </select>
                                            <button class="btn btn-outline-secondary" type="button">+ Nuevo</button>
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                advance > 1 &&
                                <>
                                    <div className="col-12">
                                        <label for="address" className="form-label">Domicilio</label>
                                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" />
                                        <div className="invalid-feedback">
                                            Tu domicilio es requerido.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="state" className="form-label">Estado</label>
                                        <select className="form-select" id="state" required="">
                                            <option value="">Selecciona un estado</option>
                                            <option>California</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            No has seleccionado ningún estado.
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label for="zip" className="form-label">Código Postal</label>
                                        <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                        <div className="invalid-feedback">
                                            El código postal es requerido.
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        {
                            advance > 2 &&
                            <>
                                <hr className="my-4" />
                                <h4 className="mb-3">Pago</h4>
                                <div className="row gy-3">
                                    <div className="col-6">
                                        <label htmlFor="">Tarjetas usadas anteriormente</label>
                                        <div className="input-group">
                                            <select className="form-select">
                                                <option value="">Selecciona una tarjeta</option>
                                                <option value="">XXXX-XXXX-XXXX-6428</option>
                                                <option value="">XXXX-XXXX-XXXX-3256</option>
                                                <option value="">XXXX-XXXX-XXXX-9992</option>
                                            </select>
                                            <button class="btn btn-outline-secondary" type="button">+ Nueva</button>
                                        </div>
                                    </div>
                                    <div className="col-6"></div>
                                    {
                                        advance > 3 &&
                                        <>
                                            <div className="col-md-6">
                                                <label for="cc-number" className="form-label">Número de tarjeta</label>
                                                <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                                                <div className="invalid-feedback">
                                                    El número de tu tarjeta es requerido
                                                </div>
                                            </div>
                                            <div className="col-md6"></div>
                                            <div className="col-md-3">
                                                <label for="cc-expiration" className="form-label">Expiración</label>
                                                <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                                                <div className="invalid-feedback">
                                                    Fecha de expiración de tarjeta requerida
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label for="cc-cvv" className="form-label">CVV</label>
                                                <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                                                <div className="invalid-feedback">
                                                    Código de seguridad es requerido
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                                <hr className="my-4" />
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}