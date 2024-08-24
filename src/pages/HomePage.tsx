import { useEffect, useState } from "react";
import { useLazyGetUserRepoQuery, useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import SearchIcon from "../assets/icons/SearchIcon";
import RepoList from "../components/RepoList/RepoList";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const { isError, data, isLoading } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3
    })
    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserRepoQuery()

    const handleSearchRepos = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
        setSearch(username)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
        console.log(debounced)
    }, [debounced, data])
    return (
        <div className="py-5 px-3 pb-6">
            {isError && <p>Error when fetch</p>}
            <div className="relative mx-auto w-11/12 sm:w-9/12 md:w-[550px]">
                <div className="flex gap-2 items-center border shadow-md px-2 rounded">
                    <input
                        type="text"
                        className="h-[40px] flex-1 p-2 outline-none"
                        placeholder="Search for github username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchIcon width={20} height={20} className="text-gray-400" />
                </div>
                {dropdown && <ul className="list-none absolute top-[40px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-gray-200">
                    {isLoading && <p className="text-red-600 text-center">Loading....</p>}
                    {data?.map(user => {
                        return (
                            <li
                                key={user.id}
                                className="py-2 px-4 hover:bg-gray-500 hover:text-white"
                                onClick={() => handleSearchRepos(user.login)}
                            >
                                {user.login}
                            </li>
                        )
                    })}
                </ul>}
                
            </div>
            <RepoList areReposLoading={areReposLoading} repos={repos}/>
        </div>
    )
}
export default HomePage;