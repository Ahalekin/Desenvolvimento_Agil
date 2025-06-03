// Permissões de acesso
function isAdmin() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogadoInfo') || 'null');
  return usuarioLogado && (usuarioLogado.tipo === 'admin' || usuarioLogado.email === 'admin@utfpr.edu.br');
}

function temPermissao(acao) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogadoInfo') || 'null');
  if (!usuarioLogado) return false;
  if (isAdmin()) return true;
  if (!usuarioLogado.permissoes) return false;
  return !!usuarioLogado.permissoes[acao];
}

// Bloqueia ações de cadastro, edição e exclusão para não-admins
function aplicarPermissoes() {
  // Botão de adicionar item
  const btnAdd = document.querySelector('.fab-add-item');
  if (btnAdd) btnAdd.style.display = temPermissao('cadastrar') ? 'flex' : 'none';

  // Botão de adicionar colaborador
  const btnUser = document.querySelector('.fab-add-user');
  if (btnUser) btnUser.style.display = isAdmin() ? 'flex' : 'none';

  // Botão de histórico
  const btnHist = document.querySelector('.fab-historico');
  if (btnHist) btnHist.style.display = isAdmin() ? 'flex' : 'none';

  // Esconde botões de editar/excluir para não permitidos
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.style.display = temPermissao('editar') ? 'inline-flex' : 'none';
  });
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.style.display = temPermissao('excluir') ? 'inline-flex' : 'none';
  });
}

// Bloqueia acesso se não estiver logado
if (localStorage.getItem('usuarioLogado') !== 'true') {
  window.location.href = 'index.html';
}

function carregarEstoque(filtro = '') {
  const lista = document.getElementById('estoqueLista');
  const aviso = document.getElementById('avisoEstoqueVazio');
  const avisoAbaixoIdeal = document.getElementById('avisoAbaixoIdeal');
  lista.innerHTML = '';
  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  let notificacoes = [];

  // Filtro por nome, categoria ou código (corrigido para aceitar busca numérica e string)
  if (filtro) {
    const termo = filtro.trim().toLowerCase();
    estoque = estoque.filter(item =>
      (item.nome && item.nome.toLowerCase().includes(termo)) ||
      (item.categoria && item.categoria.toLowerCase().includes(termo)) ||
      (item.codigo !== undefined && item.codigo !== null &&
        (String(item.codigo).toLowerCase().includes(termo) || Number(item.codigo) === Number(termo)))
    );
  }

  if (estoque.length === 0) {
    aviso.style.display = 'block';
    if (avisoAbaixoIdeal) avisoAbaixoIdeal.style.display = 'none';
  } else {
    aviso.style.display = 'none';
    estoque.forEach((item, idx) => {
      // Notificação de estoque abaixo do ideal
      let qtdIdeal = item.quantidadeIdeal;
      let qtdAtual = item.quantidade;
      qtdIdeal = qtdIdeal !== undefined && qtdIdeal !== null && qtdIdeal !== '' ? Number(qtdIdeal) : NaN;
      qtdAtual = qtdAtual !== undefined && qtdAtual !== null && qtdAtual !== '' ? Number(qtdAtual) : NaN;
      if (!isNaN(qtdIdeal) && !isNaN(qtdAtual) && qtdAtual < qtdIdeal) {
        notificacoes.push(`⚠️ <b>${item.nome}</b> (Código: ${item.codigo}) está com quantidade <b>${qtdAtual}</b> (abaixo do ideal: ${qtdIdeal})`);
      }
      // ...existing code para criar o card...
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-info">
          <span class="item-nome">${item.nome}</span>
          <span class="item-desc">${item.descricao || ''}</span>
          <span style="color:#ffd700;font-size:0.95rem;">Categoria: ${item.categoria || '-'}</span>
          <span style="color:#ffd700;font-size:0.95rem;">Código: ${item.codigo || '-'}</span>
          <span style="color:#ffd700;font-size:0.95rem;">Qtd. Ideal: ${item.quantidadeIdeal ?? '-'}</span>
        </div>
        <div class="item-right">
          <span class="item-qtd">${item.quantidade}</span>
          <div class="item-actions">
            <a href="editar-item.html?codigo=${encodeURIComponent(item.codigo)}" title="Editar" class="btn-editar">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
            <button class="btn-excluir" data-codigo="${encodeURIComponent(item.codigo)}" title="Excluir">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      lista.appendChild(card);
    });

    // Exibe o aviso se houver algum item abaixo do ideal
    if (avisoAbaixoIdeal) {
      if (notificacoes.length > 0) {
        avisoAbaixoIdeal.innerHTML = notificacoes.join('<br>');
        avisoAbaixoIdeal.style.display = 'block';
      } else {
        avisoAbaixoIdeal.innerHTML = '';
        avisoAbaixoIdeal.style.display = 'none';
      }
    }

    // Removido: Notificações de estoque baixo baseadas em limiteMinimo
    let notifDiv = document.getElementById('notificacoesEstoque');
    if (!notifDiv) {
      notifDiv = document.createElement('div');
      notifDiv.id = 'notificacoesEstoque';
      notifDiv.style.color = '#fff';
      notifDiv.style.background = '#d32f2f';
      notifDiv.style.padding = '10px 18px';
      notifDiv.style.borderRadius = '8px';
      notifDiv.style.margin = '24px auto 0 auto';
      notifDiv.style.maxWidth = '420px';
      notifDiv.style.fontWeight = 'bold';
      notifDiv.style.display = 'none';
      lista.parentNode.insertBefore(notifDiv, lista);
    }
    notifDiv.innerHTML = '';
    notifDiv.style.display = 'none';

    // Adiciona evento aos botões de excluir (corrigido para comparar código como string e número)
    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.onclick = function() {
        if (!temPermissao('excluir')) {
          alert('Você não tem permissão para excluir itens.');
          return;
        }
        const codigo = decodeURIComponent(this.getAttribute('data-codigo'));
        let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        // Corrige a busca e remoção do item: compara como string e número
        const item = estoque.find(item =>
          String(item.codigo) === String(codigo) ||
          Number(item.codigo) === Number(codigo)
        );
        if (!item) return;
        if (!confirm('Tem certeza que deseja excluir este item?')) {
          return;
        }
        estoque = estoque.filter(item =>
          !(String(item.codigo) === String(codigo) || Number(item.codigo) === Number(codigo))
        );
        localStorage.setItem('estoque', JSON.stringify(estoque));
        carregarEstoque();
      };
    });
  }
  aplicarPermissoes();
}
carregarEstoque();

