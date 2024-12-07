import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from "./Dashboard.module.css"
import { formatNumber, capitalize, dropDuplicates } from "../../utils";

export const Dashboard = () => {

    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 5; // Elementos por página


    const [pedidos, setPedidos] = useState([])
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });

    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        fetch('/digitus/pedidos/todosLosPedidos')
            .then(r => r.json())
            .then(r => {
                const data = r.map((a)=>({
                    ...a,
                    searchString:`${a.receptorDePedido} ${JSON.stringify(dropDuplicates(a.productos,['marca']))} ${JSON.stringify(dropDuplicates(a.productos,['categoria']))} ${JSON.stringify(dropDuplicates(a.productos,['nombre']))}`.toUpperCase()
                }))


                setPedidos(data);
            })
    }, [])


    const handleDayRangeChange = (selectedDayRange) => {
        setSelectedDayRange(selectedDayRange);
    }

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return pedidos.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(pedidos.length / itemsPerPage);


    const totalNuevosPedidos = pedidos.length;

    const montoTotalVentas = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);

    const ticketPromedio = totalNuevosPedidos > 0 ? (montoTotalVentas / totalNuevosPedidos).toFixed(2) : 0;

    let categoriaMasVentas = "";
    if (pedidos.length > 0) {
        const categorias = pedidos.flatMap(pedido => pedido.productos.map(producto => producto.categoria));
        const conteoCategorias = categorias.reduce((acc, categoria) => {
            acc[categoria] = (acc[categoria] || 0) + 1;
            return acc;
        }, {});
        categoriaMasVentas = Object.keys(conteoCategorias).reduce((a, b) => conteoCategorias[a] > conteoCategorias[b] ? a : b);
    }

    const filtered = () => pedidos.filter(p=>p.searchString.includes(searchString.toUpperCase()))
    
    return (
        <>
            <div className="container-fluid px-5 scrollable y-scroll" style={{ height: 'calc(100vh - 98px)' }}>
                <div className="row gy-5">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <span className="input-group-text bi bi-search" id="basic-addon1"></span>
                            <input type="text" className="form-control" placeholder="Nombre cliente, producto, categoría" aria-label="Username" aria-describedby="basic-addon1" value={searchString ?? ''} onChange={(e)=>setSearchString(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-md-3">
                        {/* <button className="btn btnPrimario" data-bs-toggle="modal" data-bs-target="#modalFechas">
                            {selectedDayRange.from && selectedDayRange.to ?
                                `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year} - ${selectedDayRange.to.day}/${selectedDayRange.to.month}/${selectedDayRange.to.year}`
                                : "Todas las fechas"
                            }
                        </button> */}
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.card} container-fluid`}>
                            <div className="row">
                                <div className="col-12">
                                    <h6>Total nuevos pedidos</h6>
                                </div>
                                <div className="col-12">
                                    <h3>{totalNuevosPedidos}</h3>
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
                                    <h3>{formatNumber(montoTotalVentas / 1000, true)} K</h3>
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
                                    <h3>{formatNumber(ticketPromedio / 1000, true)} K</h3>
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
                                    <h3>{capitalize(categoriaMasVentas)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Lista de pedidos</h6>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                {[...Array(totalPages).keys()].map(page => (
                                    <button
                                        key={page}
                                        className={`btn ${currentPage === page + 1 ? "btnPrimario" : "btnSecundario"}`}
                                        onClick={() => setCurrentPage(page + 1)}
                                    >
                                        {page + 1}
                                    </button>
                                ))} 
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Folio</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Método de Pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered().map((pedido, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td><Link to='/detallesPedido' state={pedido}>{pedido.folio}</Link></td>
                                        <td>{pedido.receptorDePedido}</td>
                                        <td>{formatNumber(pedido.total, true)}</td>
                                        <td>{pedido.metodoPago}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal" id="modalFechas" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content bg-white">
                        <div className="modal-header">
                            <h5 className="modal-title">Seleccionar rango de fechas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-white">
                            <div className="container-fluid">
                                <div className="row p-0">
                                    <Calendar
                                        value={selectedDayRange}
                                        onChange={handleDayRangeChange}
                                        calendarClassName="bg-white"
                                        shouldHighlightWeekends
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6"></div>
                                    <div className="col-3">
                                        <button className="btn btnSecundario" data-bs-dismiss="modal">Cancelar</button>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btnPrimario" data-bs-dismiss="modal">Confirmar</button>
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