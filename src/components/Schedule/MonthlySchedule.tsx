import React, { useState } from 'react';
import './MonthlySchedule.css';

interface MonthlyScheduleProps {
  onAddShift: (locationId: string, date: Date) => void;
  onEditShift: (shiftId: string) => void;
  onSwapShift: (shiftId: string) => void;
}

const MonthlySchedule: React.FC<MonthlyScheduleProps> = ({
  onAddShift,
  onEditShift,
  onSwapShift
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Dados mockados para demonstração
  const shifts = [
    {
      id: '1',
      professionalName: 'Beatriz Nunes',
      startTime: '07:00',
      endTime: '12:00',
      date: 1,
      type: 'normal'
    },
    {
      id: '2',
      professionalName: 'Ana Suzuki',
      startTime: '13:00',
      endTime: '18:00',
      date: 1,
      type: 'normal'
    },
    {
      id: '3',
      professionalName: 'João Silva',
      startTime: '19:00',
      endTime: '07:00',
      date: 2,
      type: 'night'
    },
    {
      id: '4',
      professionalName: 'Catherine Souza',
      startTime: '07:00',
      endTime: '19:00',
      date: 7,
      type: 'weekend'
    },
    {
      id: '5',
      professionalName: 'Marcos Felix',
      startTime: '07:00',
      endTime: '19:00',
      date: 8,
      type: 'weekend'
    },
    {
      id: '6',
      professionalName: 'Francisco Ferreira',
      startTime: '19:00',
      endTime: '07:00',
      date: 14,
      type: 'night'
    },
    {
      id: '7',
      professionalName: 'Gregório House',
      startTime: '07:00',
      endTime: '19:00',
      date: 15,
      type: 'normal'
    },
    {
      id: '8',
      professionalName: 'Abraham Ford',
      startTime: '19:00',
      endTime: '07:00',
      date: 21,
      type: 'night'
    },
    {
      id: '9',
      professionalName: 'Amanda Elaine',
      startTime: '07:00',
      endTime: '19:00',
      date: 22,
      type: 'normal'
    },
    {
      id: '10',
      professionalName: 'Felipe Guilherme',
      startTime: '07:00',
      endTime: '19:00',
      date: 24,
      type: 'normal',
      status: 'AGUARDANDO'
    },
    {
      id: '11',
      professionalName: 'Rodrigo Coelho',
      startTime: '19:00',
      endTime: '07:00',
      date: 25,
      type: 'night',
      status: 'AGUARDANDO'
    }
  ];

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getShiftsForDate = (date: number) => {
    return shifts.filter(shift => shift.date === date);
  };

  const getShiftTypeColor = (type: string) => {
    const colors = {
      normal: '#4caf50',
      night: '#ff9800',
      weekend: '#9c27b0',
      holiday: '#f44336',
      coverage: '#2196f3'
    };
    return colors[type as keyof typeof colors] || '#4caf50';
  };

  const days = getDaysInMonth();
  const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  return (
    <div className="monthly-schedule">
      <div className="schedule-header">
        <div className="filters">
          <select className="filter-select">
            <option>Por Setor</option>
            <option>Clínica Médica</option>
            <option>Pediatria</option>
            <option>UTI</option>
          </select>
          <select className="filter-select">
            <option>Hospital 1º de Maio</option>
            <option>Hospital Estadual Pedro Mendes</option>
          </select>
        </div>
        
        <div className="date-navigation">
          <button 
            className="nav-btn"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            ‹
          </button>
          <span className="current-month">
            {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
          </span>
          <button 
            className="nav-btn"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            ›
          </button>
        </div>
        
        <div className="action-buttons">
          <button className="action-btn">
            📅 Escala Liberada
          </button>
          <button className="action-btn">
            📅+ Replicar Mês
          </button>
          <button className="action-btn">
            🤝 Solicitar Confirmação
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="days-header">
          {dayNames.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-days">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="empty-day"></div>;
            }
            
            const dayShifts = getShiftsForDate(day.getDate());
            
            return (
              <div key={index} className="calendar-day">
                <div className="day-number">{day.getDate()}</div>
                <div className="day-shifts">
                  {dayShifts.map(shift => (
                    <div
                      key={shift.id}
                      className="shift-item"
                      style={{ borderLeftColor: getShiftTypeColor(shift.type) }}
                      onClick={() => onEditShift(shift.id)}
                    >
                      <div className="shift-professional">
                        {shift.professionalName}
                        {shift.status && (
                          <span className="shift-status">{shift.status}</span>
                        )}
                      </div>
                      <div className="shift-time">
                        {shift.startTime} {shift.endTime}
                      </div>
                    </div>
                  ))}
                  {dayShifts.length === 0 && (
                    <button
                      className="add-shift-btn"
                      onClick={() => onAddShift('1', day)}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlySchedule;
