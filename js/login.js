document.querySelector('#loginform').addEventListener('submit', login);


function login(e){
    e.preventDefault();

      const email =document.getElementById('email').value;
      const password =document.getElementById('password').value;
 
      const data={
        email:email,
        password:password
      }
    
const token = localStorage.getItem('token');

fetch('http://127.0.0.1:8000/api/login',{
method:'POST',
headers: {
    'Authorization':`Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
},
body:JSON.stringify(data)
})
.then(response =>{
return response.json()
})
.then(res =>{
    localStorage.setItem('token',res.token)
    localStorage.setItem('username',res.name)
    window.location.href="main/main.html";
})
.catch(err =>{
    console.log(err)
})
}
