
let tableElement = document.getElementById('table');
let imgElement = document.getElementsByTagName('img')[0];
let token = localStorage.getItem('token');

if(!token){
    location.href = 'index.html'
}

login();
async function login(username, password){
    try{
        const response = await fetch("https://dummyjson.com/user/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response);
        const data = await response.json();
        console.log(data);
        if(!response.ok){
            throw new Error(data.message)
        }

        ({firstName, lastName, username, email, gender, age, phone}=data)
        console.log(firstName)
       
        imgElement.src = data.image;
        let html = `
            <tbody>
                <tr>
                    <td class="table-cell">First name</td>
                    <td class="table-cell">${firstName}</td>
                </tr>
                <tr>
                    <td class="table-cell">Last name</td>
                    <td class="table-cell">${lastName}</td>
                </tr>
                <tr>
                    <td class="table-cell">Username</td>
                    <td class="table-cell">${username}</td>
                </tr>
                <tr>
                    <td class="table-cell">Email</td>
                    <td class="table-cell">${email}</td>
                </tr>
                <tr>
                    <td class="table-cell">Gender</td>
                    <td class="table-cell">${gender}</td>
                </tr>
                <tr>
                    <td class="table-cell">age</td>
                    <td class="table-cell">${age}</td>
                </tr>
            
                <tr>
                    <td class="table-cell">phone</td>
                    <td class="table-cell">${phone}</td>
                </tr>
            </tbody>
        `
        tableElement.insertAdjacentHTML('beforeend', html);
    }
    catch(error){
        console.error(error);
    }
}
