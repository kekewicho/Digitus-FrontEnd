import React, { useState, useEffect } from "react";
import { useCart } from "../../components/CartProvider";
import { ocultarNumeroTarjeta, formatNumber, sum } from "../../utils";



import styles from "./Checkout.module.css"

export const Checkout = () => {

    const [advance, setAdvance] = useState(0);
    const { cart } = useCart();
    const [formData, setFormData] = useState({});

    const [userData, setUserData] = useState({});
    const [addressData, setAddressData] = useState({});
    
    const [tarjetas, setTarjetas] = useState([]);
    const [tarjetaSelected, setTarjetaSelected] = useState({});

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

    useEffect(() => {

        console.log(validacionStage3())
        console.log(advance)
        switch (advance) {
            case 0:
                validacionStage1() && setStage1();
                break;

            case 1:
                validacionStage2() && setStage2();
                break;
            
            case 2:
                validacionStage3() && setStage3();
                break;

            case 3:
                validacionStage4() && setStage4();
                break;

            default:
                break;
        }
    }, [formData, addressData])

    function handleformUpdate(e) {
        const key = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [key]: value
        })
    }



    function validacionStage1() {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
        const phoneTest = /^\+?[0-9]{10,13}$/.test(formData.telefono);
        const nameTest = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,50}$/.test(formData.nombre ?? '');

        return emailTest && phoneTest && nameTest;
    }

    function setStage1() {
        fetch('/digitus/usuarios/validarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: formData.nombre,
                correo: formData.correo,
                telefono: formData.telefono
            })
        })
            .then(r => r.json())
            .then(r => {
                setUserData({
                    ...r
                });

                setAdvance(1);
            })
    }


    function validacionStage2() {
        return Number.isInteger(parseInt(formData.idDomicilio)) ?? false;
    }

    function setStage2() {
        if (formData.idDomicilio > 0) {
            const selectedAddress = userData.domicilios.find(
                (d) => d.idDomicilio === parseInt(formData.idDomicilio)
            );
            setAddressData(selectedAddress);
        } else if (formData.idDomicilio === -1) {
            setAddressData({});
        }

        setAdvance(2);

    }
    
    function validacionStage3() {
        const { calle, numero, colonia, ciudad, estado, codigoPostal } = addressData;
    
        const calleRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,#-]+$/; 
        const numeroRegex = /^\d{1,4}(?:(?:-[a-zA-Z])|(?:\s[a-zA-Z])|(?:\s\d{1,3}))?$/;
        const coloniaRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,#-]+$/;
        const ciudadRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ-]+$/;
        const estadoRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ-]+$/;
        const codigoPostalRegex = /^\d{5}$/;
    
        const calleValida = calleRegex.test(calle);
        const numeroValido = numeroRegex.test(numero);
        const coloniaValida = coloniaRegex.test(colonia);
        const ciudadValida = ciudadRegex.test(ciudad);
        const estadoValido = estadoRegex.test(estado);
        const codigoPostalValido = codigoPostalRegex.test(codigoPostal);
    
        return (
            calleValida &&
            numeroValido &&
            coloniaValida &&
            ciudadValida &&
            estadoValido &&
            codigoPostalValido
        );
    }

    function setStage3() {
        fetch(`/digitus/catalogo/tarjetasPorUsuario/${userData.idUsuario}`)
        .then(r=> r.json())
        .then(r=> {
            console.log(r)
            setTarjetas(r);
        })
        
        setAdvance(3);

    }
    
    function validacionStage4() {
        return Number.isInteger(parseInt(formData.idDomicilio)) ?? false;
    }

    function setStage4() {
        if (formData.idTarjeta > 0) {
            const selectedTarjeta = tarjetas.find(
                (t) => t.idTarjeta === parseInt(formData.idTarjeta)
            );
            setTarjetaSelected(selectedTarjeta);
        } else if (formData.idDomicilio === -1) {
            setTarjetaSelected({});
        }

        setAdvance(4); 

    }



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
                                <h6>{cart && formatNumber(cartSubtotales() / 1.16, true)}</h6>
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
                                <h7>{cart && formatNumber(cartSubtotales() - (cartSubtotales() / 1.16), true)}</h7>
                            </div>
                        </div>
                        <hr style={{ borderTop: 'dashed 1px' }} />
                        <div className="row">
                            <div className="col-6">
                                <h5>Total</h5>
                            </div>
                            <div className="col-6 text-end">
                                <h5>{cart && formatNumber(cartSubtotales() + 200, true)}</h5>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12"><button className="btn btnPrimario" disabled={advance <= 4}>Confirmar orden</button></div>
                        </div>
                        <div className="col-12">&nbsp;</div>
                        <div className="row">
                            <div className="col-12"><button className="btn btnSecundario">Seguir comprando</button></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Ingresa datos para el registro de la órden</h4>
                    <form className="needs-validation" noValidate="">
                        <div className="row g-3">
                            <div className="col-6">
                                <label for="email" className="form-label">Ingresa tu correo electrónico</label>
                                <input type="email" className="form-control" id="correo" name="correo" value={formData.correo ?? ''} onChange={handleformUpdate} placeholder="you@example.com" />
                                <div className="invalid-feedback">
                                    Ingresa un correo electrónico válido.
                                </div>
                            </div>
                            <div className="col-6">
                                <label for="email" className="form-label">Teléfono</label>
                                <input type="email" className="form-control" id="telefono" name="telefono" value={formData.telefono ?? ''} onChange={handleformUpdate} placeholder="444-444-4444" />
                                <div className="invalid-feedback">
                                    Ingresa un correo electrónico válido.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label for="firstName" className="form-label">Nombre(s) y Apellidos</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre ?? ''} onChange={handleformUpdate} placeholder="Juan Pérez" required />
                                <div className="invalid-feedback">
                                    Tu nombre es requerido.
                                </div>
                            </div>
                            {
                                advance > 0 &&
                                <>
                                    <div className="col-12">
                                        <label htmlFor="domiciliosGuardados">Domicilios usados anteriormente</label>
                                        <div className="input-group">
                                            <select className="form-select" name="idDomicilio" id="idDomicilio" value={formData.idDomicilio ?? 0} onChange={handleformUpdate}>
                                                <option value="">Selecciona un domicilio</option>
                                                {
                                                    userData.domicilios &&
                                                    userData.domicilios.map(d => {
                                                        return (
                                                            <option value={d.idDomicilio}>{`${d.calle} ${d.numero}, ${d.colonia}, ${d.ciudad}, ${d.estado}`}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => setFormData({ ...formData, idDomicilio: -1 })}>+ Nuevo</button>
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                advance > 1 &&
                                <>
                                    <div className="col-9">
                                        <label for="address" className="form-label">Calle</label>
                                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" value={addressData.calle ?? ''} onChange={e=>setAddressData({...addressData, calle:e.target.value})} />
                                        <div className="invalid-feedback">
                                            Tu calle es requerida.
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <label for="address" className="form-label">Número</label>
                                        <input type="text" className="form-control" id="address" placeholder="123" required="" value={addressData.numero ?? ''} onChange={e=>setAddressData({...addressData, numero:e.target.value})} />
                                        <div className="invalid-feedback">
                                            El número es requerido.
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label for="address" className="form-label">Colonia</label>
                                        <input type="text" className="form-control" id="address" placeholder="Fraccionamiento ejemplo" required="" value={addressData.colonia ?? ''} onChange={e=>setAddressData({...addressData, colonia:e.target.value})} />
                                        <div className="invalid-feedback">
                                            La colonia es requerida.
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label for="address" className="form-label">Ciudad</label>
                                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" value={addressData.ciudad ?? ''} onChange={e=>setAddressData({...addressData, ciudad:e.target.value})} />
                                        <div className="invalid-feedback">
                                            La ciudad es requerida.
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label for="address" className="form-label">Estado</label>
                                        <input type="text" className="form-control" id="address" placeholder="Zacatecas" required="" value={addressData.estado ?? ''} onChange={e=>setAddressData({...addressData, estado:e.target.value})} />
                                        <div className="invalid-feedback">
                                            El estado es requerida.
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label for="zip" className="form-label">Código Postal</label>
                                        <input type="text" className="form-control" id="zip" placeholder="" required="" value={addressData.codigoPostal ?? ''} onChange={e=>setAddressData({...addressData, codigoPostal:e.target.value})} />
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
                                            <select className="form-select" value={formData.idTarjeta ?? ''} onChange={e=>setFormData({...formData, idTarjeta:e.target.value})} >
                                                <option value="">Selecciona una tarjeta</option>
                                                {
                                                    tarjetas.map(t=> (
                                                        <option value={t.idTarjeta}>{ocultarNumeroTarjeta(t.numeroTarjeta)}</option>
                                                    ))
                                                }
                                            </select>
                                            <button className="btn btn-outline-secondary" type="button" onClick={()=>setFormData({...formData, idTarjeta:-1})}>+ Nueva</button>
                                        </div>
                                    </div>
                                    <div className="col-6"></div>
                                    {
                                        advance > 3 &&
                                        <>
                                            <div className="col-md-6">
                                                <label for="cc-number" className="form-label">Número de tarjeta</label>
                                                <input type="text" className="form-control" id="cc-number" placeholder="" required value={tarjetaSelected.numeroTarjeta ?? ''} onChange={e=>setTarjetaSelected({...tarjetaSelected, numeroTarjeta:e.target.value})} />
                                                <div className="invalid-feedback">
                                                    El número de tu tarjeta es requerido
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Banco</label>
                                                <input type="text" className="form-control" id="cc-number" placeholder="" required value={tarjetaSelected.banco ?? ''} onChange={e=>setTarjetaSelected({...tarjetaSelected, banco:e.target.value})} />
                                                <div className="invalid-feedback">
                                                    El Banco de tu tarjeta es requerido
                                                </div>
                                            </div>
                                            <div className="col-md-3"></div>
                                            <div className="col-md-3">
                                                <label for="cc-expiration" className="form-label">Expiración</label>
                                                <input type="text" className="form-control" id="cc-expiration" placeholder="" required value={tarjetaSelected.caducidad ?? ''} onChange={e=>setTarjetaSelected({...tarjetaSelected, caducidad:e.target.value})} />
                                                <div className="invalid-feedback">
                                                    Fecha de expiración de tarjeta requerida
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label for="cc-cvv" className="form-label">CVV</label>
                                                <input type="text" className="form-control" id="cc-cvv" placeholder="" required value={tarjetaSelected.cvv ?? ''} onChange={e=>setTarjetaSelected({...tarjetaSelected, cvv:e.target.value})} />
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