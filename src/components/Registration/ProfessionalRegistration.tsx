import React, { useState } from 'react';
import './ProfessionalRegistration.css';

interface ProfessionalRegistrationProps {
  onSave: (professional: ProfessionalData) => void;
  onCancel: () => void;
  professional?: ProfessionalData;
}

interface ProfessionalData {
  id?: string;
  name: string;
  profession: string;
  professionalRegistration: string;
  email: string;
  phone: string;
  locations: string[];
  groups: string[];
  isActive: boolean;
}

const ProfessionalRegistration: React.FC<ProfessionalRegistrationProps> = ({
  onSave,
  onCancel,
  professional
}) => {
  const [formData, setFormData] = useState<ProfessionalData>({
    name: professional?.name || '',
    profession: professional?.profession || '',
    professionalRegistration: professional?.professionalRegistration || '',
    email: professional?.email || '',
    phone: professional?.phone || '',
    locations: professional?.locations || [],
    groups: professional?.groups || [],
    isActive: professional?.isActive ?? true
  });

  const [errors, setErrors] = useState<{
    name?: string;
    profession?: string;
    professionalRegistration?: string;
    email?: string;
    phone?: string;
    locations?: string;
    groups?: string;
  }>({});

  // Dados mockados para demonstração
  const availableLocations = [
    { id: '1', name: 'Hospital 1° de Maio' },
    { id: '2', name: 'Hospital Estadual Pedro Mendes' },
    { id: '3', name: 'Hospital da 2ª Divisão' },
    { id: '4', name: 'Pronto Atendimento Aeroporto CGH' },
    { id: '5', name: 'UPA de Ilha Bela' }
  ];

  const availableGroups = [
    { id: '1', name: 'Coordenação' },
    { id: '2', name: 'Pediatria' },
    { id: '3', name: 'Clínica Médica' },
    { id: '4', name: 'UTI' },
    { id: '5', name: 'Emergência' }
  ];

  const professions = [
    'Médico(a)',
    'Dentista',
    'Enfermeiro(a)',
    'Técnico(a) de Enfermagem',
    'Fisioterapeuta',
    'Psicólogo(a)',
    'Outros'
  ];

  const handleInputChange = (field: keyof ProfessionalData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleLocationToggle = (locationId: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(locationId)
        ? prev.locations.filter(id => id !== locationId)
        : [...prev.locations, locationId]
    }));
  };

  const handleGroupToggle = (groupId: string) => {
    setFormData(prev => ({
      ...prev,
      groups: prev.groups.includes(groupId)
        ? prev.groups.filter(id => id !== groupId)
        : [...prev.groups, groupId]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      profession?: string;
      professionalRegistration?: string;
      email?: string;
      phone?: string;
      locations?: string;
      groups?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do profissional é obrigatório';
    }

    if (!formData.profession.trim()) {
      newErrors.profession = 'Profissão é obrigatória';
    }

    if (!formData.professionalRegistration.trim()) {
      newErrors.professionalRegistration = 'Registro profissional é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (formData.locations.length === 0) {
      newErrors.locations = 'Selecione pelo menos um local';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
  };

  return (
    <div className="professional-registration">
      <div className="registration-header">
        <h1 className="registration-title">
          {professional ? 'Editar Profissional' : 'Cadastrar Novo Profissional'}
        </h1>
        <p className="registration-subtitle">
          {professional ? 'Atualize as informações do profissional' : 'Adicione um novo profissional ao sistema'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h3 className="section-title">Informações Pessoais</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome completo"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="profession" className="form-label">
                Profissão *
              </label>
              <select
                id="profession"
                className={`form-input ${errors.profession ? 'error' : ''}`}
                value={formData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
              >
                <option value="">Selecione a profissão</option>
                {professions.map(prof => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
              {errors.profession && <span className="error-message">{errors.profession}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="professionalRegistration" className="form-label">
                Registro Profissional *
              </label>
              <input
                type="text"
                id="professionalRegistration"
                className={`form-input ${errors.professionalRegistration ? 'error' : ''}`}
                value={formData.professionalRegistration}
                onChange={(e) => handleInputChange('professionalRegistration', e.target.value)}
                placeholder="Ex: 12345/SP"
              />
              {errors.professionalRegistration && <span className="error-message">{errors.professionalRegistration}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Telefone *
              </label>
              <input
                type="text"
                id="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="profissional@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <div className="toggle-container">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">
                  {formData.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Locais de Atuação</h3>
          <div className="checkbox-grid">
            {availableLocations.map(location => (
              <label key={location.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.locations.includes(location.id)}
                  onChange={() => handleLocationToggle(location.id)}
                />
                <span className="checkbox-label">{location.name}</span>
              </label>
            ))}
          </div>
          {errors.locations && <span className="error-message">{errors.locations}</span>}
        </div>

        <div className="form-section">
          <h3 className="section-title">Grupos e Especialidades</h3>
          <div className="checkbox-grid">
            {availableGroups.map(group => (
              <label key={group.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.groups.includes(group.id)}
                  onChange={() => handleGroupToggle(group.id)}
                />
                <span className="checkbox-label">{group.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {professional ? 'Atualizar Profissional' : 'Cadastrar Profissional'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalRegistration;
