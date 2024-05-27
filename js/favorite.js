const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:8000/api/likeproduct", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
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
             <button class="like" value="${element.id}" >UnLike</button>
        `;
        cardContainer.appendChild(card);

        const token = localStorage.getItem("token");
        const classy = document.querySelector(".like");
        const id = classy.getAttribute("value");
        card.querySelector(".like").addEventListener("click", function () {
          fetch(`http://127.0.0.1:8000/api/unlike/${id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((responseData) => {
              window.location.reload();
            })
            .catch((err) => console.error("Error liking:", err));
        });
      });

      loginprofile();
    })
    .catch((err) => console.log(err));
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
