import React, { useState } from 'react';
import Main from './components/Main';
import Posts from './components/Posts';
import { Routes, Route } from 'react-router-dom';
import AddPost from './components/AddPost';
import './style.css'


function App() {
    let [posts, setPosts] = useState([]);
    

    const getFetchPosts = async (IDuser) => {
      //this function now accept the userId to return his posts
      try {
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${IDuser}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

  function handlePostUpdate (newPost) {
      // This function now accepts a new post as an argument
      setPosts([...posts, newPost]); // Append new post to array
      console.log(posts)
  };
  
  return (
    <div>
      <div className="header">
    <h2>Posts - this is us...</h2>
  </div>
      <div className="body">
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route
          path="/:userName/:userID/Posts"
          element={
            <div>
              <Main  />
              <Posts getFetchPosts={getFetchPosts} postArr={posts} />
              <AddPost handlePostUpdate={handlePostUpdate} postArr={posts} /> 
            </div>
          }
        />
      </Routes>
      </div>
    </div>
  );
}
export default App;
