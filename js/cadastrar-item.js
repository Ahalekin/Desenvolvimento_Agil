// Bloqueia acesso se não estiver logado
if (localStorage.getItem('usuarioLogado') !== 'true') {
  window.location.href = 'index.html';
}
// Permite cadastrar se for admin OU se tiver permissão de cadastrar
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogadoInfo') || 'null');
if (
  !usuarioLogado ||
  (
    usuarioLogado.tipo !== 'admin' &&
    usuarioLogado.email !== 'admin@utfpr.edu.br' &&
    !(usuarioLogado.permissoes && usuarioLogado.permissoes.cadastrar)
  )
) {
  alert('Você não tem permissão para cadastrar itens.');
  window.location.href = 'dashboard.html';
}
document.getElementById('formNovoItem').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const codigo = document.getElementById('codigo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const quantidadeIdeal = parseInt(document.getElementById('quantidadeIdeal').value, 10);

  // Validação dos campos obrigatórios com mensagens específicas
  if (!nome) {
    alert('O campo Nome do Item é obrigatório.');
    document.getElementById('nome').focus();
    return;
  }
  if (!codigo) {
    alert('O campo Código do Item é obrigatório.');
    document.getElementById('codigo').focus();
    return;
  }
  if (!descricao) {
    alert('O campo Descrição é obrigatório.');
    document.getElementById('descricao').focus();
    return;
  }
  if (!categoria) {
    alert('O campo Categoria é obrigatório.');
    document.getElementById('categoria').focus();
    return;
  }
  if (isNaN(quantidade)) {
    alert('O campo Quantidade Inicial é obrigatório.');
    document.getElementById('quantidade').focus();
    return;
  }
  if (isNaN(quantidadeIdeal)) {
    alert('O campo Quantidade Ideal é obrigatório.');
    document.getElementById('quantidadeIdeal').focus();
    return;
  }
  // Validação do código: deve ser inteiro positivo
  if (!/^\d+$/.test(codigo)) {
    alert('O campo Código do Item deve ser um número inteiro.');
    document.getElementById('codigo').focus();
    return;
  }

  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  // Não permitir códigos duplicados (comparação como string e número)
  if (estoque.some(item => String(item.codigo) === codigo)) {
    alert('Já existe um item com este código.');
    document.getElementById('codigo').focus();
    return;
  }
  // Salva o código como inteiro
  estoque.push({ nome, codigo: parseInt(codigo, 10), descricao, categoria, quantidade, quantidadeIdeal });
  localStorage.setItem('estoque', JSON.stringify(estoque));
  // Registrar histórico de cadastro
  if (typeof window.registrarHistorico === 'function') {
    window.registrarHistorico('Cadastro', { nome, codigo: parseInt(codigo, 10), descricao, categoria, quantidade, quantidadeIdeal });
  } else {
    // Implementação local do histórico caso não exista
    let historico = JSON.parse(localStorage.getItem('historicoEstoque')) || [];
    historico.push({ acao: 'Cadastro', data: new Date().toISOString(), item: { nome, codigo: parseInt(codigo, 10), descricao, categoria, quantidade, quantidadeIdeal } });
    localStorage.setItem('historicoEstoque', JSON.stringify(historico));
  }
  alert('Item cadastrado com sucesso!');
  window.location.href = 'dashboard.html';
});
