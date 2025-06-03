// Cria admin padrão se não existir
(function criarAdminPadrao() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (!usuarios.find(u => u.email === 'admin@utfpr.edu.br')) {
    usuarios.push({ nome: 'Administrador', email: 'admin@utfpr.edu.br', senha: '1234', tipo: 'admin' });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
})();

// Se já estiver logado, redireciona para o dashboard
if (localStorage.getItem('usuarioLogado') === 'true') {
  window.location.href = 'dashboard.html';
}
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const msgErro = document.getElementById('msgErro');
  msgErro.style.display = 'none';

  // Validação dos campos obrigatórios
  if (!email) {
    msgErro.textContent = 'O e-mail é obrigatório.';
    msgErro.style.display = 'block';
    return;
  }
  if (!senha) {
    msgErro.textContent = 'A senha é obrigatória.';
    msgErro.style.display = 'block';
    return;
  }

  // Busca usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    localStorage.setItem('usuarioLogado', 'true');
    localStorage.setItem('usuarioLogadoInfo', JSON.stringify(usuario));
    window.location.href = 'dashboard.html';
  } else {
    msgErro.textContent = 'Usuário ou senha inválidos.';
    msgErro.style.display = 'block';
  }
});
