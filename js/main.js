document.addEventListener("DOMContentLoaded", () => {
  displayData("http://127.0.0.1:8000/api/display");
});

document
  .querySelector("#searchFormContainer")
  .addEventListener("submit", search);

document
  .querySelector("#searchcategory")
  .addEventListener("change", searchbycategory);

function searchbycategory(e) {
  const id = e.target.value;
  fetch(`http://127.0.0.1:8000/api/Searchcategory/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((responsedata) => {
      if (e.target.checked) {
        displaySearchResults(responsedata);
      } else {
        window.location.reload();
      }
    })
    .catch((err) => console.log(err));
}

function search(e) {
  e.preventDefault();
  const name = document.getElementById("search").value;

  fetch("http://127.0.0.1:8000/api/Search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  })
    .then((response) => response.json())
    .then((responsedata) => {
      displaySearchResults(responsedata);
    })
    .catch((err) => console.error("Error searching:", err));
}

function displaySearchResults(data) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear existing cards

  data.data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="card-body" style='border: 1px solid black; border-radius: 5px; padding: 10px; margin: 10px;'>
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
            </div>
             <button class="like" value="${element.id}" >Like</button>

        `;

    cardContainer.appendChild(card);

    const token = localStorage.getItem("token");
    const classy = document.querySelector(".like");
    const id = classy.getAttribute("value");
    card.querySelector(".like").addEventListener("click", function () {
      fetch(`http://127.0.0.1:8000/api/like/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          const messageretrun = responseData.message;
          const div = document.querySelector(".message");
          const div2 = document.createElement("div");
          div2.innerText = messageretrun;
          div.appendChild(div2);
        })
        .catch((err) => console.error("Error liking:", err));
    });
  });
}

function displayData(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseData) => {
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = "";
      responseData.data.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                <div class="card-body" style='border: 1px solid black; border-radius: 5px; padding: 10px; margin: 10px;'>
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                </div>  
                <button class="like" value="${element.id}" >Like</button>

            `;

        cardContainer.appendChild(card);

        const token = localStorage.getItem("token");
        const classy = document.querySelector(".like");
        const id = classy.getAttribute("value");
        card.querySelector(".like").addEventListener("click", function () {
          fetch(`http://127.0.0.1:8000/api/like/${id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((responseData) => {
              const messageretrun = responseData.message;
              const div = document.querySelector(".message");
              const div2 = document.createElement("div");
              div2.innerText = messageretrun;
              div.appendChild(div2);
              setTimeout(() => {
                window.location.reload();
              }, 700);
            })
            .catch((err) => console.error("Error liking:", err));
        });
      });

      loginprofile();
    })
    .catch((err) => console.error("Error fetching initial data:", err));
}

function loginprofile() {
  const loginbtn = document.querySelector(".loginbtn");
  if (localStorage.getItem("token")) {
    const username = localStorage.getItem("username");
    loginbtn.innerHTML = `<i class="fa-regular fa-user"></i> ${username}`;
  } else {
    loginbtn.innerHTML = '<i class="fa-regular fa-user"></i> Login';
  }
}
