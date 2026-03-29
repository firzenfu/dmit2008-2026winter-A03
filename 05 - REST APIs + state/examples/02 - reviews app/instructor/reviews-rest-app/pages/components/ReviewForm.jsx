// hooks
import { useState } from 'react';

// API functions - we're in components dir now, so the import path changes accordingly
import { getReviews, postReview } from '../api/movies';

// layout components
import Grid from '@mui/material/Grid';

// form control components
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

// 'physical'/input components
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import TextField from '@mui/material/TextField';


/* The form handles all the input fields, so I only need to care about passing
   the 'reviews' stateful variable & its setter from the parent component.

   You'll also notice I called the setter "onReviewsChange" as an input prop!
   This is because I want to keep my naming clean — e.g. all state setters in React
   (should) start with 'set...', all hooks should start with 'use...' (e.g. useState, useEffect).

   I don't want to call it 'setReviews' here too, because naming convention would make that
   more confusing for someone reading my code — they'd assume the corresponding state variable
   would also exist at this level / in this component. So, instead I name it like a change handler.
*/
export default function ReviewForm({ reviews, onReviewsChange }) {

  const [title, setTitle]       = useState("")
  const [comments, setComments] = useState("")
  const [rating, setRating]     = useState(0)

  // index.js doesn't need to know about resetting/submitting the form anymore either!
  const resetForm = () => {
    setTitle("")
    setComments("")
    setRating(0)
  }

  const submitReview = (event) => {

    event.preventDefault();

    postReview({
      title: title,
      comment: comments,
      rating: rating,
    }).then((movie)=> {
      // when we POST and create something anew, usually a (well-configured) REST API
      // sends us back a body response with the thing we just created, which we'll use to re-render.

      onReviewsChange([movie, ...reviews]) // compose new array w/ newly created item -> trigger re-render 
    })

    resetForm();
  }

  const loadReviews = () => {
    getReviews().then((moviesData) => {
      onReviewsChange(moviesData)
    })
  }

  return (
    <form
      onSubmit={submitReview}
    >

      <Grid container spacing={3}>

        <Grid item xs={12} sm={12}>
          <TextField
            id="title"
            name="title"
            label="Adaptation Title"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id="review-comments"
            name="review-comments"
            label="Comments"
            fullWidth
            variant="standard"
            value={comments}
            onChange={(e) => {setComments(e.target.value)}}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel id="adaptation-rating">Rating</FormLabel>
            <RadioGroup
              row
              aria-labelledby="adaptation-rating"
              name="rating-buttons-group"
              value={rating}
              onChange={(e) => {setRating(parseInt(e.target.value))}}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
              <FormControlLabel value="6" control={<Radio />} label="6" />
              <FormControlLabel value="7" control={<Radio />} label="7" />
              <FormControlLabel value="8" control={<Radio />} label="8" />
              <FormControlLabel value="9" control={<Radio />} label="9" />
              <FormControlLabel value="10" control={<Radio />} label="10" />
            </RadioGroup>
         </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            type="submit"
          >
            Add New Review
          </Button>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button
            variant="outlined"
            onClick={loadReviews}
          >
            Load All Current Reviews
          </Button>
        </Grid>

      </Grid>

    </form>
  )
}
