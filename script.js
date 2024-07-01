function handleInput() {
  const input = document.getElementById('searchInput').value;
  const movieModalBox = document.querySelector('.movie-modal-box');

  if (input.length > 2) {
      fetchMovies(input);
  } else {
      movieModalBox.style.display = 'none';
  }
}

function fetchMovies(query) {
  const API_KEY = '783ea48'; 
  const url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          displayMovies(data.Search);
      })
      .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
  const movieModalBox = document.querySelector('.movie-modal-box');
  movieModalBox.innerHTML = '';

  if (movies) {
      movieModalBox.style.display = 'block';
      movies.forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('movies');
          movieElement.innerHTML = `
              <div class="poster">
                  <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/60x70'}" alt="${movie.Title}">
              </div>
              <div class="movie_box">
                  <h3>${movie.Title}</h3>
                  <p>${movie.Year}</p>
              </div>
          `;
          movieElement.addEventListener('click', () => {
              fetchMovieDetails(movie.imdbID);
          });
          movieModalBox.appendChild(movieElement);
      });
  } else {
      movieModalBox.style.display = 'none';
  }
}

function fetchMovieDetails(id) {
  const API_KEY = '783ea48'; // Replace with your OMDB API key
  const url = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          displayMovieDetails(data);
      })
      .catch(error => console.error('Error fetching movie details:', error));
}

// Function to display movie details in the content section
function displayMovieDetails(movie) {
  const movieContent = document.querySelector('.movie_content');
  movieContent.innerHTML = `
      <div class="banner">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}" alt="${movie.Title}">
      </div>
      <div class="details">
          <div class="details_header">
              <h1>${movie.Title}</h1>
              <p>${movie.Year}</p>
          </div>
          <div class="header-box">
              <div class="box">
                  <p><strong>Genre:</strong> ${movie.Genre}</p>
                  <p><strong>Director:</strong> ${movie.Director}</p>
                  <p><strong>Actors:</strong> ${movie.Actors}</p>
                  <p><strong>Plot:</strong> ${movie.Plot}</p>
                  <p><strong>Language:</strong> ${movie.Language}</p>
                  <p><strong>Awards:</strong> ${movie.Awards}</p>
                  <p><strong>Box Office:</strong> ${movie.BoxOffice}</p>
              </div>
          </div>
      </div>
  `;
}

// Add event listener to the search form to prevent default form submission
document.querySelector('.search-box form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('searchInput').value;
  fetchMovies(input);
});
