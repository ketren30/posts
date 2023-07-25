import { useSelector } from 'react-redux'
import './post.css'

export const Post = ({post}) => {
    const width = useSelector(state => state.width);
    if (width >= 600) return (
        <tr>
            <th className="table-cell">{post.id}</th>
            <td className="table-cell">{post.title}</td>
            <td className="table-cell">{post.body}</td>
        </tr>
    )
    else if (width<600) return (
        <article className='post-item'>
            <p className='post-title'>{post.id}. {post.title}</p>
            <section className='post-body'>{post.body}</section>
        </article>
    )
}