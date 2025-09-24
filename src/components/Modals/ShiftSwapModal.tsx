import React, { useState } from 'react';
import './ShiftSwapModal.css';

interface ShiftSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: SwapData) => void;
  shift?: {
    id: string;
    professionalName: string;
    startTime: string;
    endTime: string;
    date: string;
    location: string;
  };
}

interface SwapData {
  originalShiftId: string;
  newProfessionalId: string;
  reason: string;
  notifyProfessional: boolean;
}

const ShiftSwapModal: React.FC<ShiftSwapModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  shift
}) => {
  const [formData, setFormData] = useState<SwapData>({
    originalShiftId: shift?.id || '',
    newProfessionalId: '',
    reason: '',
    notifyProfessional: true
  });

  // Dados mockados para demonstração
  const professionals = [
    { id: '1', name: 'Ana Suzuki', profession: 'Médica' },
    { id: '2', name: 'Beatriz Nunes', profession: 'Médica' },
    { id: '3', name: 'Catherine Souza', profession: 'Médica' },
    { id: '4', name: 'João Silva', profession: 'Médico' },
    { id: '5', name: 'Marcos Felix', profession: 'Médico' },
    { id: '6', name: 'Francisco Ferreira', profession: 'Médico' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  const handleInputChange = (field: keyof SwapData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Alterar Plantão</h2>
          <div className="modal-actions">
            <button className="action-btn" title="Histórico">
              🔄
            </button>
            <button className="action-btn" title="Opções">
              ▼
            </button>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-tabs">
          <button className="tab active">Informações</button>
          <button className="tab">Mais detalhes</button>
          <button className="tab">Produtividade</button>
          <button className="tab">Anunciar</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-section">
            <h3>Informações do Plantão</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Hospital/Setor</label>
                <select className="form-input">
                  <option>Hospital 1° de Maio - {shift?.location}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Tipo</label>
                <div className="type-selector">
                  <div className="color-indicator" style={{ backgroundColor: '#9c27b0' }}></div>
                  <select className="form-input">
                    <option>Plantão Normal</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duração ⓘ</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value="12:00" 
                  readOnly 
                />
              </div>
              
              <div className="form-group">
                <label>Início ⓘ</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={shift?.startTime || '07:00'} 
                  readOnly 
                />
                <small className="form-help">(Fim: {shift?.endTime || '19:00'})</small>
              </div>
              
              <div className="form-group">
                <label>Valor ⓘ</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value="1.800,00" 
                  readOnly 
                />
              </div>
              
              <div className="form-group">
                <label>Data</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={shift?.date || '08/07/2018'} 
                  readOnly 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Profissionais</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Profissional Fixo ⓘ</label>
                <div className="professional-info">
                  <input 
                    type="radio" 
                    id="listAll" 
                    name="listType"
                    checked={true}
                  />
                  <label htmlFor="listAll">Listar todos</label>
                </div>
                <select className="form-input">
                  <option>Cristiane Baptistão</option>
                </select>
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="needsCoverage" 
                    checked={true}
                  />
                  <label htmlFor="needsCoverage">Precisa de cobertura</label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Situação</label>
                <select 
                  className="form-input"
                  value={formData.newProfessionalId}
                  onChange={(e) => handleInputChange('newProfessionalId', e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="confirmed">CONFIRMADO</option>
                  <option value="justified_absence">FALTA JUSTIFICADA</option>
                  <option value="unjustified_absence">FALTA NÃO JUSTIFICADA</option>
                  <option value="vacation">FÉRIAS</option>
                  <option value="holiday">FERIADO</option>
                  <option value="leave">LICENÇA</option>
                  <option value="day_off">FOLGA</option>
                  <option value="swapped">TROCADO</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Profissional de Plantão ⓘ</label>
                <div className="professional-info">
                  <input 
                    type="radio" 
                    id="listAll2" 
                    name="listType2"
                    checked={true}
                  />
                  <label htmlFor="listAll2">Listar todos</label>
                </div>
                <select 
                  className="form-input"
                  value={formData.newProfessionalId}
                  onChange={(e) => handleInputChange('newProfessionalId', e.target.value)}
                >
                  <option value="">Selecione o novo profissional...</option>
                  {professionals.map(prof => (
                    <option key={prof.id} value={prof.id}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Observações</h3>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label>Motivo da troca</label>
                <textarea 
                  className="form-textarea"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  placeholder="Descreva o motivo da troca..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="notifyProfessional"
                checked={formData.notifyProfessional}
                onChange={(e) => handleInputChange('notifyProfessional', e.target.checked)}
              />
              <label htmlFor="notifyProfessional">
                Informar profissional sobre alterações ⓘ
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
            <button type="button" className="btn btn-danger">
              🗑️ Apagar plantão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftSwapModal;
