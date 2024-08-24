import { Link } from "react-router-dom";

const Navigation  = () =>{
    return(
        <nav className="flex justify-between items-center p-4 w-full bg-gray-500 text-white">
            <Link to="/github-user-search" className="font-semibold">Github search</Link>
            <span className="flex gap-3">
                <Link to="/github-user-search">User Repos</Link>
                <Link to="/github-user-search/favourites">Favourites</Link>
            </span>
        </nav>
    )
}
export default Navigation;