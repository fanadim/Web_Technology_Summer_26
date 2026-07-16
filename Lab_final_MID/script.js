let passwordAttempts = 0;
const MAX_ATTEMPTS = 3;

const form = document.getElementById('registrationForm');
const successMsg = document.getElementById('success-message');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

function clearErrorsAndStatus() {
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach(span => span.textContent = '');
    successMsg.classList.add('hidden');
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrorsAndStatus();

    let isValid = true;

    const firstName = document.getElementById('firstName').value.trim();
    const alphaRegex = /^[A-Za-z]+$/;
    if (firstName === '') {
        document.getElementById('firstNameError').textContent = 'First name is required.';
        isValid = false;
    } else if (!alphaRegex.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'First name must contain alphabets only.';
        isValid = false;
    }

    const lastName = document.getElementById('lastName').value.trim();
    if (lastName === '') {
        document.getElementById('lastNameError').textContent = 'Last name is required.';
        isValid = false;
    } else if (!alphaRegex.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Last name must contain alphabets only.';
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === '' || confirmPassword === '') {
        if (password === '') document.getElementById('passwordError').textContent = 'Password is required.';
        if (confirmPassword === '') document.getElementById('confirmPasswordError').textContent = 'Please confirm your password.';
        isValid = false;
    } else if (password !== confirmPassword) {
        passwordAttempts++;
        isValid = false;
        
        if (passwordAttempts >= MAX_ATTEMPTS) {
            document.getElementById('confirmPasswordError').textContent = `Passwords do not match. Max attempts reached (${MAX_ATTEMPTS}/3). Form Locked.`;
            submitBtn.disabled = true;
        } else {
            document.getElementById('confirmPasswordError').textContent = `Passwords do not match. Attempt ${passwordAttempts} of ${MAX_ATTEMPTS}.`;
        }
    }

    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        document.getElementById('genderError').textContent = 'Please select a gender option.';
        isValid = false;
    }

    const servicesSelected = document.querySelectorAll('input[name="services"]:checked');
    if (servicesSelected.length === 0) {
        document.getElementById('servicesError').textContent = 'Please select at least one preferred service.';
        isValid = false;
    }

    const department = document.getElementById('department').value;
    if (department === '') {
        document.getElementById('departmentError').textContent = 'Please select a valid medical department.';
        isValid = false;
    }

    const description = document.getElementById('description').value.trim();
    if (description.length < 20) {
        document.getElementById('descriptionError').textContent = `Please enter a more detailed health description (Minimum 20 characters required. Current: ${description.length}).`;
        isValid = false;
    }

    if (isValid) {
        successMsg.classList.remove('hidden');
        form.reset();
        passwordAttempts = 0; 
    }
});

resetBtn.addEventListener('click', function() {
    form.reset();
    clearErrorsAndStatus();
    passwordAttempts = 0;
    submitBtn.disabled = false;
});