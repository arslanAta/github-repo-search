import { FC } from "react";
import { IRepo} from "../../models/models";
import RepoCard from "../RepoCard/RepoCard";

interface RepoListProps{
    areReposLoading:boolean,
    repos : IRepo[] | undefined
}
const RepoList:FC<RepoListProps> = ({areReposLoading,repos}) => {
    return (
        <div className="container py-2">
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {areReposLoading && <p className="text-center">Loading....</p>}
                {repos?.map((repo:IRepo) => {
                    return (
                        <RepoCard key={repo.id} repo={repo} />
                    )
                })}
            </ul>
        </div>
    )
}
export default RepoList;
