// Bloqueia acesso se não estiver logado
if (localStorage.getItem('usuarioLogado') !== 'true') {
  window.location.href = 'index.html';
}

// Carrega itens do estoque do localStorage
function carregarEstoque() {
  const lista = document.getElementById('estoqueLista');
  const aviso = document.getElementById('avisoEstoqueVazio');
  lista.innerHTML = '';
  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  if (estoque.length === 0) {
    aviso.style.display = 'block';
  } else {
    aviso.style.display = 'none';
    estoque.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-info">
          <span class="item-nome">${item.nome}</span>
          <span class="item-desc">${item.descricao || ''}</span>
        </div>
        <div class="item-right">
          <span class="item-qtd">${item.quantidade}</span>
          <div class="item-actions" style="display:flex;gap:8px;">
            <a href="editar-item.html?nome=${encodeURIComponent(item.nome)}" title="Editar" class="btn-editar" style="background:#232b4a;color:#fff;border:none;border-radius:6px;padding:6px 12px;cursor:pointer;display:inline-flex;align-items:center;">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
            <button class="btn-excluir" data-nome="${encodeURIComponent(item.nome)}" title="Excluir" style="background:#d32f2f;color:#fff;border:none;border-radius:6px;padding:6px 12px;cursor:pointer;display:inline-flex;align-items:center;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      lista.appendChild(card);
    });

    // Adiciona evento aos botões de excluir
    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.onclick = function() {
        const nome = decodeURIComponent(this.getAttribute('data-nome'));
        let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        estoque = estoque.filter(item => item.nome !== nome);
        localStorage.setItem('estoque', JSON.stringify(estoque));
        carregarEstoque();
      };
    });
  }
}
carregarEstoque();

// Logout
document.getElementById('btnSair').onclick = function() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
};
