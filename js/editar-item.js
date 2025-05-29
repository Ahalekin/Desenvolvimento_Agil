// Bloqueia acesso se não estiver logado
if (localStorage.getItem('usuarioLogado') !== 'true') {
  window.location.href = 'index.html';
}
// Pega o nome do item pela query string
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const nomeItem = getQueryParam('nome');
const nomeInput = document.getElementById('nome');
const qtdInput = document.getElementById('quantidade');
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
const item = estoque.find(i => i.nome === nomeItem);
if (item) {
  nomeInput.value = item.nome;
  qtdInput.value = item.quantidade;
}
document.getElementById('formEditarItem').addEventListener('submit', function(e) {
  e.preventDefault();
  const novaQtd = parseInt(qtdInput.value, 10);
  if (item && !isNaN(novaQtd)) {
    item.quantidade = novaQtd;
    localStorage.setItem('estoque', JSON.stringify(estoque));
  }
  window.location.href = 'dashboard.html';
});
