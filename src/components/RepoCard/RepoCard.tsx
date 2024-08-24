import React, {  useState } from "react";
import { IRepo } from "../../models/models";
import { LS_FAV_KEY } from "../../store/github/github.slice";
import { useActions } from "../../hooks/actions";

const RepoCard = ({ repo }: { repo: IRepo }) => {
    const {addFavourite,removeFavourite} = useActions()
    const [isFav, setIsFav] = useState(localStorage.getItem(LS_FAV_KEY)?.includes(repo.html_url))
    
    const addToFavourite = (event:React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        addFavourite(repo.html_url)
        setIsFav(true)
    }
    const removeFromFavourite = (event:React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        removeFavourite(repo.html_url)
        setIsFav(false)
    }
    return (
        <div className="col-span-1 border py-3 px-5 shadow-md hover:shadow-lg hover:bg-gray-200 transition-all rounded">
            <a href={repo.html_url} target="_blank">
                <h1 className="truncate">{repo.full_name}</h1>
                <p>
                    Forks : <span className="font-semibold mr-3">{repo.forks}</span>
                    Watchers: <span className="font-semibold">{repo.watchers}</span>
                </p>
                <p className="text-sm line-clamp-2">{repo?.description}</p>
                {!isFav && <button onClick={addToFavourite} className=" mt-2 p-1 px-3 bg-yellow-500 rounded">Add</button>}
                {isFav && <button onClick={removeFromFavourite} className="mt-2 py-1 px-3 bg-red-500 rounded">Remove</button>}
            </a>
        </div>
    )
}
export default RepoCard