
document.querySelector('#registerform').addEventListener('submit',register)

function register(e){
    e.preventDefault();

const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const data = {
    name: name,
    email: email,
    password: password
};

fetch('http://127.0.0.1:8000/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    return response.json();
})
.then(responseData => {

        const messageDiv = document.querySelector('#messagediv'); // Selecting the div where the message will be inserted
        const message = document.createElement('div'); // Creating the message element
        message.classList.add('message'); // Adding class to the message element
        message.textContent = responseData.message; // Setting the message content
    
        messageDiv.appendChild(message); // Inserting the message before the form
    })
.catch(error => {
    console.error('Error:', error);
});

}
