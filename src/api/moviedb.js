import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    'api_key': 'e4658d018d466398163b210582d565f2'
  }
});
