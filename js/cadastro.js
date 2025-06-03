// Cria o admin padrão se não existir
(function criarAdminPadrao() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (!usuarios.find(u => u.email === 'admin@utfpr.edu.br')) {
    usuarios.push({ nome: 'Administrador', email: 'admin@utfpr.edu.br', senha: '1234', tipo: 'admin' });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
})();

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const msg = document.getElementById('msgCadastro');
  msg.style.display = 'none';

  // Permissões
  const perm_cadastrar = document.getElementById('perm_cadastrar')?.checked;
  const perm_editar = document.getElementById('perm_editar')?.checked;
  const perm_excluir = document.getElementById('perm_excluir')?.checked;

  // Validação dos campos obrigatórios
  if (!nome) {
    msg.textContent = 'O nome é obrigatório.';
    msg.style.display = 'block';
    return;
  }
  if (!email) {
    msg.textContent = 'O e-mail é obrigatório.';
    msg.style.display = 'block';
    return;
  }
  if (!senha) {
    msg.textContent = 'A senha é obrigatória.';
    msg.style.display = 'block';
    return;
  }
  if (senha.length < 6 && email !== 'admin@utfpr.edu.br') {
    msg.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    msg.style.display = 'block';
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.find(u => u.email === email)) {
    msg.textContent = 'E-mail já cadastrado!';
    msg.style.display = 'block';
    return;
  }

  // Permissões: só admin pode cadastrar outros usuários
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogadoInfo') || 'null');
  if (
    !usuarioLogado ||
    (usuarioLogado.tipo !== 'admin' && usuarioLogado.email !== 'admin@utfpr.edu.br')
  ) {
    msg.textContent = 'Apenas administradores podem cadastrar novos usuários.';
    msg.style.display = 'block';
    return;
  }

  // Permite criar subordinado (tipo: user) ou outro admin (tipo: admin)
  let tipo = 'user';
  if (email.endsWith('@utfpr.edu.br')) {
    tipo = 'admin';
  }
  // Salva permissões customizadas para o usuário
  const permissoes = {
    cadastrar: !!perm_cadastrar,
    editar: !!perm_editar,
    excluir: !!perm_excluir
  };
  usuarios.push({ nome, email, senha, tipo, permissoes });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  msg.textContent = 'Cadastro realizado com sucesso!';
  msg.style.background = '#388e3c';
  msg.style.color = '#e8f5e9';
  msg.style.display = 'block';
  setTimeout(() => window.location.href = 'dashboard.html', 1200);
});
