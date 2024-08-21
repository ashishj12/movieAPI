document.addEventListener("DOMContentLoaded", () => {
  const getMoviesButton = document.getElementById("get-movies");
  const movieList = document.getElementById("movies");
  const errorMessage = document.getElementById("error-message");
  const movieForm = document.getElementById("movie-form");
  const posterInput = document.getElementById("poster");
  const posterImg = document.getElementById("poster-img");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  //intialize current and total page in movies list
  let currentPage = 1;
  let totalPages = 1;

  //fetch movies list with passing page and limit
  async function fetchMovies(page = 1, limit = 5) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies?page=${page}&limit=${limit}`
      );

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

          //append poster object (poster url)
          const posterImg = document.createElement("img");
          posterImg.src = movie.posterUrl ? movie.posterUrl : "";
          posterImg.alt = movie.title;
          posterImg.classList.add("poster-img");
          //append movietext and poster image
          li.appendChild(movieText);
          li.appendChild(posterImg);
          movieList.appendChild(li);
        });
      }
      //control pagination
      function updatePaginationControls(page, totalPageCount) {
        currentPage = page;
        totalPages = totalPageCount;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        prevButton.addEventListener("click", () =>
          fetchMovies(currentPage - 1)
        );
        nextButton.addEventListener("click", () =>
          fetchMovies(currentPage + 1)
        );
        if (totalPageCount > 1) {
          document.querySelector(".pagination").style.display = "flex";
        } else {
          document.querySelector(".pagination").style.display = "none";
        }
      }
      //update total pages
      updatePaginationControls(page, data.totalPages);
    } catch (error) {
      errorMessage.textContent = `Error: ${error.message}`;
    }
  }
  //redirect getmovies list
  getMoviesButton.addEventListener("click", () => {
    window.location.href = "movies.html";
  });

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
      fetchMovies(currentPage);
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
