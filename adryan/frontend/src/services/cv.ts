import request, { ResponseWrapper } from "../utils/request";

export interface CV {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resume: string;
  skills?: Skill[];
  experience?: Experience[];
  code: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  company: string;
  position: string;
  initial_date: Date;
  final_date?: Date;
  is_active: boolean;
  description: string;
}


export const createCV = (cv: CV) => {
  return request.post("/cv", cv);
}

export const getCV = (code: string) => {
  return request.get<CV>(`/cv/${code}`);
}