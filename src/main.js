const API_URL = "https://api.themoviedb.org/3/"
const API_KEY = "fdf620cfb9f015c2dd4eb40bd67660ee"

async function apiFetch(endpoint, method = "GET", body = null, language = "en-US") {
    const headers = {
        "accept": "application/json;charset=utf-8",
        // "Authorization": API_KEY
    }

    const options = {
        method,
        headers
    }

    if (method !== "GET" && body) {
        options.body = JSON.stringify(body)
    }

    let url = `${API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=${language}`

    const response = await fetch(url, options)

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.status_message || "Error en la solicitud.")
    }

    const data = response.json()
    return data
}

// Carga de peliculas populares
async function getTrendingMoviesPreview() {
    const { results: movies } = await apiFetch("movie/popular")

    const trendingPreview = document.querySelector("#trendingPreview .trendingPreview-movieList")
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add("movie-container")

        const moviePoster = document.createElement('img')
        moviePoster.classList.add('movie-img')
        moviePoster.setAttribute('alt', movie.title)
        moviePoster.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movieContainer.appendChild(moviePoster);
        trendingPreview.appendChild(movieContainer)

    });
}

// Carga de categorías
async function getCategoriesPreview() {
    const { genres: categories } = await apiFetch("genre/movie/list")
    const categoriesPreview = document.querySelector("#categoriesPreview .categoriesPreview-list")
    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')
        const categoryTitle = document.createElement('h3')
        categoryTitle.setAttribute("id", 'id' + category.id)
        categoryTitle.classList.add("category-title")
        categoryTitle.textContent = category.name

        categoryContainer.appendChild(categoryTitle)
        categoriesPreview.appendChild(categoryContainer)
    })
}


getTrendingMoviesPreview()
getCategoriesPreview()