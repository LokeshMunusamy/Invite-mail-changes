'use strict';

let storage = JSON.parse(localStorage.getItem('details')) || [];

const listRow = document.querySelector('.list-row');

function removeUser(index) {
   
    storage = storage.filter((user, i) => i !== index);
   
    localStorage.setItem('details', JSON.stringify(storage));

    userList();
}

function userList() {

    listRow.innerHTML = '';

    storage.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.Name}</td>
            <td>${user.Email}</td>
            <td>${user.Password}</td>
            <td>${user.Role}</td>
            <td>${user.Number}</td>
            <td>${user.Address}</td>
            <td>${user.Location}</td>
            <td>${user.Inviters}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        
        listRow.appendChild(row);
    });
   
    document.querySelectorAll('.delete-btn').forEach((button,index) => {
        button.addEventListener('click', function() {  
            removeUser(index);
        });
    });
    
}

userList();
