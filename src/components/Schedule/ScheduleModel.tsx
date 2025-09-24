import React, { useState } from 'react';
import './ScheduleModel.css';

interface ScheduleModelProps {
  onSave: (model: ModelData) => void;
  onCancel: () => void;
  model?: ModelData;
}

interface ModelData {
  id?: string;
  name: string;
  locationId: string;
  weeks: number;
  shifts: ShiftTemplate[];
}

interface ShiftTemplate {
  id: string;
  dayOfWeek: number;
  week: number;
  startTime: string;
  endTime: string;
  type: string;
  professionalId?: string;
}

const ScheduleModel: React.FC<ScheduleModelProps> = ({
  onSave,
  onCancel,
  model
}) => {
  const [formData, setFormData] = useState<ModelData>({
    name: model?.name || 'Modelo de Escala - Clínica Médica',
    locationId: model?.locationId || '1',
    weeks: model?.weeks || 2,
    shifts: model?.shifts || []
  });

  const [selectedCell, setSelectedCell] = useState<{day: number, week: number} | null>(null);

  // Dados mockados
  const locations = [
    { id: '1', name: 'Clínica Médica | Hospital 1' },
    { id: '2', name: 'Pediatria | Hospital 1' },
    { id: '3', name: 'UTI | Hospital 1' }
  ];

  const professionals = [
    { id: '1', name: 'José Santos' },
    { id: '2', name: 'Ana Suzuki' },
    { id: '3', name: 'João Silva' },
    { id: '4', name: 'Beatriz Nunes' },
    { id: '5', name: 'Francisco Ferreira' },
    { id: '6', name: 'Marcos Felix' },
    { id: '7', name: 'Catherine Souza' }
  ];

  const shiftTypes = [
    { id: 'normal', name: 'Normal', color: '#4caf50' },
    { id: 'night', name: 'Noturno', color: '#ff9800' },
    { id: 'weekend', name: 'Fim de Semana', color: '#9c27b0' },
    { id: 'holiday', name: 'Feriado', color: '#f44336' },
    { id: 'coverage', name: 'Cobertura', color: '#2196f3' }
  ];

  const dayNames = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  const getShiftsForCell = (day: number, week: number) => {
    return formData.shifts.filter(shift => 
      shift.dayOfWeek === day && shift.week === week
    );
  };

  const addShift = (day: number, week: number) => {
    const newShift: ShiftTemplate = {
      id: Date.now().toString(),
      dayOfWeek: day,
      week: week,
      startTime: '07:00',
      endTime: '19:00',
      type: 'normal',
      professionalId: ''
    };

    setFormData(prev => ({
      ...prev,
      shifts: [...prev.shifts, newShift]
    }));
  };

  const updateShift = (shiftId: string, updates: Partial<ShiftTemplate>) => {
    setFormData(prev => ({
      ...prev,
      shifts: prev.shifts.map(shift =>
        shift.id === shiftId ? { ...shift, ...updates } : shift
      )
    }));
  };

  const removeShift = (shiftId: string) => {
    setFormData(prev => ({
      ...prev,
      shifts: prev.shifts.filter(shift => shift.id !== shiftId)
    }));
  };

  const getShiftTypeColor = (type: string) => {
    const shiftType = shiftTypes.find(t => t.id === type);
    return shiftType?.color || '#4caf50';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="schedule-model">
      <div className="model-header">
        <h1 className="model-title">
          {model ? 'Editar Modelo de Escala' : 'Criar Modelo de Escala'}
        </h1>
        <p className="model-subtitle">
          Configure o modelo de escala para replicação automática
        </p>
      </div>

      <form onSubmit={handleSubmit} className="model-form">
        <div className="model-controls">
          <div className="control-group">
            <label className="control-label">Setor</label>
            <select
              className="control-select"
              value={formData.locationId}
              onChange={(e) => setFormData(prev => ({ ...prev, locationId: e.target.value }))}
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Modelo</label>
            <input
              type="text"
              className="control-input"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="control-group">
            <label className="control-label">Quantidade de Semanas</label>
            <div className="weeks-control">
              <button
                type="button"
                className="weeks-btn"
                onClick={() => setFormData(prev => ({ ...prev, weeks: Math.max(1, prev.weeks - 1) }))}
              >
                -
              </button>
              <span className="weeks-value">{formData.weeks}</span>
              <button
                type="button"
                className="weeks-btn"
                onClick={() => setFormData(prev => ({ ...prev, weeks: prev.weeks + 1 }))}
              >
                +
              </button>
            </div>
          </div>

          <button type="button" className="btn btn-secondary">
            + Novo Modelo
          </button>
        </div>

        <div className="model-actions">
          <button type="button" className="action-btn" title="Imprimir">
            🖨️
          </button>
          <button type="button" className="action-btn">
            📤 Exportar Escala
          </button>
          <button type="button" className="action-btn">
            📋 Duplicar Modelo
          </button>
          <button type="button" className="action-btn">
            🗑️ Limpar Modelo
          </button>
          <button type="button" className="action-btn danger">
            ❌ Apagar Modelo
          </button>
        </div>

        <div className="model-grid">
          <div className="grid-header">
            <div className="week-label">Semana</div>
            {dayNames.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>

          {Array.from({ length: formData.weeks }, (_, weekIndex) => (
            <div key={weekIndex} className="week-row">
              <div className="week-number">{weekIndex + 1}ª</div>
              {dayNames.map((_, dayIndex) => {
                const shifts = getShiftsForCell(dayIndex + 1, weekIndex + 1);
                
                return (
                  <div key={dayIndex} className="day-cell">
                    {shifts.map(shift => (
                      <div
                        key={shift.id}
                        className="shift-template"
                        style={{ borderLeftColor: getShiftTypeColor(shift.type) }}
                        onClick={() => setSelectedCell({ day: dayIndex + 1, week: weekIndex + 1 })}
                      >
                        <div className="shift-professional">
                          {shift.professionalId ? 
                            professionals.find(p => p.id === shift.professionalId)?.name || 'Selecionar' :
                            'Selecionar'
                          }
                        </div>
                        <div className="shift-time">
                          {shift.startTime} - {shift.endTime}
                        </div>
                        <button
                          type="button"
                          className="remove-shift"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeShift(shift.id);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-shift-btn"
                      onClick={() => addShift(dayIndex + 1, weekIndex + 1)}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="model-apply">
          <h3 className="apply-title">Aplicar Modelo</h3>
          <div className="apply-controls">
            <div className="apply-group">
              <label className="apply-label">Data de início</label>
              <input type="date" className="apply-input" />
            </div>
            <div className="apply-group">
              <label className="apply-label">Data fim</label>
              <input type="date" className="apply-input" />
            </div>
            <div className="apply-group">
              <label className="apply-label">Iniciar a partir da</label>
              <select className="apply-select">
                <option>1ª Semana</option>
                <option>2ª Semana</option>
              </select>
            </div>
            <div className="apply-options">
              <label className="radio-option">
                <input type="radio" name="applyType" value="keep" />
                <span>Manter dias da semana ⓘ</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="applyType" value="circular" defaultChecked />
                <span>Circular ⓘ</span>
              </label>
            </div>
            <button type="button" className="btn btn-primary">
              Aplicar
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {model ? 'Atualizar Modelo' : 'Criar Modelo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleModel;
