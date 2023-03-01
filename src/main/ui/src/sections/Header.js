import React from "react";
import "react-widgets/styles.css";

const Header = () => {
    return (
        <section className="bg-gray-light h-96 z-10">         
            <div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
                <h1 className="md:text-4xl md:leading-snug pb-4 font-semibold">Dobrodošli na najveću platformu za pretragu poslova u regionu</h1>
                <p className="font-normal text-gray-dark">Veliki odabir poslova ..............</p>
            </div>
        </section>
    )
};

export default Header;