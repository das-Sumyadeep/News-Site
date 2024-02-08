import React from 'react'
import { useGlobalContext } from '../ContextAPI/Context';

const Stories = () => {

    const { hits, isLoading, removePost } = useGlobalContext();

    if(isLoading){
        return (
            <>
            <h1>Loading...</h1>
            </>
        )
    }
    return (
        <>
            <div className='main-div'>
            {
                hits.map((news) => {
                    const {title, author, objectID, url, num_comments} = news;
                    return (
                        
                        <div className='cards' key={objectID}>
                            <h2>{title}</h2>
                            <p>
                                By <span>{author}</span> | <span>{num_comments}</span> comments
                            </p>
                            <div className='card-button'>
                                <a href={url} rel='noreferrer' target='_blank'>Read More</a>
                                <a href='/' onClick={()=> removePost(objectID)}>Remove</a>
                            </div>
                        </div>
                        
                    )
                })
            }
            </div>
        </>
    )
}

export default Stories