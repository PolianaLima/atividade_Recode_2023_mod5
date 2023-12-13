import React from 'react';

function Carousel({url1, url2, url3, url4}) {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" >
                <div className="carousel-item active " data-bs-interval="10000">
                    <img src={url1} className="d-block w-100 " alt="Banner Promocional pagina destino"/>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src={url2} className="d-block w-100" alt="Banner Promocional pagina destino"/>
                </div>
                <div className="carousel-item">
                    <img src={url3} className="d-block w-100" alt="Banner Promocional pagina destino"/>
                </div>
                <div className="carousel-item">
                    <img src={url4} className="d-block w-100" alt="Banner Promocional pagina destino"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;