import { closeWindow } from "../utils";

import Login from "../components/Login";
import Register from '../components/Register';

const whatToRender = (what) => {
  switch (what) {
    case 2:
      return <Login />;
    
      case 3:
        return <Register/>
  }
};

const Window = ({content}) => {
  return (
    <div
      className="fixed top-40 left-[26%] w-[40%] min-h-[60%] bg-wht border-2 border-mint z-50"
      id="window"
    >
      <div className="flex justify-end border-b border-keppel">
        <button onClick={() => closeWindow()} className="p-1 pr-4">
          X
        </button>
      </div>
      {whatToRender(content)}
    </div>
  );
};

export default Window;
