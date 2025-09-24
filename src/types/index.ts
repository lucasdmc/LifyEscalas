export interface Company {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  companyId: string;
  name: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Professional {
  id: string;
  name: string;
  profession: string;
  professionalRegistration: string;
  email: string;
  phone: string;
  locations: string[];
  groups: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shift {
  id: string;
  locationId: string;
  professionalId: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  type: ShiftType;
  status: ShiftStatus;
  value: number;
  notes?: string;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShiftModel {
  id: string;
  name: string;
  locationId: string;
  weeks: number;
  shifts: ShiftTemplate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShiftTemplate {
  id: string;
  dayOfWeek: number; // 0 = domingo, 1 = segunda, etc.
  week: number; // 1, 2, etc.
  startTime: string;
  endTime: string;
  type: ShiftType;
  professionalId?: string;
}

export type ShiftType = 'normal' | 'weekend' | 'holiday' | 'night' | 'coverage';
export type ShiftStatus = 'confirmed' | 'justified_absence' | 'unjustified_absence' | 'vacation' | 'holiday' | 'leave' | 'day_off' | 'swapped';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coordinator' | 'professional';
  companyId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
