import { useDispatch, useSelector } from "react-redux";
import { ChangeCurrentPage, SetCurrentPosts } from "../../store/actionCreators";
import { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import './pagination.css'

export const Pagination = () => {
    
    const totalPages = useSelector(state => state.totalPages);
    const currentPage = useSelector(state => state.currentPage);
    const dispatch = useDispatch();
    const postsPerPage = useSelector(state => state.postsPerPage);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const posts = useSelector(state => state.posts);
    
    useEffect(() => {
        dispatch(SetCurrentPosts([firstPostIndex, lastPostIndex]))
    }, [firstPostIndex, lastPostIndex, totalPages, posts]);
    

    const pages = [];
    for (let i=1; i<=totalPages; i++) {
        pages.push(i)
    }  
    let range = [];
    if (totalPages<=5) range=pages
    else {
        if (currentPage<=3) range=pages.slice(0,5);
        if (currentPage>3 && currentPage<=totalPages-3) range=pages.slice(currentPage-3, currentPage+2)
        if (currentPage>=totalPages-2) range=pages.slice(totalPages-5, totalPages)
    }

    return (
        <nav className="pagination-wrapper">
            <Link 
                to={`/?page=${currentPage-1}`} 
                className="prev" 
                onClick={()=>dispatch(ChangeCurrentPage(currentPage-1))}
            >Назад</Link>

            {range.map((item) => <Link 
                className={item===currentPage? 'link-item-active':'link-item'}
                to={`/?page=${item}`} 
                onClick={()=>dispatch(ChangeCurrentPage(item))} 
                key={item}
            >{item}</Link>)}

            <Link 
                to={`/?page=${currentPage+1}`} 
                className='next' 
                onClick={()=>dispatch(ChangeCurrentPage(currentPage+1))}
            >Далее</Link>
        </nav>
    );
}
        
    
