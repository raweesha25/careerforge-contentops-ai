from backend.services.agents import (
    careerAnalysisAgent,
    contentAgent,
    incomeAgent,
    portfolioAgent,
    researchAgent,
    roadmapAgent,
)


def test_agent_pipeline_passes_data_between_steps():
    input_data = {
        "careerTopic": "AI Engineering",
        "targetAudience": "University Students",
        "careerGoal": "Get a remote internship",
    }

    research_data = researchAgent(input_data)
    assert research_data["careerTopic"] == "AI Engineering"
    assert research_data["targetAudience"] == "University Students"
    assert research_data["careerGoal"] == "Get a remote internship"
    assert research_data["industryTrends"]
    assert research_data["learnerChallenges"]
    assert research_data["careerOpportunities"]

    career_data = careerAnalysisAgent(research_data)
    assert "AI Engineering" in career_data["careerPath"]
    assert career_data["skills"]

    roadmap_data = roadmapAgent(career_data)
    assert len(roadmap_data["actionPlan"]) == 4

    portfolio_data = portfolioAgent(roadmap_data)
    assert len(portfolio_data["portfolioProjects"]) == 3

    income_data = incomeAgent(portfolio_data)
    assert len(income_data["incomeOpportunities"]) == 3

    content_data = contentAgent(income_data)
    assert set(content_data["contentToolkit"]) == {
        "linkedInPost",
        "portfolioBio",
        "projectPitch",
        "reelScript",
    }


def test_research_agent_uses_defaults_for_blank_input():
    research_data = researchAgent(
        {
            "careerTopic": " ",
            "targetAudience": " ",
            "careerGoal": " ",
        }
    )

    assert research_data["careerTopic"] == "Technology"
    assert research_data["targetAudience"] == "students"
    assert research_data["careerGoal"] == "start a career"
