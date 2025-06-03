// Bloqueia acesso se não estiver logado
if (localStorage.getItem('usuarioLogado') !== 'true') {
  window.location.href = 'index.html';
}
// Pega o nome do item pela query string
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const codigoItem = getQueryParam('codigo');
const nomeInput = document.getElementById('nome');
const codigoInput = document.getElementById('codigo');
const descricaoInput = document.getElementById('descricao');
const categoriaInput = document.getElementById('categoria');
const qtdInput = document.getElementById('quantidade');
const quantidadeIdealInput = document.getElementById('quantidadeIdeal');
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

// Corrige a busca do item: compara como string e número
let item = estoque.find(i =>
  String(i.codigo) === String(codigoItem) ||
  Number(i.codigo) === Number(codigoItem)
);

if (item) {
  nomeInput.value = item.nome || '';
  // Mostra o código como inteiro
  codigoInput.value = item.codigo !== undefined ? parseInt(item.codigo, 10) : '';
  descricaoInput.value = item.descricao || '';
  categoriaInput.value = item.categoria || '';
  qtdInput.value = item.quantidade !== undefined ? item.quantidade : '';
  quantidadeIdealInput.value = item.quantidadeIdeal !== undefined ? item.quantidadeIdeal : '';
}
// Permite editar apenas se for admin
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogadoInfo') || 'null');
if (
  !usuarioLogado ||
  (usuarioLogado.tipo !== 'admin' && usuarioLogado.email !== 'admin@utfpr.edu.br')
) {
  alert('Apenas administradores podem editar itens.');
  window.location.href = 'dashboard.html';
}
document.getElementById('formEditarItem').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!item) return;
  item.descricao = descricaoInput.value.trim();
  item.categoria = categoriaInput.value.trim();
  item.quantidade = parseInt(qtdInput.value, 10);
  item.quantidadeIdeal = parseInt(quantidadeIdealInput.value, 10);
  localStorage.setItem('estoque', JSON.stringify(estoque));
  // Registrar histórico de edição
  if (typeof window.registrarHistorico === 'function') {
    window.registrarHistorico('Edição', item);
  } else {
    let historico = JSON.parse(localStorage.getItem('historicoEstoque')) || [];
    historico.push({ acao: 'Edição', data: new Date().toISOString(), item: { ...item } });
    localStorage.setItem('historicoEstoque', JSON.stringify(historico));
  }
  alert('Item atualizado com sucesso!');
  window.location.href = 'dashboard.html';
});
