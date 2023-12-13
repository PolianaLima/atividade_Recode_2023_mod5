import React from 'react';
import CardVooPromoImg from "@/components/cards/CardVooPromoImg";

function CarouselCard(props) {
    return (
        <div className="container mt-5 d-sm-flex justify-content-between">
            <CardVooPromoImg/>
            <CardVooPromoImg/>
            <CardVooPromoImg/>
            <div className="d-flex align-items-center">
                <button className=" btn">
                    <img width="20" height="20" className="ms-2" src="https://img.icons8.com/ios/50/000000/forward--v1.png" alt="forward--v1"/>
                </button>
            </div>

        </div>
    );
}

export default CarouselCard;