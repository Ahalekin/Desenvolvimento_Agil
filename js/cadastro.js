document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const msg = document.getElementById('msgCadastro');
  if (!nome || !email || !senha) return;
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.find(u => u.email === email)) {
    msg.textContent = 'E-mail já cadastrado!';
    msg.style.display = 'block';
    return;
  }
  usuarios.push({ nome, email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  msg.textContent = 'Cadastro realizado com sucesso! Faça login.';
  msg.style.background = '#388e3c';
  msg.style.color = '#e8f5e9';
  msg.style.display = 'block';
  setTimeout(() => window.location.href = 'index.html', 1200);
});
