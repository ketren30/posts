import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeCurrentPage, ChangeWidth, CountTotal, FetchPosts, Filter, SortPosts } from "../store/actionCreators";
import { Post } from "./post/post";
import { Pagination } from './pagination/pagination'
import './App.css';
import { useNavigate } from "react-router-dom";
import arrow from '../images/arrow.png'

function App() {
  
  const posts = useSelector(state => state.posts);
  const [temp, setTemp] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const width = useSelector(state => state.width)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPosts = useSelector(state => state.currentPosts);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    dispatch(FetchPosts());
  }, [])
  window.addEventListener('resize', ()=> dispatch(ChangeWidth(document.documentElement.clientWidth)));
  useEffect(() => {
    dispatch(CountTotal(posts.length));
  }, [posts])
  
  const inputHandle = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchStr(val);
    if (!val && isFiltered) dispatch(Filter(temp))
  }

  const filterPosts = () => {
    setIsFiltered(true);
    let filteredPosts=[];
        posts.forEach((item)=> {
          const values=[item.id, item.title, item.body];
          if (values.some((element) => element.toString().toLowerCase().includes(searchStr))) {
            filteredPosts.push(item)
          }
        }); 
        setTemp(posts)
    dispatch(Filter(filteredPosts));
    navigate('/page=1');
    dispatch(ChangeCurrentPage(1))
  }

  const handleSort = (field) => {
    const sortedPosts = [...posts]
    sortedPosts.sort((a, b) => {
      if (a[field] > b[field]) return 1
      else if (a[field] < b[field]) return -1
      else return 0
    })
    dispatch(SortPosts(sortedPosts));
  }

  
  return (
    <main className="main-wrapper">
      <form className="form-wrapper">
          <input className="search" onChange={inputHandle} placeholder="Поиск"></input>
          <button className="search-btn" onClick={filterPosts} disabled={searchStr===''} type='button'></button>
      </form>
      <div className="posts-wrapper">

        {width>=600 && <table className='posts-table' cellSpacing={0} border='1'>
            <thead className="table-header">
              <tr>
                <th className='header-cell' onClick={()=>handleSort('id')}>
                  ID <img className='sorting-arrow' src={arrow} alt=''/>
                </th>
                <th className='header-cell' onClick={()=>handleSort('title')}>
                    Заголовок <img className='sorting-arrow' src={arrow} alt=''/>
                </th>
                <th className='header-cell' onClick={()=>handleSort('body')}>
                    Описание <img className='sorting-arrow' src={arrow} alt=''/>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item, index)=> <Post post={item} key={index}/>)}
            </tbody>
        </table>}

        {width<600 && <>
          <span>Сортировать по:</span>
          <select onChange={(e)=>handleSort(e.target.value)} className="select">
            <option value='id'>id</option>
            <option value='title'>Заголовок</option>
            <option value='body'>Описание</option>
          </select>
          {currentPosts.map((item, index) => {
            return <Post post={item} key={index}/>
          })}
        </>}

      </div>
      <Pagination/>
    </main>
  )
}

export default App;
