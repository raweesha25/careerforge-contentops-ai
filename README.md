# CareerForge ContentOps AI

CareerForge ContentOps AI is a career-growth MVP that helps students turn a career goal into a practical roadmap, portfolio ideas, income opportunities, an action plan, and reusable career content.

The app uses a Next.js frontend and a FastAPI backend with a simple multi-agent pipeline. The current agents use deterministic sample logic only. No OpenAI APIs are used yet.

## Features

- Career roadmap generation from a topic, audience, and goal
- Multi-agent backend architecture
- Skills, portfolio project ideas, income opportunities, and weekly action plan
- Content Toolkit with LinkedIn post, portfolio bio, project pitch, and reel script
- Copy buttons for generated content
- Loading, success, error, and form validation states

## Project Structure

```text
careerforge-contentops-ai/
|-- backend/
|   |-- main.py
|   |-- requirements.txt
|   `-- services/
|       `-- agents.py
|-- frontend/
|   |-- app/
|   |   |-- page.tsx
|   |   |-- layout.tsx
|   |   `-- globals.css
|   |-- package.json
|   `-- tsconfig.json
|-- AGENTS.md.txt
|-- MVP_OUTPUT.json.txt
|-- PROJECT_OVERVIEW.md.txt
`-- README.md
```

## Backend Setup

From the project root:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

Main endpoint:

```text
POST /generate-roadmap
```

Expected request body:

```json
{
  "careerTopic": "AI Engineering",
  "targetAudience": "University Students",
  "careerGoal": "Get a remote internship"
}
```

## Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

## Local Demo Flow

1. Start the FastAPI backend.
2. Start the Next.js frontend.
3. Open `http://localhost:3000`.
4. Fill in Career Topic, Target Audience, and Career Goal.
5. Click Generate Career Plan.
6. Review the generated roadmap and Content Toolkit.
7. Use the Copy buttons to reuse generated content.

## Agent Pipeline

```text
researchAgent()
  -> careerAnalysisAgent()
  -> roadmapAgent()
  -> portfolioAgent()
  -> incomeAgent()
  -> contentAgent()
```

Each agent receives data from the previous step, adds its own output, and passes the enriched data forward.

## Verification

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend syntax check:

```bash
python -m compileall backend\main.py backend\services\agents.py
```

## Next Improvements

- Add backend tests for `/generate-roadmap`
- Add screenshot assets to the README
- Add PDF export for generated roadmaps
- Replace deterministic agent logic with OpenAI-powered generation later
