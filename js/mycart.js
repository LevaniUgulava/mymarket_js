document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:8000/api/mycart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((responsedata) => {
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = "";

      responsedata.data.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-body" style='border: 1px solid black; border-radius: 5px; padding: 10px; margin: 10px;'>
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.description}</p>
            </div>   
          `;
        cardContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML =
        "<p>Failed to load cart items. Please try again later.</p>";
    });

  loginprofile();
});

function loginprofile() {
  const loginbtn = document.querySelector(".loginbtn");
  if (localStorage.getItem("token")) {
    const username = localStorage.getItem("username");
    loginbtn.innerHTML = `<i class="fa-regular fa-user"></i> ${username}`;
  } else {
    loginbtn.innerHTML = '<i class="fa-regular fa-user"></i> Login';
  }
}
