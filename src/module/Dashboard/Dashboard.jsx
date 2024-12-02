import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';


import styles from "./Dashboard.module.css"

export const Dashboard = () => {
    return (
        <>
            <div className="container-fluid px-5 scrollable y-scroll" style={{ height: 'calc(100vh - 98px)' }}>
                <div className="row gy-5">
                    <div className="col-md-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text bi bi-search" id="basic-addon1"></span>
                            <input type="text" class="form-control" placeholder="Email cliente, nombre, producto, categoría" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-md-3">
                        <button className="btn btnPrimario" data-bs-toggle="modal" data-bs-target="#modalFechas">
                            Todas las fechas
                        </button>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.card} container-fluid`}>
                            <div className="row">
                                <div className="col-12">
                                    <h6>Total nuevos pedidos</h6>
                                </div>
                                <div className="col-12">
                                    <h3>17</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.card} container-fluid`}>
                            <div className="row">
                                <div className="col-12">
                                    <h6>Monto de ventas</h6>
                                </div>
                                <div className="col-12">
                                    <h3>$ 123,456.99</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.card} container-fluid`}>
                            <div className="row">
                                <div className="col-12">
                                    <h6>Ticket promedio</h6>
                                </div>
                                <div className="col-12">
                                    <h3>$ 456.99</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.card} container-fluid`}>
                            <div className="row">
                                <div className="col-12">
                                    <h6>Categoría con más ventas</h6>
                                </div>
                                <div className="col-12">
                                    <h3>Laptops (17 %)</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Lista de pedidos</h6>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btnPrimario">1</button>
                                <button type="button" class="btn btnPrimario">2</button>
                                <button type="button" class="btn btnPrimario">3</button>
                                <button type="button" class="btn btnPrimario">4</button>
                                <button type="button" class="btn btnPrimario">5</button>
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal" id="modalFechas" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content bg-white">
                        <div class="modal-header">
                            <h5 class="modal-title">Seleccionar rango de fechas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body bg-white">
                            <div className="container-fluid">
                                <div className="row p-0">
                                    <Calendar
                                        calendarClassName="bg-white"
                                        shouldHighlightWeekends
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6"></div>
                                    <div className="col-3">
                                        <button className="btn btnSecundario">Cancelar</button>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btnPrimario">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}