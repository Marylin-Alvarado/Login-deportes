// Utilizar localStorage para persistencia de usuarios
function getUsers() {
    const data = localStorage.getItem('loginDeportesUsers');
    if (data) return JSON.parse(data);
    // Usuario por defecto
    return [{
        name: 'Deportista',
        email: 'deportista@email.com',
        password: '1234'
    }];
}
function saveUsers(users) {
    localStorage.setItem('loginDeportesUsers', JSON.stringify(users));
}

let users = getUsers();

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const message = document.getElementById('message');
    const darkSwitch = document.getElementById('darkmode-switch');
    const loginContainer = document.getElementById('login-container');

    function renderLogin() {
        loginContainer.innerHTML = `
            <div class="login-avatar">
                <i class="fa fa-user-circle"></i>
            </div>
            <h2 class="login-title">Member Login</h2>
            <form id="login-form">
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-envelope"></i></span>
                    <input type="email" name="email" placeholder="Email" required>
                </div>
                <div class="input-group password-group">
                    <span class="input-icon"><i class="fa fa-lock"></i></span>
                    <input type="password" name="pass" placeholder="Password" required id="login-password">
                    <span class="toggle-password" data-target="login-password"><i class="fa fa-eye"></i></span>
                </div>
                <div class="login-options">
                    <label><input type="checkbox"> Remember me</label>
                    <a href="#" class="forgot">Forgot Password?</a>
                </div>
                <button type="submit" class="login-btn">Login</button>
                <div class="register-link">
                    Not a member? <a href="#" id="show-register">Create an account</a>
                </div>
            </form>
            <form id="register-form" style="display:none;">
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-user"></i></span>
                    <input type="text" name="newuser" placeholder="Name" required>
                </div>
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-envelope"></i></span>
                    <input type="email" name="email" placeholder="Email" required>
                </div>
                <div class="input-group password-group">
                    <span class="input-icon"><i class="fa fa-lock"></i></span>
                    <input type="password" name="newpass" placeholder="Password" required id="register-password">
                    <span class="toggle-password" data-target="register-password"><i class="fa fa-eye"></i></span>
                </div>
                <button type="submit" class="login-btn">Register</button>
                <div class="register-link">
                    Already have an account? <a href="#" id="show-login">Login</a>
                </div>
            </form>
            <div id="message"></div>
        `;
        attachEvents();
    }

    function attachEvents() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const showRegister = document.getElementById('show-register');
        const showLogin = document.getElementById('show-login');
        const message = document.getElementById('message');

        if(showRegister) {
            showRegister.addEventListener('click', function(e) {
                e.preventDefault();
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
                message.textContent = '';
            });
        }
        if(showLogin) {
            showLogin.addEventListener('click', function(e) {
                e.preventDefault();
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                message.textContent = '';
            });
        }

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginForm.email.value;
            const pass = loginForm.pass.value;
            const user = users.find(u => u.email === email && u.password === pass);
            if(user) {
                loginContainer.innerHTML = `<div class='login-avatar'><i class='fa fa-user-circle'></i></div><h2 class='login-title'>¡Bienvenido, ${user.name}!</h2><p style='color:var(--text-main);font-size:1.1rem;'>Has iniciado sesión correctamente.</p><button id='logout-btn' class='login-btn' style='margin-top:1.5rem;'>Cerrar sesión</button>`;
                document.getElementById('logout-btn').addEventListener('click', function() {
                    renderLogin();
                });
            } else {
                message.textContent = 'Correo o contraseña incorrectos';
                message.style.color = 'red';
            }
        });

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = registerForm.newuser.value;
            const email = registerForm.email.value;
            const pass = registerForm.newpass.value;
            if(users.some(u => u.email === email)) {
                message.textContent = 'El correo ya está registrado.';
                message.style.color = 'red';
                return;
            }
            users.push({ name, email, password: pass });
            saveUsers(users);
            message.textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
            message.style.color = 'green';
            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                message.textContent = '';
            }, 1500);
        });

        // Mostrar/ocultar contraseña
        document.querySelectorAll('.toggle-password').forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                if(input.type === 'password') {
                    input.type = 'text';
                    this.innerHTML = '<i class="fa fa-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    this.innerHTML = '<i class="fa fa-eye"></i>';
                }
            });
        });
    }

    // Inicializar eventos y renderizado
    attachEvents();

    // Modo oscuro
    if(darkSwitch) {
        darkSwitch.addEventListener('change', function() {
            if(this.checked) {
                document.body.classList.add('darkmode');
            } else {
                document.body.classList.remove('darkmode');
            }
        });
    }
});
