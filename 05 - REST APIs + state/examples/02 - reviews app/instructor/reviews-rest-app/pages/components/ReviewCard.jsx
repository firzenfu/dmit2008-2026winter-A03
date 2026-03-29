import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


export default function ReviewCard({ title, comments, rating }) {

  // 0-3  -> red
  // 4-6  -> orange
  // 7-8  -> green
  // 9-10 -> blue

  const getRatingColour = (rating) => {

    const ranges = [
      { max: 3,  display: 'red' },
      { max: 6,  display: 'orange'},
      { max: 8,  display: 'green'},
      { max: 10, display: 'blue'},
    ]

    const colourObj = ranges.find(
      // note: the <= is greater than or equal to,
      // *not* an arrow pointing in the other direction
      ({ max }) => rating <= max
    )

    return colourObj.display

  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getRatingColour(rating) }} aria-label="recipe">
            {rating}
          </Avatar>
        }
        title={
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        }
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comments}
        </Typography>
      </CardContent>
    </Card>
  )
}
