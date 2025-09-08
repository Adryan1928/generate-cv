from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, rela
from sqlalchemy.orm import relationship
from database import Base


class CV(Base):
    __tablename__ = "cvs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    linkedin = Column(String)
    resume = Column(String)
    skills = relationship("Skill", cascade="all, delete")
    experiences = relationship("Experience", cascade="all, delete")

    def __init__(self, name, email, phone, linkedin, resume):
        self.name = name
        self.email = email
        self.phone = phone
        self.linkedin = linkedin
        self.resume = resume

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, autoincrement=True)
    cv = Column(ForeignKey("cvs.id"))
    name = Column(String)
    level = Column(Integer)

    def __init__(self, cv, name, level):
        self.cv = cv
        self.name = name
        self.level = level

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, autoincrement=True)
    cv = Column(ForeignKey("cvs.id"))
    company = Column(String)
    position = Column(String)
    initial_date = Column(String)
    final_date = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=False)

    def __init__(self, cv, company, position, initial_date, final_date, description, is_active=False):
        self.cv = cv
        self.company = company
        self.position = position
        self.initial_date = initial_date
        self.final_date = final_date
        self.description = description
        self.is_active = is_active