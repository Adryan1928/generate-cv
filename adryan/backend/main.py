from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from dependencies import get_session
from models import CV, Skill, Experience
from schemas import CVSchema
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    """
    Home route
    """
    return {"message": "Bem vindo ao nosso backend!"}

@app.post("/cv")
def create_cv(
    cv: CVSchema,
    session:Session = Depends(get_session)
):
    """
    Create a CV
    """

    try:
        db_cv = CV(**cv.model_dump(exclude={"skills", "experience"}))
        session.add(db_cv)
        session.flush()

        for skill in cv.skills:
            db_skill = Skill(cv=db_cv.id, **skill.model_dump())
            session.add(db_skill)
        
        for experience in cv.experience:
            db_experience = Experience(cv=db_cv.id, **experience.model_dump())
            session.add(db_experience)
    except Exception as e:
        print(e)
        session.rollback()
        raise HTTPException(status_code=400, detail="Não foi possível criar o CV.")

    session.commit()
    return {"cv_id": db_cv.id, "message": "CV criado com sucesso!"}

@app.get("/cv/{code}", response_model=CVSchema)
def get_cv(
    code: str,
    session: Session = Depends(get_session)
):
    """
    Get a CV by code
    """
    db_cv = (
        session.query(CV).filter(CV.code == code).first()
    )
    if not db_cv:
        raise HTTPException(status_code=404, detail="CV não encontrado.")
    
    return db_cv

@app.delete("/cv/{code}")
def delete_cv(
    code: str,
    session: Session = Depends(get_session)
):
    """
    Delete a CV by code
    """
    db_cv = session.query(CV).filter(CV.code == code).first()
    if not db_cv:
        raise HTTPException(status_code=404, detail="CV não encontrado.")
    
    session.delete(db_cv)
    session.commit()
    return {"message": "CV deletado com sucesso."}