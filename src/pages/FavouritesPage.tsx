import { useAppSelector } from "../hooks/redux";
    
const FavouritesPage = () =>{
    const {favourites} = useAppSelector(state=>state.github)
    return(
        <div className="flex justify-center w-full py-4 h-screen">
            {favourites.length == 0 && <p className="my-6 ">Not favourites</p>}
            <ul className="list-none">
                {favourites?.map(item=>{
                    return(
                        <li className="my-2 font-bold">{item}</li>
                    )
                })}
            </ul>
        </div>
    )
}
export default FavouritesPage;