'use strict';

const form = document.querySelector('#inviter-detais');
const navigation = document.querySelectorAll('small');
const userInputs = document.querySelectorAll('.user-value');
const addBtn = document.querySelector('#add');
const userContainer = document.querySelector('.list-inviters');

const validations = {
    mail: /^[a-zA-Z0-9]+@gmail(\.com|\.co|\.in|\.org)$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    phone: /^\d{10}$/
};

let storage = JSON.parse(localStorage.getItem('details')) || [];
let inviteEmails = [];

function validate(input, regex, errorElement, errorMessage) {
    if (regex.test(input)) {
        errorElement.style.display = 'none';
        return input;
    } else {
        errorElement.style.display = 'block';
        errorElement.textContent = errorMessage;
        return;
    }
}

function appendInviters(inviteMail) {
    const li = document.createElement('li');
    li.className = 'list';
    li.innerHTML = `${inviteMail} <i class="fa-solid fa-xmark"></i>`;

    userContainer.appendChild(li);
    li.querySelector('i').addEventListener('click', () => li.remove());
}

if (addBtn) {
    addBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const inviteMail = form.querySelector('#invite-id').value.trim();
        const inviteMailError = navigation[3];

        if (inviteMail && validate(inviteMail, validations.mail, inviteMailError, 'Please enter a valid Gmail address')) {
            appendInviters(inviteMail);
            inviteEmails.push(inviteMail);
            form.querySelector('#invite-id').value = ''; 
        }
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(inviteEmails);
    userInputs.forEach((nav, i) => {
        if (nav.value === '') { 
            navigation[i].style.display = 'block';  
        } else {
            navigation[i].style.display = 'none'; 
        }
    });
    
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('pass');
    const phone = formData.get('number');

    const emailError = navigation[1];
    const passwordError = navigation[2];
    const phoneError = navigation[4];

    const validatedEmail = validate(email, validations.mail, emailError, 'Please enter a valid Gmail address');
    const validatedPassword = validate(password, validations.password, passwordError, 'Password must be at least 8 characters, including one letter and one number');
    const validatedPhone = validate(phone, validations.phone, phoneError, 'Please enter a valid 10-digit phone number');

    if (formData.get('invite-email')!=='') {
        inviteEmails.push(formData.get('invite-email'));
    }

    if (validatedEmail && validatedPassword && validatedPhone) {
        storage.push({
            Name: formData.get('name'),
            Email: validatedEmail,
            Password: validatedPassword,
            Inviters: inviteEmails.join(' , '), 
            Role: formData.get('position'),
            Number: validatedPhone,
            Address: formData.get('address'),
            Location: formData.get('location')
        });

        localStorage.setItem('details', JSON.stringify(storage)); 
        inviteEmails = [];
        userContainer.innerHTML = '';

        form.reset();
    }
    
});
