// Bloqueia acesso se não estiver logado
if (localStorage.getItem('usuarioLogado') !== 'true') {
  window.location.href = 'index.html';
}
document.getElementById('formNovoItem').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  if (!nome || isNaN(quantidade)) return;
  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  // Se já existe, atualiza; senão, adiciona
  const idx = estoque.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase());
  if (idx >= 0) {
    estoque[idx].descricao = descricao;
    estoque[idx].quantidade = quantidade;
  } else {
    estoque.push({ nome, descricao, quantidade });
  }
  localStorage.setItem('estoque', JSON.stringify(estoque));
  window.location.href = 'dashboard.html';
});
