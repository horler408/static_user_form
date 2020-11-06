const loginBtn = document.getElementById('login-btn');
const BASE_URL = 'http://localhost:5000/'

const getRequest = async () => {
    const response = await fetch(`${BASE_URL}/dashboard`)
    const data = await response.json()
    const token = data.token
    const name = data.name

    localStorage.setItem('token', token);
    const info = localStorage.getItem('token');
}

//loginBtn.addEventListener('click', getRequest)

//document.body.onload = localStorage.setItem('token', token)


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
