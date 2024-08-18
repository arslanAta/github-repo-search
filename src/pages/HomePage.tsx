import { useEffect, useState } from "react";
import { useLazyGetUserRepoQuery, useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard/RepoCard";
import SearchIcon from "../assets/icons/SearchIcon";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const { isError, data, isLoading } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3
    })
    const [fetchRepos, { isLoading: areRepoLoading, data: repos }] = useLazyGetUserRepoQuery()

    const handleSearchRepos = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
        console.log(debounced)
    }, [debounced, data])
    return (
        <div className="flex justify-center w-screen py-5 px-3 pb-6">
            {isError && <p>Error when fetch</p>}
            <div className="relative w-[550px]">
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
                                className="py-2 px-4 hover:bg-gray-500 hover:text-white"
                                onClick={() => handleSearchRepos(user.login)}
                            >
                                {user.login}
                            </li>
                        )
                    })}
                </ul>}
                <div className="container py-2">
                    <ul className="mt-2">
                        {areRepoLoading && <p className="text-center">Loading....</p>}
                        {repos?.map(repo => {
                            return (
                                <RepoCard key={repo.id} repo={repo} />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default HomePage;