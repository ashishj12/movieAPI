document.addEventListener("DOMContentLoaded", () => {
  const movieList = document.getElementById("movies");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  let currentPage = 1;
  let totalPages = 1;

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

          const posterImg = document.createElement("img");
          posterImg.src = movie.posterUrl ? movie.posterUrl : "";
          posterImg.alt = movie.title;
          posterImg.classList.add("poster-img");

          li.appendChild(movieText);
          li.appendChild(posterImg);
          movieList.appendChild(li);
        });
      }
      updatePaginationControls(page, data.totalPages);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  function updatePaginationControls(page, totalPageCount) {
    currentPage = page;
    totalPages = totalPageCount;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    if (totalPageCount > 1) {
      document.querySelector(".pagination").style.display = "flex";
    } else {
      document.querySelector(".pagination").style.display = "none";
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      fetchMovies(currentPage - 1);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      fetchMovies(currentPage + 1);
    }
  });

  // Fetch movies when the page loads
  fetchMovies();
});
