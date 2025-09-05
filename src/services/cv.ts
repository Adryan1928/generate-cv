export interface CV {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resume: string;
  skills?: Skill[];
  experience?: Experience[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  company: string;
  position: string;
  initialDate: Date;
  finalDate?: Date;
  isActive: boolean;
  description: string;
}
