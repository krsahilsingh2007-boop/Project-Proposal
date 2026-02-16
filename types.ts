
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export enum ApplianceType {
  LIGHT = 'light',
  AC = 'ac',
  REFRIGERATOR = 'refrigerator',
  TELEVISION = 'television',
  FAN = 'fan',
  HEATER = 'heater'
}

export interface Appliance {
  id: string;
  name: string;
  type: ApplianceType;
  status: 'on' | 'off';
  currentPower: number; // Watts
  voltage: number;      // Volts
  current: number;      // Amps
  lastActive: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
