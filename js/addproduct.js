fetch('http://127.0.0.1:8000/api/maincategory')
    .then(response => {return response.json()})
    .then(responsedata => {
    const selectcontainer = document.getElementById('select-container');
    const container =document.createElement('div');

    const label = document.createElement('label');
    label.setAttribute('for','maincategory')
    label.innerText="Maincategory"

    const select = document.createElement('select');
    select.setAttribute('id','maincategory')
    select.setAttribute('name','maincategory');

    const def = document.createElement('option');
    def.setAttribute('value','');
    def.setAttribute('selected','selected');
    def.innerText="Select..."
    responsedata.forEach(element => {
        const option= document.createElement('option');
        option.setAttribute('value',element.id);
        option.innerText=`${element.name}`

        select.appendChild(option);
        select.appendChild(def)
    });
    container.appendChild(label)
    container.appendChild(select)
    selectcontainer.appendChild(container)

   

 
        
     })
    .catch(err => console.log(err));


fetch('http://127.0.0.1:8000/api/category')
.then(response => {return response.json()})
.then(responsedata =>{
    const selectcontainer = document.getElementById('select-container');
    const container =document.createElement('div');

    const label = document.createElement('label');
    label.setAttribute('for','category')
    label.innerText="Category"
    const select = document.createElement('select');
    select.setAttribute('id','category')
    select.setAttribute('name','category');

    const def = document.createElement('option');
    def.setAttribute('value','');
    def.setAttribute('selected','selected');
    def.innerText="Select..."
    
       responsedata.forEach(element => {
            const option= document.createElement('option');
            option.setAttribute('value',element.id);
            option.innerText=`${element.name}`

        select.appendChild(option);
        
        select.appendChild(def)

    });
    container.appendChild(label)
    container.appendChild(select)
    selectcontainer.appendChild(container)


 

})
.catch(err => console.log(err))



fetch('http://127.0.0.1:8000/api/subcategory')
.then(response => {return response.json()})
.then(responsedata =>{
    const selectcontainer = document.getElementById('select-container');
    const container =document.createElement('div');

    const label = document.createElement('label');
    label.setAttribute('for','subcategory')
    label.innerText="subcategory"

    const select = document.createElement('select');
    select.setAttribute('id','subcategory')
    select.setAttribute('name','subcategory');

    const def = document.createElement('option');
    def.setAttribute('value','');
    def.setAttribute('selected','selected');
    def.innerText="Select..."
    

    responsedata.forEach(element => {
        const option= document.createElement('option');
        option.setAttribute('value',element.id);
        option.innerText=`${element.name}`

        select.appendChild(option);
        select.appendChild(def)
    });
    container.appendChild(label)
    container.appendChild(select)
    selectcontainer.appendChild(container)


})
.catch(err => console.log(err))



document.getElementById('addproductform').addEventListener('submit', addProduct);

function addProduct(e) {
    e.preventDefault();

    const maincategoryId = document.getElementById('maincategory').value;
    const categoryId = document.getElementById('category').value;
    const subcategoryId = document.getElementById('subcategory').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const number = document.getElementById('number').value;
    const imageFile = document.getElementById('image').files[0]; 

    const formData = new FormData();
    formData.append('images', imageFile);
    formData.append('name',name);
    formData.append('description',description);
    formData.append('price',price);
    formData.append('maincategory_id',maincategoryId);
    formData.append('category_id',categoryId);
    formData.append('subcategory_id',subcategoryId);
    formData.append('number',number);




    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/addproduct', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    body: formData
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(responseData => {
    const message=document.querySelector('.message');
    const div=document.createElement('div');
    div.innerText=responseData.message;
    message.appendChild(div);
})
.catch(error => {
    console.error('Error adding product:', error);
});

}
