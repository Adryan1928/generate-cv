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
  jobTitle: string;
  institution: string;
  year: number;
}
