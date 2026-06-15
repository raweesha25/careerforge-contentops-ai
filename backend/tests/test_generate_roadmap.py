from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_health_check():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"status": "CareerForge AI backend is running"}


def test_generate_roadmap_returns_expected_shape():
    response = client.post(
        "/generate-roadmap",
        json={
            "careerTopic": "AI Engineering",
            "targetAudience": "University Students",
            "careerGoal": "Get a remote internship",
            "currentSkills": "Python, SQL",
        },
    )

    assert response.status_code == 200

    data = response.json()
    assert set(data) == {
        "careerPath",
        "skills",
        "skillGap",
        "learningRoadmap",
        "portfolioProjects",
        "incomeOpportunities",
        "actionPlan",
        "contentToolkit",
    }
    assert isinstance(data["careerPath"], str)
    assert len(data["skills"]) == 5
    assert data["skillGap"]["currentSkills"] == ["Python", "SQL"]
    assert data["skillGap"]["skillsToBuild"]
    assert len(data["learningRoadmap"]) == 4
    assert len(data["portfolioProjects"]) == 3
    assert len(data["incomeOpportunities"]) == 3
    assert len(data["actionPlan"]) == 4
    assert set(data["contentToolkit"]) == {
        "linkedInPost",
        "portfolioBio",
        "projectPitch",
        "reelScript",
    }


def test_generate_roadmap_validates_required_fields():
    response = client.post(
        "/generate-roadmap",
        json={
            "careerTopic": "AI Engineering",
            "targetAudience": "University Students",
        },
    )

    assert response.status_code == 422
