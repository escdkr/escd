
export interface BookData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  desc: string;
  baseColor: string; 
  stats: {
    power: number;
    risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    type: string;
    proficiency: number;
  };
  pages: string[];
}
