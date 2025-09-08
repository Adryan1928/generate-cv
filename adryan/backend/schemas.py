from pydantic import BaseModel
from typing import List, Optional

class CVSchema(BaseModel):
    name: str
    email: str
    phone: str
    linkedin: str
    resume: str
    code: str
    skills: List['SkillSchema']
    experience: List['ExperienceSchema']

    class Config:
        from_attributes = True


class SkillSchema(BaseModel):
    name: str
    level: int

    class Config:
        from_attributes = True


class ExperienceSchema(BaseModel):
    company: str
    position: str
    initial_date: str
    final_date: Optional[str] = None
    description: str
    is_active: bool

    class Config:
        from_attributes = True

class ResponseCVSchema(CVSchema):
    id: int

    class Config:
        from_attributes = True
    