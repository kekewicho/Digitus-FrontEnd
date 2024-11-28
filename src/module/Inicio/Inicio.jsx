import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import styles from "./Inicio.module.css"

export const Inicio = () => {
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
                    <Link className={styles.categorycard} to='/more' />
                    <Link className={styles.categorycard} to='/more' />
                    <Link className={styles.categorycard} to='/more' />
                    <Link className={styles.categorycard} to='/more' />
                    <Link className={styles.categorycard} to='/more' />
                    <Link className={styles.categorycard} to='/more' />
                </div>
            </div>
            <br /><br /><br />
            <div className="row">
                <div style={{ marginInline: '5%'}}>
                    <h1>🔥 En tendencia ahora</h1><br /><br />
                </div>
                <div className="x-scroll scrollable">
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                </div>
            </div>
            <br /><br /><br />
            <div className="row">
                <div style={{ marginInline: '5%'}}>
                    <h1>🏷️ Outlet</h1><br /><br />
                </div>
                <div className="x-scroll scrollable">
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                    <div className={styles.card}>&nbsp;</div>
                </div>
            </div>
        </div>
    )
}