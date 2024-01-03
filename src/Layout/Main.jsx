import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber";
import Footer from "../Shared/Footer";


const Main = () => {
    return (
        <div>
            <Navber />
            <div className="mx-10">
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default Main;