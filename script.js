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

// Hàm hiển thị thông báo
function showNotification(message, isSuccess) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    notification.classList.add('show');
    notification.classList.add(isSuccess ? 'success' : 'error');
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
        notification.classList.remove(isSuccess ? 'success' : 'error');
    }, 3000);
}

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
            userCredential.user.updateProfile({
                displayName: email.split('@')[0]
            }).then(() => {
                showNotification('Đăng Ký Thành Công ✅', true);
                signupForm.reset();
                setTimeout(() => {
                    loginFormBox.classList.remove('hidden');
                    signupFormBox.classList.add('hidden');
                }, 3000); // Chờ 3 giây để thông báo hiển thị
            });
        })
        .catch((error) => {
            showNotification('Đăng Ký Thất Bại ❌', false);
        });
});

// Xử lý đăng nhập
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showNotification('Đăng Nhập Thành Công ✅', true);
            loginForm.reset();
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000); // Chờ 3 giây để thông báo hiển thị
        })
        .catch((error) => {
            showNotification('Đăng Nhập Thất Bại ❌', false);
        });
});

// Xử lý quên mật khẩu
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-password-email').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            showNotification('Gửi Link Đặt Lại Mật Khẩu Thành Công ✅', true);
            forgotPasswordForm.reset();
            setTimeout(() => {
                loginFormBox.classList.remove('hidden');
                forgotPasswordFormBox.classList.add('hidden');
            }, 3000); // Chờ 3 giây để thông báo hiển thị
        })
        .catch((error) => {
            showNotification('Gửi Link Đặt Lại Mật Khẩu Thất Bại ❌', false);
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
