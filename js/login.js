// Se já estiver logado, redireciona para o dashboard
if (localStorage.getItem('usuarioLogado') === 'true') {
  window.location.href = 'dashboard.html';
}
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const msgErro = document.getElementById('msgErro');
  // Busca usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    localStorage.setItem('usuarioLogado', 'true');
    window.location.href = 'dashboard.html';
  } else {
    msgErro.textContent = 'Usuário ou senha inválidos.';
    msgErro.style.display = 'block';
  }
});
