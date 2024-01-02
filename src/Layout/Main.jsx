import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber";


const Main = () => {
    return (
        <div>
            <Navber/>
            <div className="mx-10">
            <Outlet/>
            </div>
        </div>
    );
};

export default Main;