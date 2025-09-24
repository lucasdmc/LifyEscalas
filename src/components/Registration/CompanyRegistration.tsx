import React, { useState } from 'react';
import './CompanyRegistration.css';

interface CompanyRegistrationProps {
  onSave: (company: CompanyData) => void;
  onCancel: () => void;
  company?: CompanyData;
}

interface CompanyData {
  id?: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
}

const CompanyRegistration: React.FC<CompanyRegistrationProps> = ({
  onSave,
  onCancel,
  company
}) => {
  const [formData, setFormData] = useState<CompanyData>({
    name: company?.name || '',
    cnpj: company?.cnpj || '',
    email: company?.email || '',
    phone: company?.phone || '',
    address: company?.address || ''
  });

  const [errors, setErrors] = useState<Partial<CompanyData>>({});

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da empresa é obrigatório';
    }

    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ deve estar no formato 00.000.000/0000-00';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
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

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
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
    <div className="company-registration">
      <div className="registration-header">
        <h1 className="registration-title">
          {company ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}
        </h1>
        <p className="registration-subtitle">
          {company ? 'Atualize as informações da empresa' : 'Preencha os dados da empresa para começar a usar o sistema'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h3 className="section-title">Informações Básicas</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome da Empresa *
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome da empresa"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cnpj" className="form-label">
                CNPJ *
              </label>
              <input
                type="text"
                id="cnpj"
                className={`form-input ${errors.cnpj ? 'error' : ''}`}
                value={formData.cnpj}
                onChange={(e) => handleInputChange('cnpj', formatCNPJ(e.target.value))}
                placeholder="00.000.000/0000-00"
                maxLength={18}
              />
              {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}
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
                placeholder="contato@empresa.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
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
            {company ? 'Atualizar Empresa' : 'Cadastrar Empresa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistration;
