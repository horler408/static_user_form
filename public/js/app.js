// const firstName = document.getElementById('fname');
// const lastName = document.getElementById('lname');
// const email = document.getElementById('email');
// const password = document.getElementById('pswd');
// const confirmPassword = document.getElementById('confirm-pswd')
// const registerForm = document.querySelector('.register_form')
const token = document.querySelector('.token')


token.innerHTML = localStorage.setItem('token', token)
document.body.onload = localStorage.setItem('token', token)

const info = localStorage.getItem('token')


//Validation
function validateForm() {
    const { first_name, last_name, email, phone, password } = req.body
    let errors = []
    if(!first_name || !last_name || !email || !password) {
        errors.push({msg: '*Please enter all fields'})
    }
    if(password != confirm_password ) {
        errors.push({msg: 'Passwords do not match'})
    }
    if(password.length > 0) {
        errors.push({msg: 'Password must be atleast 6 character long'})
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            first_name,
            last_name,
            email,
        })
    }

}
