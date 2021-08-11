import client from './client'

const endpoint = '/getMovies'
const addMovieLink = '/addMovie'
const editMovieLink = '/editMovieById'
const likeMovieById = '/addLikeByMovieId'

const getAllMovies = () => client.get(endpoint);
const getMovieByCategory = (category) => client.get("/getMoviesByCategory", { category: category });
const likeMovie = (id) => client.get(likeMovieById, { id: id });
const getMovieById = (id) => client.get("/getMovieById", { id: id })
const deleteMovieById = (id) => client.get("/deleteMovie", { id: id })

export const addMovie = (movie) => {
    const data = new FormData();
    data.append("name", movie.name);
    data.append("description", movie.description);
    data.append("category", movie.category);
    data.append("rating", movie.rating);
    data.append("thumbnail", movie.thumbnail);
    data.append("trailer", movie.trailer);
    data.append("video", movie.video);

    const res = client.post(addMovieLink, data);
    console.log(res)
    return res
};
export const editMovie = (movie) => {
    const data = new FormData();
    data.append("name", movie.name);
    data.append("description", movie.description);
    data.append("category", movie.category);
    data.append("rating", movie.rating);
    data.append("thumbnail", movie.thumbnail);
    data.append("trailer", movie.trailer);
    data.append("video", movie.video);
    data.append("id", movie.id)
    console.log(data)

    const res = client.post("/editMovieById", data);
    console.log(res)
    return res
};

export default {
    getAllMovies,
    addMovie,
    getMovieByCategory,
    editMovie,
    likeMovie,
    getMovieById,
    deleteMovieById

}