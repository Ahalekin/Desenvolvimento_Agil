# 1. Histórias de Usuário

A Tabela a seguir contém as **Histórias de Usuário** do sistema, estruturadas conforme as funcionalidades principais.

| **ID** | **História de Usuário** | **Critérios de Aceitação** | **Prioridade** |
|--------|-------------------------|----------------------------|----------------|
| US01  | Como usuário, quero fazer login no sistema para acessar as funcionalidades de controle de estoque. | 1. Campos de e-mail e senha Validação correta <br> 2. Redirecionamento após login <br> 3. Mensagem de erro se inválido. | Alta |
| US02  | Como novo usuário, quero me cadastrar no sistema para criar minha conta. | 1. Formulário com nome, e-mail e senha <br> 2. E-mail único <br> 3. Senha mínima de 6 caracteres <br> 4. Redirecionamento com mensagem. | Média |
| US03  | Como usuário logado, quero cadastrar novos itens para controlar o estoque. | 1. Campos obrigatórios: nome, descrição, quantidade e categoria <br> 2. Confirmação de sucesso <br> 3. Item salvo e listado. | Alta |
| US04  | Como usuário logado, quero visualizar uma lista de itens para acompanhar o estoque. | 1. Lista com nome, quantidade e categoria <br> 2. Botão de editar/atualizar <br> 3. Lista atualizada automaticamente. | Alta |
| US05  | Como usuário logado, quero atualizar a quantidade de um item para manter o controle do estoque. | 1. Seleção de item <br> 2. Alteração salva no banco <br> 3. Atualização visível na lista <br> 4. Mensagem de sucesso. | Alta |
| US06  | Como usuário logado, quero pesquisar um item pelo nome para encontrá-lo rapidamente na lista. | 1. Campo de busca na lista <br> 2. Resultados devem aparecer conforme o texto digitado <br> 3. Suporte a letras maiúsculas/minúsculas. | Média |
| US07  | Como usuário logado, quero excluir um item do estoque para remover produtos que não serão mais utilizados. | 1. Botão de exclusão na lista <br> 2. Confirmação antes de excluir <br> 3. Item removido do banco e da lista. | Baixa |
| US08  | Como usuário logado, quero receber uma mensagem de erro caso eu tente cadastrar um item com dados incompletos. | 1. Validação obrigatória no formulário <br> 2. Exibição de mensagens de erro específicas por campo. | Alta |
| US09  | Como usuário logado, quero exportar a lista de itens do estoque em formato CSV ou PDF para facilitar o compartilhamento de informações. | 1. Opção de exportação disponível <br> 2. Arquivo gerado corretamente <br> 3. Mensagem de confirmação. | Média |
| US10  | Como usuário logado, quero receber notificações quando a quantidade de um item estiver abaixo de um limite mínimo para evitar falta de produtos. | 1. Definição de limite mínimo <br> 2. Notificação automática <br> 3. Visualização clara do alerta. | Alta |
| US11  | Como usuário logado, quero filtrar a lista de itens por categoria para encontrar produtos de um determinado tipo mais facilmente. | 1. Filtro por categoria funcional <br> 2. Resultados exibidos corretamente <br> 3. Facilidade de uso. | Média |
| US12  | Como administrador, quero visualizar um histórico de alterações nos itens do estoque para acompanhar movimentações e auditorias. | 1. Registro de alterações <br> 2. Visualização filtrada por item/data <br> 3. Acesso restrito a administradores. | Média |
| US13  | Como administrador, quero gerenciar permissões de acesso para controlar quem pode cadastrar, editar ou excluir itens do estoque. | 1. Definição de perfis de acesso <br> 2. Restrições aplicadas corretamente <br> 3. Mensagem de erro ao tentar ação não permitida. | Alta |

_Tabela: Histórias de Usuário_
