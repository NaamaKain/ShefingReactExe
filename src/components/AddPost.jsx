import React from 'react';
import { useState ,useEffect} from 'react';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from './Loader';

const AddPost = ({ handlePostUpdate ,postArr}) => {
    let params=useParams();
    const [isLoading, setIsLoading] = useState(false); //true when the server is up
    const [open, setOpen] = React.useState(false); //open the dialog form
    const [title, setTitle] = useState('') //take the new-post-title text
    const [body, setBody] = useState('')  //take the new-post-body text
    const [newID, setNewID] = useState(null);
    const [errors, setErrors] = useState({}); // Mode for saving validation errors

    const onFinish = async () => {
      setErrors({});
      const titleError = validateTitle(title);
      const bodyError = validateBody(body);
      if (titleError || bodyError) {
        setErrors({ title: titleError, body: bodyError });
        return; // Stop the function if there are errors
      }

      setIsLoading(true)
      setTitle("");
      setBody("");
      let lastID = postArr.length ? postArr[postArr.length - 1].id : 0;//the last post's ID
      // Optimistic update
      setNewID(lastID + 1);
      try {
        const post = { //build the new post to add
          id: newID,
          title: title,
          body: body,
          userId: params.userID,
        };
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {  //post request to add the new post
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const newPost = await response.json();
        newPost.id=post.id; //the post request give automaticly id=101, but i want to give a unique id for key, so i updated it
        handlePostUpdate(newPost); // Call the function to update posts
        handleClose();
      } catch (error) {
        console.error('ERROR:', error); // Log the error to the console
        // Optionally, display an error message to the user here
      }
      setIsLoading(false);
    };
    
    const handleClickOpen = () => { //open dialog form
      setOpen(true);
    };
  
    const handleClose = () => {  //close the dialog form
      setOpen(false);
    };

// validation function
const validateTitle = (title) => {
  if (title.trim() === '') {
    return 'The post title cannot be empty';
  }
  if (title.length > 255) {
    return 'The post title cannot be more than 255 characters';
  }
  return ''; //no errors
};

const validateBody = (body) => {
  if (body.trim() === '') {
    return 'The post body cannot be empty';
  }
  return ''; // no errors
};

    useEffect(() => { //update the newID to the next newPost
      if (postArr.length) {
        setNewID(postArr[postArr.length - 1].id + 1);
      }
    }, [postArr]);
    return (
        <div className="addPostForm">
          <React.Fragment>
              <Button variant="outlined" onClick={handleClickOpen}>
                Add new post
              </Button>
             <Dialog open={open} >
                <DialogTitle>Add new post</DialogTitle>
                 <DialogContent>
                 <DialogContentText>
                 Please fill in the title and content of the post to be published.
                </DialogContentText>
                <TextField
                  error={!!errors.title} 
                  helperText={errors.title} // Display an error message if any
                  autoFocus
                  margin="dense"
                  id="name"
                  label="title"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={title}
                   onChange={e => {
                    setTitle(e.target.value)
                  }}
                 />
                <TextField
                error={!!errors.body} // 
                helperText={errors.body} // Display an error message if any
                autoFocus
                margin="dense"
                id="body"
                label="content"
                type="text"
                fullWidth
                variant="standard"
                value={body}
                onChange={e => {
                setBody(e.target.value)
                }}
               />
          </DialogContent>
           <DialogActions>
             <Button onClick={handleClose}>Cancel</Button>
             <Button onClick={onFinish}>Subscribe</Button>
             {isLoading&&<Loader/>}
           </DialogActions>
      </Dialog>
    </React.Fragment>
      </div>
    );
  };
  
  export default AddPost