// Busca dinâmica (US06)
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Buscar por nome ou categoria...';
searchInput.style = 'margin:24px auto 0 auto;max-width:400px;display:block;padding:10px 12px;border-radius:8px;border:none;font-size:1rem;';
searchInput.addEventListener('input', function() {
  carregarEstoque(this.value);
});
document.querySelector('.form-header').after(searchInput);

// Logout
document.getElementById('btnSair').onclick = function() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
};

// Função para exportar CSV
function exportarCSV() {
  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  if (!estoque.length) {
    alert('Não há itens para exportar.');
    return;
  }
  const header = ['Nome', 'Código', 'Descrição', 'Categoria', 'Quantidade', 'Quantidade Ideal'];
  const rows = estoque.map(item =>
    [item.nome, item.codigo, item.descricao, item.categoria, item.quantidade, item.quantidadeIdeal]
      .map(val => `"${(val ?? '').toString().replace(/"/g, '""')}"`).join(',')
  );
  const csvContent = [header.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'estoque.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Arquivo CSV exportado com sucesso!');
}

// Função para exportar PDF (simples, só tabela)
function exportarPDF() {
  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  if (!estoque.length) {
    alert('Não há itens para exportar.');
    return;
  }
  let win = window.open('', '', 'width=900,height=700');
  win.document.write('<html><head><title>Estoque - PDF</title>');
  win.document.write('<style>table{border-collapse:collapse;width:100%;font-family:sans-serif;}th,td{border:1px solid #888;padding:8px;text-align:left;}th{background:#e75c1e;color:#fff;}</style>');
  win.document.write('</head><body>');
  win.document.write('<h2>Lista de Itens do Estoque</h2>');
  win.document.write('<table><thead><tr><th>Nome</th><th>Código</th><th>Descrição</th><th>Categoria</th><th>Quantidade</th><th>Quantidade Ideal</th></tr></thead><tbody>');
  estoque.forEach(item => {
    win.document.write('<tr>' +
      `<td>${item.nome || ''}</td>` +
      `<td>${item.codigo || ''}</td>` +
      `<td>${item.descricao || ''}</td>` +
      `<td>${item.categoria || ''}</td>` +
      `<td>${item.quantidade ?? ''}</td>` +
      `<td>${item.quantidadeIdeal ?? ''}</td>` +
      '</tr>');
  });
  win.document.write('</tbody></table>');
  win.document.write('</body></html>');
  win.document.close();
  win.print();
}

// Adiciona botões de exportação na tela
function adicionarBotoesExportacao() {
  if (document.getElementById('btnExportarCSV')) return;
  if (!isAdmin()) return;
  const container = document.querySelector('.form-header') || document.querySelector('.container');
  const div = document.createElement('div');
  div.style.display = 'flex';
  div.style.gap = '12px';
  div.style.justifyContent = 'center';
  div.style.margin = '24px 0';

  const btnCSV = document.createElement('button');
  btnCSV.id = 'btnExportarCSV';
  btnCSV.innerHTML = '<i class="fa-solid fa-file-csv"></i> Exportar CSV';
  btnCSV.style.background = '#388e3c';
  btnCSV.style.color = '#fff';
  btnCSV.style.border = 'none';
  btnCSV.style.borderRadius = '8px';
  btnCSV.style.padding = '10px 18px';
  btnCSV.style.fontWeight = '600';
  btnCSV.style.cursor = 'pointer';
  btnCSV.onclick = exportarCSV;

  const btnPDF = document.createElement('button');
  btnPDF.id = 'btnExportarPDF';
  btnPDF.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar PDF';
  btnPDF.style.background = '#d32f2f';
  btnPDF.style.color = '#fff';
  btnPDF.style.border = 'none';
  btnPDF.style.borderRadius = '8px';
  btnPDF.style.padding = '10px 18px';
  btnPDF.style.fontWeight = '600';
  btnPDF.style.cursor = 'pointer';
  btnPDF.onclick = exportarPDF;

  div.appendChild(btnCSV);
  div.appendChild(btnPDF);

  container.parentNode.insertBefore(div, container.nextSibling);
}
adicionarBotoesExportacao();

// Fim do arquivo
