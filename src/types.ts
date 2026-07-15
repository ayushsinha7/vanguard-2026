export type SeverityLevel = 'Nominal' | 'High' | 'Critical' | 'Extreme';
export type StadiumZone = 'North' | 'South' | 'East' | 'West' | 'None';

export interface MultilingualBroadcast {
  en: string;
  es: string;
  fr: string;
}

export interface MetricOverrides {
  attendance?: string;
  temperature?: string;
  statusRating?: string;
  incidentCount?: number;
}

export interface Crisis {
  id: string;
  title: string;
  severity: SeverityLevel;
  description: string;
  targetSector: StadiumZone;
  sensorLogs: string[];
  aiReasoning: string;
  dangerIndex: number;
  confidenceScore: number;
  directives: string[];
  translations: MultilingualBroadcast;
  metricOverrides?: MetricOverrides;
}

export interface IncidentLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}
