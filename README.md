# LifyEscalas

Sistema de gestão de escalas médicas desenvolvido em React com TypeScript.

## 🎯 Funcionalidades

### ✅ Implementadas

- **Tela Principal de Escalas**
  - Visualização semanal com grid de horários
  - Visualização mensal com calendário
  - Navegação entre períodos
  - Adição e edição de plantões
  - Diferentes tipos de plantão (normal, noturno, fim de semana, etc.)

- **Sistema de Troca de Escalas**
  - Modal completo para alteração de plantões
  - Seleção de profissionais
  - Motivos da troca
  - Notificação automática

- **Cadastro de Empresas**
  - Formulário completo com validação
  - Campos: nome, CNPJ, e-mail, telefone, endereço
  - Formatação automática de CNPJ e telefone

- **Interface Responsiva**
  - Design adaptado para desktop e mobile
  - Cores personalizadas (rosa e laranja)
  - Componentes reutilizáveis

### 🚧 Em Desenvolvimento

- Cadastro de Locais
- Cadastro de Profissionais
- Modelo de Escala
- Distribuição Automática de Médicos
- Visualização por Profissional
- Sistema de Busca

## 🎨 Design System

### Cores
- **Primária (Rosa)**: `#e91e63`
- **Secundária (Laranja)**: `#ff9800`
- **Fundo**: `#ffffff`
- **Cinzas**: Escala de cinzas para textos e bordas

### Componentes
- Header com navegação e ações
- Sidebar com menu lateral
- Cards e modais
- Formulários com validação
- Botões e inputs estilizados

## 🚀 Como Executar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**
   ```bash
   npm start
   ```

3. **Build para produção**
   ```bash
   npm run build
   ```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── Schedule/
│   │   ├── WeeklySchedule.tsx
│   │   └── MonthlySchedule.tsx
│   ├── Modals/
│   │   └── ShiftSwapModal.tsx
│   └── Registration/
│       └── CompanyRegistration.tsx
├── types/
│   └── index.ts
├── App.tsx
└── index.tsx
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **CSS3** - Estilização com variáveis CSS
- **Create React App** - Tooling de desenvolvimento

## 📱 Responsividade

O sistema foi desenvolvido com foco na responsividade:
- Layout adaptativo para diferentes tamanhos de tela
- Componentes que se ajustam automaticamente
- Navegação otimizada para mobile

## 🎯 Próximos Passos

1. Implementar cadastro de locais
2. Criar cadastro de profissionais
3. Desenvolver sistema de modelo de escala
4. Adicionar funcionalidade de distribuição automática
5. Implementar sistema de busca avançada
6. Adicionar relatórios e dashboards

## 📄 Licença

Este projeto é proprietário e confidencial.
