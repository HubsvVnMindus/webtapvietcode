const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const loginFormBox = document.getElementById('login-form');
const signupFormBox = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

// Chuyển đổi giữa form đăng nhập và đăng ký
showSignup.addEventListener('click', () => {
    loginFormBox.classList.add('hidden');
    signupFormBox.classList.remove('hidden');
});

showLogin.addEventListener('click', () => {
    signupFormBox.classList.add('hidden');
    loginFormBox.classList.remove('hidden');
});

// Xử lý đăng ký
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Đăng ký thành công!');
            signupForm.reset();
            loginFormBox.classList.remove('hidden');
            signupFormBox.classList.add('hidden');
        })
        .catch((error) => {
            alert('Lỗi: ' + error.message);
        });
});

// Xử lý đăng nhập
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Đăng nhập thành công!');
            loginForm.reset();
            // Chuyển hướng đến trang chính hoặc dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Lỗi: ' + error.message);
        });
});
