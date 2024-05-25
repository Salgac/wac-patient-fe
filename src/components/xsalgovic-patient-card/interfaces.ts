interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  healthConditions: HealthCondition[];
  visits: Visit[];
}

interface Visit {
  ambulance: Ambulance;
  timestamp: string;
  reason: string;
}

interface Ambulance {
  id: string;
  name: string;
}

interface HealthCondition {
  timestamp: string;
  description: string;
}
