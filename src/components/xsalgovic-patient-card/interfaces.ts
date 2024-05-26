interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  healthConditions: HealthCondition[];
  visits: Visit[];
}

interface Visit {
  id?: string;
  ambulance: Ambulance;
  timestamp: string;
  reason: string;
  status: string;
}

interface Ambulance {
  id: string;
  name: string;
}

interface HealthCondition {
  timestamp: string;
  description: string;
}
