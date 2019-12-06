import axios from 'axios';

export const getEpisodes = () => axios.get('http://localhost:1337/episodes');
export const getEpisode = (id) => axios.get(`http://localhost:1337/episodes/${id}`);