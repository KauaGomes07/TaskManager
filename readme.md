# 📋 TaskManager

O **TaskManager** é um aplicativo de linha de comando (CLI) feito em **Node.js** para ajudar você a gerenciar tarefas de forma simples e rápida diretamente no terminal.

---

## 🚀 Funcionalidades

- ✅ Adicionar novas tarefas
- 📜 Listar todas as tarefas
- ✏️ Marcar tarefas como concluídas
- ❌ Remover tarefas
- 💾 Armazenamento local usando `tasks.json`
- 🎨 Interface colorida e interativa no terminal

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) – prompts interativos
- [Chalk](https://www.npmjs.com/package/chalk) – para estilizar textos no terminal

---
## 📂 Estrutura do Projeto

TaskManager/
├─ package.json # Configuração do projeto Node.js
├─ tasks.json # Banco de dados local das tarefas
├─ src/
│ ├─ index.js # Ponto de entrada do programa
│ └─ menu/
│ └─ main.js # Lógica do menu interativo
└─ node_modules/ # Dependências do projeto


🔮 Melhorias Futuras

 Adicionar suporte para datas de vencimento

 Filtros para visualizar tarefas concluídas ou pendentes

 Persistência em banco de dados (SQLite ou MongoDB)

 Testes automatizados

 