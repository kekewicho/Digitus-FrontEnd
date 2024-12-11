import React, { useState, useEffect } from "react";
import { useCart } from "../../components/CartProvider";
import { useNavigate, Link } from "react-router-dom";
import { ocultarNumeroTarjeta, formatNumber, sum, capitalize } from "../../utils";



import styles from "./Checkout.module.css"

export const Checkout = () => {

    const [advance, setAdvance] = useState(0);
    const { cart, cleanCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [metodosPago, setMetodosPago] = useState([]);

    const [userData, setUserData] = useState({});
    const [addressData, setAddressData] = useState({});
    
    const [tarjetas, setTarjetas] = useState([]);
    const [tarjetaSelected, setTarjetaSelected] = useState({});

    useEffect(()=>{
        fetch('/digitus/catalogo/metodoPago')
        .then(r=>r.json())
        .then(r => {
            setMetodosPago(r);
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

    useEffect(() => {
        switch (advance) {
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
    }, [formData, addressData, userData])

    function handleformUpdate(e) {
        const key = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [key]: value
        })
    }

    function handleValidacionStage1() {
        if (validacionStage1()) {
            setStage1()
        }
    }



    function validacionStage1() {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.correo);
        const phoneTest = /^\+?[0-9]{10,13}$/.test(userData.telefono);
        const nameTest = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$/.test(userData.nombre ?? '');

        return emailTest && phoneTest && nameTest;
    }

    function setStage1() {
        // alert(`Se lanza ${JSON.stringify({
        //     nombre: userData.nombre,
        //     correo: userData.correo,
        //     telefono: userData.telefono
        // })}`)
        fetch('/digitus/usuarios/validarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: userData.nombre,
                correo: userData.correo,
                telefono: userData.telefono
            })
        })
            .then(r => r.json())
            .then(r => {
                setUserData({
                    ...r
                });

                setFormData({
                    ...formData,
                    idUsuario: r.idUsuario
                });

                setAdvance(1);
            })
    }


    function validacionStage2() {
        return Number.isInteger(parseInt(formData.idDireccion)) ?? false;
    }

    function setStage2() {
        if (formData.idDireccion > 0) {
            const selectedAddress = userData.domicilios.find(
                (d) => d.idDireccion === parseInt(formData.idDireccion)
            );
            setAddressData(selectedAddress);
        } else if (formData.idDireccion === -1) {
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
            setTarjetas(r);
        })
        
        setAdvance(3);

    }
    
    function validacionStage4() {
        return Number.isInteger(parseInt(formData.idDireccion)) ?? false;
    }

    function setStage4() {
        if (formData.idTarjeta > 0) {
            const selectedTarjeta = tarjetas.find(
                (t) => t.idTarjeta === parseInt(formData.idTarjeta)
            );
            setTarjetaSelected(selectedTarjeta);
        } else if (formData.idDireccion === -1) {
            setTarjetaSelected({});
        }

        setAdvance(4); 

    }

    function handleSubmit() {
        // console.log({
        //     ...addressData,
        //     codigoPostal: parseInt(addressData.codigoPostal),
        //     numero: parseInt(addressData.numero),
        //     idUsuario: formData.idUsuario
        // })
        if (formData.idDireccion == -1) {
          fetch('/digitus/domicilio/registrarDomicilio', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...addressData,
              codigoPostal: parseInt(addressData.codigoPostal),
              numero: parseInt(addressData.numero),
              idUsuario: formData.idUsuario,
              telefono:userData.telefono
            })
          })
          .then(r => r.json())
          .then(r => {

            setFormData({
              ...formData,
              idDireccion: r.idDomicilio
            });

      
            const payload = {
              pedido: {
                idUsuario: parseInt(formData.idUsuario),
                idDireccion: parseInt(r.idDomicilio),
                idMetodoPago: parseInt(formData.idMetodoPago),
                tarjeta: {
                  numeroTarjeta: tarjetaSelected.numeroTarjeta,
                  banco: tarjetaSelected.banco,
                  caducidad: tarjetaSelected.caducidad
                },
                total: cartSubtotales() + 200
              },
              detalleProducto: [
                ...cart.map(c => ({
                  idProducto: c.idProducto,
                  cantidad: c.cantidad
                }))
              ]
            };
      
            console.log(payload);
      
            // Segundo fetch dentro del then del primero
            return fetch('/digitus/pedidos/nuevoPedido', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
            });
          })
          .then(r => r.json())
          .then(r => {
            alert(r.estadoPedido);
            navigate('/more');
          })
          .catch(error => {
            // Manejar errores de ambos fetch
            console.error('Error al registrar domicilio o pedido:', error);
            // Mostrar un mensaje de error al usuario
          });
        } else {
          // Si ya existe idDireccion, ejecutar solo el segundo fetch
          const payload = {
            pedido: {
              idUsuario: parseInt(formData.idUsuario),
              idDireccion: parseInt(formData.idDireccion),
              idMetodoPago: parseInt(formData.idMetodoPago),
              tarjeta: {
                numeroTarjeta: tarjetaSelected.numeroTarjeta,
                banco: tarjetaSelected.banco,
                caducidad: tarjetaSelected.caducidad
              },
              total: cartSubtotales() + 200
            },
            detalleProducto: [
              ...cart.map(c => ({
                idProducto: c.idProducto,
                cantidad: c.cantidad
              }))
            ]
          };
      
          console.log(payload);
      
          fetch('/digitus/pedidos/nuevoPedido', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          })
          .then(r => r.json())
          .then(r => {
            alert(r.estadoPedido);
            cleanCart();
            navigate('/more');
          })
          .catch(error => {
            // Manejar errores del segundo fetch
            console.error('Error al registrar pedido:', error);
            // Mostrar un mensaje de error al usuario
          });
        }
      }

    formData && console.log(formData);


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
                            <div className="col-12"><button className="btn btnPrimario" onClick={handleSubmit}>Confirmar orden</button></div>
                        </div>
                        <div className="col-12">&nbsp;</div>
                        <div className="row">
                            <div className="col-12"><Link to="/more" className="btn btnSecundario">Seguir comprando</Link></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Ingresa datos para el registro de la órden</h4>
                    <form className="needs-validation" noValidate="">
                        <div className="row g-3">
                            <div className="col-6">
                                <label for="email" className="form-label">Ingresa tu correo electrónico</label>
                                <input type="email" className="form-control" id="correo" name="correo" value={userData.correo ?? ''} onChange={(e)=>setUserData({...userData, correo:e.target.value })} placeholder="you@example.com" />
                                <div className="invalid-feedback">
                                    Ingresa un correo electrónico válido.
                                </div>
                            </div>
                            <div className="col-6">
                                <label for="email" className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" id="telefono" name="telefono" value={userData.telefono ?? ''} onChange={(e)=>setUserData({...userData, telefono:e.target.value })} placeholder="444-444-4444" />
                                <div className="invalid-feedback">
                                    Ingresa un correo electrónico válido.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label for="firstName" className="form-label">Nombre(s) y Apellidos</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={userData.nombre ?? ''} onChange={(e)=>setUserData({...userData, nombre:e.target.value })} placeholder="Juan Pérez" required />
                                <div className="invalid-feedback">
                                    Tu nombre es requerido.
                                </div>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-3">
                                <button className="btn btnPrimario" onClick={handleValidacionStage1} type="button">Validar usuario</button>
                            </div>
                            {
                                advance > 0 &&
                                <>
                                    <div className="col-12">
                                        <label htmlFor="domiciliosGuardados">Domicilios usados anteriormente</label>
                                        <div className="input-group">
                                            <select className="form-select" name="idDireccion" id="idDireccion" value={formData.idDireccion ?? 0} onChange={handleformUpdate}>
                                                <option value="">Selecciona un domicilio</option>
                                                {
                                                    userData.domicilios &&
                                                    userData.domicilios.map(d => {
                                                        return (
                                                            <option value={d.idDireccion}>{`${d.calle} ${d.numero}, ${d.colonia}, ${d.ciudad}, ${d.estado}`}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => setFormData({ ...formData, idDireccion: -1 })}>+ Nuevo</button>
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
                                        <input type="numeric" className="form-control" id="address" placeholder="123" required="" value={addressData.numero ?? ''} onChange={e=>setAddressData({...addressData, numero:e.target.value})} />
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
                                        <input type="number" className="form-control" id="zip" placeholder="" required="" value={addressData.codigoPostal ?? ''} onChange={e=>setAddressData({...addressData, codigoPostal:e.target.value})} />
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
                                    <div className="col-6">
                                        <label htmlFor="">Método de pago</label>
                                        <select value={formData.idMetodoPago ?? ''} name='idMetodoPago' onChange={handleformUpdate} className="form-select">
                                            <option value="">Selecciona un metodo de pago</option>
                                            {
                                                metodosPago && metodosPago.map(m=>(
                                                    <option value={parseInt(m.idMetodoPago)}>{capitalize(m.descripcion)}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
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
                                                <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
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