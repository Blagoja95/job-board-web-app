import React from "react";
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

const MainText = () => {
    return (
        <section className="bg-gray-light">
             
<Combobox
className="w-48"
  defaultValue="Yellow"
  data={["Red", "Yellow", "Blue", "Orange"]}
/>;
            <div></div>
        </section>
    )
};

export default MainText;