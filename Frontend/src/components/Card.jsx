import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import axiosApi from '../api/axiosApi';


export default function BlogCard() {

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const [articles, setArticles] = React.useState([])


  React.useEffect(() => {
    const fetchArticles = async () => {
      await axiosApi.get(`/api/article/fetcharticles`)
        .then((res) => setArticles(res.data.articles))
        .catch((err) => console.error(err))
    }
    fetchArticles()
  }, [])


  return (
    <div className='grid grid-cols-3'>
      {articles.map((article) => (
        <Link key={article._id} to={`/blog/${article._id}`}>
          <Card sx={{ maxWidth: 345 }} className='m-6'>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={article.title}
              subheader={formatDate(article.createdAt)}
            />
            {article.image && <CardMedia
              component="img"
              height="194"
              image={article.image}
              alt="Paella dish"
            />}
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {article.description.length > 100
                  ? article.description.slice(0, 100) + '...'
                  : article.description}
              </Typography>
            </CardContent>

            {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions> */}
          </Card>
        </Link>

      ))}
    </div>


  );
}
