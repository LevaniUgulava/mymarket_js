fetch('http://127.0.0.1:8000/api/maincategory')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responsedata => {
        // Check if the response contains the expected data
        if (responsedata && Array.isArray(responsedata)) {
            responsedata.forEach(element => {
                const searchcategory = document.getElementById('searchcategory');
                const search = document.createElement('div');
                search.classList.add('checkbox-options')
                searchcategory.appendChild(search);
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = element.name;
                input.name = element.name;
                input.value = element.id;
                const label = document.createElement('label');
                label.htmlFor = element.name;
                label.textContent = element.name;
                search.appendChild(input);
                search.appendChild(label);
            });
        } else {
            console.error("Response data is missing or malformed.");
        }
    })
    .catch(err => {
        console.error('There was a problem with the fetch operation:', err);
    });




    
    