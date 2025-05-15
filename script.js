const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const forgotPasswordForm = document.getElementById('forgot-password');
const loginFormBox = document.getElementById('login-form');
const signupFormBox = document.getElementById('signup-form');
const forgotPasswordFormBox = document.getElementById('forgot-password-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const showForgotPassword = document.getElementById('show-forgot-password');
const showLoginFromForgot = document.getElementById('show-login-from-forgot');

// Chuyển đổi giữa các form
showSignup.addEventListener('click', () => {
    loginFormBox.classList.add('hidden');
    signupFormBox.classList.remove('hidden');
    forgotPasswordFormBox.classList.add('hidden');
});

showLogin.addEventListener('click', () => {
    signupFormBox.classList.add('hidden');
    loginFormBox.classList.remove('hidden');
    forgotPasswordFormBox.classList.add('hidden');
});

showForgotPassword.addEventListener('click', () => {
    loginFormBox.classList.add('hidden');
    forgotPasswordFormBox.classList.remove('hidden');
    signupFormBox.classList.add('hidden');
});

showLoginFromForgot.addEventListener('click', () => {
    forgotPasswordFormBox.classList.add('hidden');
    loginFormBox.classList.remove('hidden');
    signupFormBox.classList.add('hidden');
});

// Xử lý đăng ký
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Cập nhật tên người dùng (email) sau khi đăng ký
            userCredential.user.updateProfile({
                displayName: email.split('@')[0] // Lấy phần trước @ làm tên
            }).then(() => {
                alert('Đăng ký thành công!');
                signupForm.reset();
                loginFormBox.classList.remove('hidden');
                signupFormBox.classList.add('hidden');
            });
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
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Lỗi: ' + error.message);
        });
});

// Xử lý quên mật khẩu
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-password-email').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Link đặt lại mật khẩu đã được gửi đến email của bạn!');
            forgotPasswordForm.reset();
            loginFormBox.classList.remove('hidden');
            forgotPasswordFormBox.classList.add('hidden');
        })
        .catch((error) => {
            alert('Lỗi: ' + error.message);
        });
});

// Hàm ẩn/hiện mật khẩu
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
                                     }
