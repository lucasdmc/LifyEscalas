import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import WeeklySchedule from './components/Schedule/WeeklySchedule';
import MonthlySchedule from './components/Schedule/MonthlySchedule';
import ScheduleModel from './components/Schedule/ScheduleModel';
import ShiftSwapModal from './components/Modals/ShiftSwapModal';
import CompanyRegistration from './components/Registration/CompanyRegistration';
import LocationRegistration from './components/Registration/LocationRegistration';
import ProfessionalRegistration from './components/Registration/ProfessionalRegistration';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('schedule-weekly');
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Pesquisando:', query);
  };

  const handleFilter = () => {
    console.log('Abrindo filtros');
  };

  const handleAddShift = (locationId: string, day: number | Date) => {
    console.log('Adicionando plantão:', { locationId, day });
  };

  const handleEditShift = (shiftId: string) => {
    console.log('Editando plantão:', shiftId);
    setSelectedShift({
      id: shiftId,
      professionalName: 'Janaina Dalvy',
      startTime: '07:00',
      endTime: '19:00',
      date: '08/07/2018',
      location: 'Pediatria'
    });
    setIsSwapModalOpen(true);
  };

  const handleSwapShift = (shiftId: string) => {
    console.log('Trocando plantão:', shiftId);
    setIsSwapModalOpen(true);
  };

  const handleSwapConfirm = (data: any) => {
    console.log('Confirmando troca:', data);
    setIsSwapModalOpen(false);
    setSelectedShift(null);
  };

  const handleCompanySave = (company: any) => {
    console.log('Salvando empresa:', company);
    setCurrentView('schedule-weekly');
  };

  const handleCompanyCancel = () => {
    setCurrentView('schedule-weekly');
  };

  const handleLocationSave = (location: any) => {
    console.log('Salvando local:', location);
    setCurrentView('schedule-weekly');
  };

  const handleLocationCancel = () => {
    setCurrentView('schedule-weekly');
  };

  const handleProfessionalSave = (professional: any) => {
    console.log('Salvando profissional:', professional);
    setCurrentView('schedule-weekly');
  };

  const handleProfessionalCancel = () => {
    setCurrentView('schedule-weekly');
  };

  const handleModelSave = (model: any) => {
    console.log('Salvando modelo:', model);
    setCurrentView('schedule-weekly');
  };

  const handleModelCancel = () => {
    setCurrentView('schedule-weekly');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'schedule-weekly':
        return (
          <WeeklySchedule
            onAddShift={handleAddShift}
            onEditShift={handleEditShift}
            onSwapShift={handleSwapShift}
          />
        );
      case 'schedule-monthly':
        return (
          <MonthlySchedule
            onAddShift={handleAddShift}
            onEditShift={handleEditShift}
            onSwapShift={handleSwapShift}
          />
        );
      case 'professional':
        return (
          <div className="professional-view">
            <h2>Visualização por Profissional</h2>
            <p>Esta funcionalidade será implementada em breve.</p>
          </div>
        );
      case 'search':
        return (
          <div className="search-view">
            <h2>Busca de Escalas</h2>
            <p>Esta funcionalidade será implementada em breve.</p>
          </div>
        );
      case 'model':
        return (
          <ScheduleModel
            onSave={handleModelSave}
            onCancel={handleModelCancel}
          />
        );
      case 'settings':
        return (
          <div className="settings-view">
            <h2>Configurações - Locais & Setores</h2>
            <p>Esta funcionalidade será implementada em breve.</p>
          </div>
        );
      case 'company':
        return (
          <CompanyRegistration
            onSave={handleCompanySave}
            onCancel={handleCompanyCancel}
          />
        );
      case 'location':
        return (
          <LocationRegistration
            onSave={handleLocationSave}
            onCancel={handleLocationCancel}
          />
        );
      case 'professional-register':
        return (
          <ProfessionalRegistration
            onSave={handleProfessionalSave}
            onCancel={handleProfessionalCancel}
          />
        );
      default:
        return (
          <WeeklySchedule
            onAddShift={handleAddShift}
            onEditShift={handleEditShift}
            onSwapShift={handleSwapShift}
          />
        );
    }
  };

  return (
    <div className="App">
      <Layout
        currentView={currentView}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onFilter={handleFilter}
      >
        {renderCurrentView()}
      </Layout>

      <ShiftSwapModal
        isOpen={isSwapModalOpen}
        onClose={() => {
          setIsSwapModalOpen(false);
          setSelectedShift(null);
        }}
        onConfirm={handleSwapConfirm}
        shift={selectedShift}
      />
    </div>
  );
}

export default App;
