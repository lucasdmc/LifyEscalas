import React, { useState } from 'react';
import './WeeklySchedule.css';

interface WeeklyScheduleProps {
  onAddShift: (locationId: string, day: number) => void;
  onEditShift: (shiftId: string) => void;
  onSwapShift: (shiftId: string) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  onAddShift,
  onEditShift,
  onSwapShift
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  // Dados mockados para demonstração
  const locations = [
    { id: '1', name: 'Clínica Médica' },
    { id: '2', name: 'Pediatria' },
    { id: '3', name: 'UTI' }
  ];

  const shifts = [
    {
      id: '1',
      locationId: '1',
      professionalName: 'Catherine Souza',
      startTime: '07:00',
      endTime: '13:00',
      day: 1, // Segunda
      type: 'normal'
    },
    {
      id: '2',
      locationId: '1',
      professionalName: 'João Silva',
      startTime: '13:00',
      endTime: '19:00',
      day: 1,
      type: 'normal'
    },
    {
      id: '3',
      locationId: '1',
      professionalName: 'Ana Suzuki',
      startTime: '19:00',
      endTime: '07:00',
      day: 1,
      type: 'night'
    },
    {
      id: '4',
      locationId: '2',
      professionalName: 'Beatriz Nunes',
      startTime: '07:00',
      endTime: '19:00',
      day: 2, // Terça
      type: 'normal'
    }
  ];

  const getWeekDays = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay() + 1); // Segunda-feira
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getShiftsForLocationAndDay = (locationId: string, day: number) => {
    return shifts.filter(shift => 
      shift.locationId === locationId && shift.day === day
    );
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

  const weekDays = getWeekDays();
  const dayNames = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

  return (
    <div className="weekly-schedule">
      <div className="schedule-header">
        <div className="date-navigation">
          <button 
            className="nav-btn"
            onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
          >
            ‹
          </button>
          <span className="current-month">
            {currentWeek.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
          </span>
          <button 
            className="nav-btn"
            onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
          >
            ›
          </button>
        </div>
      </div>

      <div className="schedule-grid">
        <div className="days-header">
          {weekDays.map((day, index) => (
            <div key={index} className="day-header">
              <div className="day-number">{day.getDate()}</div>
              <div className="day-name">{dayNames[index]}</div>
            </div>
          ))}
        </div>

        {locations.map(location => (
          <div key={location.id} className="location-section">
            <div className="location-header">
              <h3 className="location-name">{location.name}</h3>
              <button className="replicate-btn">
                Replicar Semana
              </button>
            </div>
            
            <div className="location-shifts">
              {weekDays.map((day, dayIndex) => {
                const dayShifts = getShiftsForLocationAndDay(location.id, dayIndex + 1);
                
                return (
                  <div key={dayIndex} className="day-column">
                    {dayShifts.length > 0 ? (
                      dayShifts.map(shift => (
                        <div
                          key={shift.id}
                          className="shift-block"
                          style={{ borderLeftColor: getShiftTypeColor(shift.type) }}
                          onClick={() => onEditShift(shift.id)}
                        >
                          <div className="shift-professional">{shift.professionalName}</div>
                          <div className="shift-time">
                            {shift.startTime} - {shift.endTime}
                          </div>
                        </div>
                      ))
                    ) : (
                      <button
                        className="add-shift-btn"
                        onClick={() => onAddShift(location.id, dayIndex + 1)}
                      >
                        +
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
