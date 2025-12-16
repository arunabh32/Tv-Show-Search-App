const form = document.querySelector("#searchform");
const input = document.querySelector("#search-input");
const resultContainer = document.querySelector("#results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = input.value.trim();
  if (!searchTerm) return;

  resultContainer.innerHTML = "";

  try {
    const config = { params: { q: searchTerm } };
    const res = await axios.get(
      "https://api.tvmaze.com/search/shows",
      config
    );

    for (let item of res.data) {
      const show = item.show;
      if (!show.image) continue;

      const card = document.createElement("div");
      card.className = "flip-card";

      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${show.image.medium}" alt="${show.name}">
          </div>
          <div class="flip-card-back">
            <h3>${show.name}</h3>
            <p><strong>Rating:</strong> ${show.rating.average ?? "N/A"}</p>
            <p>${show.genres.length ? show.genres.join(", ") : "No genres available"}</p>
          </div>
        </div>
      `;

      resultContainer.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    resultContainer.innerHTML =
      "<p style='color:white'>Something went wrong. Try again.</p>";
  }
});
