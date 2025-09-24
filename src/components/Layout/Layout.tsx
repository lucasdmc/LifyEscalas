import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onViewChange, 
  onSearch, 
  onFilter 
}) => {
  const getViewTitle = (view: string) => {
    const titles: { [key: string]: string } = {
      'schedule-weekly': 'ESCALA / SEMANAL',
      'schedule-monthly': 'ESCALA / MENSAL',
      'professional': 'ESCALA / PROFISSIONAL',
      'search': 'ESCALA / BUSCA',
      'model': 'ESCALA / MODELO',
      'settings': 'CONFIGURAÇÕES / LOCAIS & SETORES',
      'company': 'CADASTRO / EMPRESA',
      'location': 'CADASTRO / LOCAL',
      'professional-register': 'CADASTRO / PROFISSIONAL'
    };
    return titles[view] || 'LIFYESCALAS';
  };

  return (
    <div className="layout">
      <Sidebar activeItem={currentView} onItemClick={onViewChange} />
      <div className="main-content">
        <Header 
          title={getViewTitle(currentView)}
          onSearch={onSearch}
          onFilter={onFilter}
          user={{
            name: 'Usuário',
            company: 'empresateste'
          }}
        />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
