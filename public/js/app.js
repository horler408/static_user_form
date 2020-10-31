const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('pswd');
const confirmPassword = document.getElementById('confirm-pswd')
const registerForm = document.querySelector('.register_form')

registerForm.addEventListener('submit', () => {
    if(firstName.value == '' && lastName.value == '' && email.value == '' && password.value == '') {
        alert('All necessary field must be filled')
        return false
    }

    if(password.length < 8) {
        alert('password must be atlest 8 characters long')
        return false
    }

    if(password.value === confirmPassword.value) {
        alert('Password must match')
        return false
    }
    else {
        return true
    }
})

function validateForm() {
    if(firstName.value == '' && lastName.value == '' && email.value == '' && password.value == '') {
        alert('All necessary field must be filled')
        return false
    }

    if(password.length < 8) {
        alert('password must be atlest 8 characters long')
        return false
    }

    if(password.value === confirmPassword.value) {
        alert('Password must match')
        return false
    }
}
