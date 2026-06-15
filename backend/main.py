from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from .services.agents import (
        careerAnalysisAgent,
        contentAgent,
        incomeAgent,
        portfolioAgent,
        researchAgent,
        roadmapAgent,
        skillGapAgent,
    )
except ImportError:
    from services.agents import (
        careerAnalysisAgent,
        contentAgent,
        incomeAgent,
        portfolioAgent,
        researchAgent,
        roadmapAgent,
        skillGapAgent,
    )


app = FastAPI(title="CareerForge AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RoadmapRequest(BaseModel):
    careerTopic: str
    targetAudience: str
    careerGoal: str
    currentSkills: str = ""


class RoadmapResponse(BaseModel):
    careerPath: str
    skills: list[str]
    skillGap: dict[str, object]
    learningRoadmap: list[dict[str, str]]
    portfolioProjects: list[str]
    incomeOpportunities: list[str]
    actionPlan: list[str]
    contentToolkit: dict[str, str]


@app.get("/")
def health_check():
    return {"status": "CareerForge AI backend is running"}


@app.post("/generate-roadmap", response_model=RoadmapResponse)
def generate_roadmap(request: RoadmapRequest):
    input_data = request.model_dump()

    research_data = researchAgent(input_data)
    career_data = careerAnalysisAgent(research_data)
    skill_gap_data = skillGapAgent(career_data)
    roadmap_data = roadmapAgent(skill_gap_data)
    portfolio_data = portfolioAgent(roadmap_data)
    income_data = incomeAgent(portfolio_data)
    content_data = contentAgent(income_data)

    return {
        "careerPath": content_data["careerPath"],
        "skills": content_data["skills"],
        "skillGap": content_data["skillGap"],
        "learningRoadmap": content_data["learningRoadmap"],
        "portfolioProjects": content_data["portfolioProjects"],
        "incomeOpportunities": content_data["incomeOpportunities"],
        "actionPlan": content_data["actionPlan"],
        "contentToolkit": content_data["contentToolkit"],
    }
