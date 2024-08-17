import { useEffect, useState } from "react";
import { useLazyGetUserRepoQuery, useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const { isError, data, isLoading } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3
    })
    const [fetchRepos, {isLoading:areRepoLoading,data:repos}] = useLazyGetUserRepoQuery()

    const handleSearchRepos = (username:string) =>{
        fetchRepos(username)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
        console.log(debounced)
    }, [debounced, data])
    return (
        <div className="flex justify-center w-full py-4 h-screen">
            {isError && <p>Error when fetch</p>}
            <div className="relative w-[550px]">
                <input
                    type="text"
                    className="absolute h-[40px] w-full border shadow-md py-2 px-4"
                    placeholder="Search for github username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {dropdown && <ul className="list-none absolute top-[40px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-gray-200">
                    {isLoading && <p className="text-red-600 text-center">Loading....</p>}
                    {data?.map(user => {
                        return (
                            <li
                                className="py-2 px-4 hover:bg-gray-500 hover:text-white"
                                onClick={()=>handleSearchRepos(user.login)}
                                >
                                {user.login}
                            </li>
                        )
                    })}
                </ul>}
                <div className="container">
                    <ul className="mt-10">
                        {areRepoLoading && <p className="text-center">Loading....</p>}
                        {repos?.map(repo=>{
                            return(
                                <li key={repo.url}>{repo.url}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default HomePage;