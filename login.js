document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.login-btn');
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');

  loginBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === 'kanchana' && password === '12345') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid username or password. Please try again.');
      passwordInput.value = '';
      passwordInput.focus();
    }
  });
});

