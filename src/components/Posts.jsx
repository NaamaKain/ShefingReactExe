import React, { useEffect } from 'react';
import { useParams } from 'react-router';


function Posts({getFetchPosts,postArr}) {
  const params = useParams();

  useEffect(() => {
      let postsArray=getFetchPosts(params.userID);  //take the posts from app, and return to screen
  }, [params.userID]);

  return (
    
      <div className="posts">
        <h1 className="h1">{params.userName}'s Posts</h1>
        <div className="grid-container">
        {postArr.map((post) => (
          <div key={post.id} className="singlePost">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
        </div>
      </div>
    
  );
}

export default Posts;

