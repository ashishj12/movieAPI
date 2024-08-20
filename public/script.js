document.addEventListener("DOMContentLoaded", () => {
  const getMoviesButton = document.getElementById("get-movies");
  const movieList = document.getElementById("movies");
  const errorMessage = document.getElementById("error-message");
  const movieForm = document.getElementById("movie-form");
  const posterInput = document.getElementById("poster");
  const posterImg = document.getElementById("poster-img");

  //fetch movies list
  async function fetchMovies() {
    try {
      const response = await fetch("http://localhost:3000/api/movies");
  
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
  
      const data = await response.json();
      movieList.innerHTML = "";
  
      if (data.movies.length === 0) {
        movieList.innerHTML = "<li>No movies found</li>";
      } else {
        data.movies.forEach((movie) => {
          const li = document.createElement("li");
  
          const movieText = document.createElement("span");
          movieText.textContent = `${movie.title} (${movie.year}) - ${movie.genre} - Rating: ${movie.rating} - Duration: ${movie.duration}`;
          
          const posterImg = document.createElement("img");
          posterImg.src = movie.posterUrl ? movie.posterUrl : '';
          posterImg.alt = movie.title;
          posterImg.classList.add("poster-img"); 
  
          li.appendChild(movieText);
          li.appendChild(posterImg);
          movieList.appendChild(li);
        });
      }
    } catch (error) {
      errorMessage.textContent = `Error: ${error.message}`;
    }
  }  

  getMoviesButton.addEventListener("click", fetchMovies);

  //handle add movies
  async function handleFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;
    const rating = document.getElementById("rating").value;
    const duration = document.getElementById("duration").value;
    const posterFile = posterInput.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("genre", genre);
    formData.append("rating", rating);
    formData.append("duration", duration);
    if (posterFile) {
      formData.append("poster", posterFile);
    }

    try {
      const response = await fetch("http://localhost:3000/api/movies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      movieForm.reset();
      posterImg.src = "";
      posterImg.style.display = "none";
      fetchMovies();
    } catch (error) {
      errorMessage.textContent = `Error: ${error.message}`;
    }
  }

  movieForm.addEventListener("submit", handleFormSubmit);
  posterInput.addEventListener("change", () => {
    const file = posterInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        posterImg.src = reader.result;
        posterImg.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      posterImg.src = "";
      posterImg.style.display = "none";
    }
  });
});
