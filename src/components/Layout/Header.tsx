import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  user?: {
    name: string;
    company: string;
  };
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onSearch, 
  onFilter, 
  user 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">+</div>
          <span className="logo-text">LIFYESCALAS</span>
        </div>
      </div>
      
      <div className="header-center">
        <span className="header-title">{title}</span>
      </div>
      
      <div className="header-right">
        {onSearch && (
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Pesquisar por setor..."
              className="search-input"
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {isSearchFocused && (
              <button 
                className="search-clear"
                onClick={() => {
                  const input = document.querySelector('.search-input') as HTMLInputElement;
                  if (input) input.value = '';
                  onSearch('');
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        )}
        
        
        {user && (
          <div className="user-container">
            <div className="user-info">
              <span className="company-name">{user.company}</span>
              <div className="location-dropdown">
                <button 
                  className="location-select"
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                >
                  Hospital 1° de Maio
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </button>
                
                {isLocationMenuOpen && (
                  <div className="location-menu">
                    <div className="location-item active">
                      <span>Hospital 1° de Maio</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div className="location-item">
                      <span>Hospital Estadual Pedro Mendes</span>
                    </div>
                    <div className="location-item">
                      <span>Hospital da 2ª Divisão</span>
                    </div>
                    <div className="location-item">
                      <span>Pronto Atendimento Aeroporto CGH</span>
                    </div>
                    <div className="location-item">
                      <span>UPA de Ilha Bela</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="user-menu">
              <button 
                className="action-btn profile-btn" 
                title="Perfil"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </button>
              
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="user-details">
                      <p className="user-name">João Silva</p>
                      <p className="user-email">joao@empresateste.com</p>
                    </div>
                  </div>
                  <div className="user-menu-items">
                    <button className="user-menu-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Meu Perfil
                    </button>
                    <button className="user-menu-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.49,0-0.61,0.22L2.71,8.87 C2.6,9.08,2.65,9.34,2.83,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.49,0,0.61-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                      </svg>
                      Configurações
                    </button>
                    <button className="user-menu-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.49,0-0.61,0.22L2.71,8.87 C2.6,9.08,2.65,9.34,2.83,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.49,0,0.61-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                      </svg>
                      Ajuda
                    </button>
                    <div className="user-menu-divider"></div>
                    <button className="user-menu-item logout">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                      </svg>
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {onFilter && (
          <button className="filter-btn" onClick={onFilter}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </svg>
            Filtrar
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
