import React, { useState } from 'react';
import './LocationRegistration.css';

interface LocationRegistrationProps {
  onSave: (location: LocationData) => void;
  onCancel: () => void;
  location?: LocationData;
  companyId?: string;
}

interface LocationData {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  companyId: string;
}

const LocationRegistration: React.FC<LocationRegistrationProps> = ({
  onSave,
  onCancel,
  location,
  companyId = '1'
}) => {
  const [formData, setFormData] = useState<LocationData>({
    name: location?.name || '',
    address: location?.address || '',
    phone: location?.phone || '',
    email: location?.email || '',
    isActive: location?.isActive ?? true,
    companyId: companyId
  });

  const [errors, setErrors] = useState<Partial<LocationData>>({});

  const handleInputChange = (field: keyof LocationData, value: string | boolean) => {
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

  const validateForm = (): boolean => {
    const newErrors: Partial<LocationData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do local é obrigatório';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
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
    <div className="location-registration">
      <div className="registration-header">
        <h1 className="registration-title">
          {location ? 'Editar Local' : 'Cadastrar Novo Local'}
        </h1>
        <p className="registration-subtitle">
          {location ? 'Atualize as informações do local' : 'Adicione um novo local para gerenciar escalas'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h3 className="section-title">Informações do Local</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome do Local *
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Hospital 1° de Maio"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
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
                placeholder="contato@hospital.com"
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

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="address" className="form-label">
                Endereço Completo *
              </label>
              <textarea
                id="address"
                className={`form-textarea ${errors.address ? 'error' : ''}`}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                rows={3}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {location ? 'Atualizar Local' : 'Cadastrar Local'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationRegistration;
