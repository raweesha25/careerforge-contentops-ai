def researchAgent(input_data: dict) -> dict:
    # Research Agent: identifies learner needs, market signals, and opportunities.
    career_topic = input_data["careerTopic"].strip() or "Technology"
    target_audience = input_data["targetAudience"].strip() or "students"
    career_goal = input_data["careerGoal"].strip() or "start a career"

    return {
        **input_data,
        "careerTopic": career_topic,
        "targetAudience": target_audience,
        "careerGoal": career_goal,
        "industryTrends": [
            f"Employers increasingly value practical {career_topic} experience.",
            "Portfolio evidence is becoming more important than certificates alone.",
            "Remote and freelance work reward clear communication and self-direction.",
        ],
        "learnerChallenges": [
            f"{target_audience} often need a clear path from learning to earning.",
            "Beginners can struggle to choose projects that prove useful skills.",
            "Many learners need weekly milestones to stay consistent.",
        ],
        "careerOpportunities": [
            f"Junior {career_topic} roles",
            "Internships and apprenticeships",
            "Freelance or project-based work",
        ],
    }


def careerAnalysisAgent(research_data: dict) -> dict:
    # Career Analysis Agent: turns research into a focused career direction.
    career_topic = research_data["careerTopic"]
    career_goal = research_data["careerGoal"]

    return {
        **research_data,
        "careerPath": (
            f"Build a foundation in {career_topic}, practice with small projects, "
            f"publish portfolio proof, and apply consistently toward {career_goal}."
        ),
        "skills": [
            f"{career_topic} fundamentals",
            "Problem solving",
            "Portfolio project planning",
            "Professional communication",
            "Interview and application preparation",
        ],
    }


def roadmapAgent(career_data: dict) -> dict:
    # Roadmap Agent: converts the career direction into weekly execution steps.
    skills = career_data["skills"]

    return {
        **career_data,
        "actionPlan": [
            f"Week 1: Learn {skills[0]} and summarize the core concepts.",
            f"Week 2: Practice {skills[1]} with three small exercises.",
            f"Week 3: Build one project using {skills[2]}.",
            f"Week 4: Prepare applications using {skills[3]} and {skills[4]}.",
        ],
    }


def portfolioAgent(roadmap_data: dict) -> dict:
    # Portfolio Agent: recommends projects that demonstrate practical ability.
    career_topic = roadmap_data["careerTopic"]
    target_audience = roadmap_data["targetAudience"]

    return {
        **roadmap_data,
        "portfolioProjects": [
            f"{career_topic} starter project designed for {target_audience}",
            f"{career_topic} case study solving a realistic industry problem",
            "Personal portfolio website with project summaries and outcomes",
        ],
    }


def incomeAgent(portfolio_data: dict) -> dict:
    # Income Agent: maps the roadmap and portfolio into earning opportunities.
    career_topic = portfolio_data["careerTopic"]

    return {
        **portfolio_data,
        "incomeOpportunities": [
            f"Apply for junior {career_topic} roles with portfolio links.",
            "Offer freelance services based on completed portfolio projects.",
            "Create LinkedIn content explaining project lessons and results.",
        ],
    }


def contentAgent(income_data: dict) -> dict:
    # Content Agent: turns the roadmap into career content students can reuse.
    career_topic = income_data["careerTopic"]
    target_audience = income_data["targetAudience"]
    career_goal = income_data["careerGoal"]
    first_project = income_data["portfolioProjects"][0]

    return {
        **income_data,
        "contentToolkit": {
            "linkedInPost": (
                f"I am building my path toward {career_goal} by learning "
                f"{career_topic}, creating portfolio projects, and sharing my "
                "progress publicly. This week, I am focusing on fundamentals "
                "and turning practice into visible proof of skill."
            ),
            "portfolioBio": (
                f"{target_audience} focused on {career_topic}, practical "
                "projects, and career-ready problem solving. I am building a "
                "portfolio that shows steady learning, clear communication, "
                "and real-world application."
            ),
            "projectPitch": (
                f"{first_project}: a practical portfolio project that helps "
                f"showcase {career_topic} fundamentals, problem solving, and "
                "the ability to explain technical work clearly."
            ),
            "reelScript": (
                f"Hook: Want to start a career in {career_topic}? Step one is "
                "not learning everything. Start with fundamentals, build one "
                "small project, write down what you learned, and share it as "
                "portfolio proof."
            ),
        },
    }
