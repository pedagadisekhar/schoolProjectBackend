export interface ClassData {
    className: string;
    strength: number;
    total_strength: number;
    isactive: boolean;
    created_by: string;
    Territory: string;
    TerritoryId: number;
  }
  
  export interface FeesData {
    className: string;
    ClassId: number;
    total_fees: number;
    paid_fees: number;
  }