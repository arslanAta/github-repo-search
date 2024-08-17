import { Link } from "react-router-dom";

const Navigation  = () =>{
    return(
        <nav className="flex justify-between items-center p-4 w-full bg-gray-500 text-white">
            <h1 className="font-semibold">Github search</h1>
            <span className="flex gap-3">
                <Link to="/">Home</Link>
                <Link to="/favourites">Favourites</Link>
            </span>
        </nav>
    )
}
export default Navigation;