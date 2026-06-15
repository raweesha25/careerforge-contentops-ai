"use client";

import { useState } from "react";

type RoadmapResponse = {
  careerPath: string;
  skills: string[];
  skillGap: {
    currentSkills: string[];
    recommendedSkills: string[];
    skillsToBuild: string[];
    summary: string;
  };
  learningRoadmap: {
    phase: string;
    timeline: string;
    focus: string;
  }[];
  portfolioProjects: string[];
  incomeOpportunities: string[];
  actionPlan: string[];
  contentToolkit: {
    linkedInPost: string;
    portfolioBio: string;
    projectPitch: string;
    reelScript: string;
  };
};

export default function Home() {
  const [careerTopic, setCareerTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedContent, setCopiedContent] = useState("");
  const isFormValid = Boolean(
    careerTopic.trim() && targetAudience.trim() && careerGoal.trim()
  );

  const generateRoadmap = async () => {
    if (!isFormValid) {
      setError("Please complete all fields before generating a career plan.");
      setSuccess("");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    setRoadmap(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          careerTopic: careerTopic.trim(),
          targetAudience: targetAudience.trim(),
          careerGoal: careerGoal.trim(),
          currentSkills: currentSkills.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate career roadmap.");
      }

      const data: RoadmapResponse = await response.json();
      setRoadmap(data);
      setSuccess("Career roadmap generated successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating your roadmap."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedContent(label);

      setTimeout(() => {
        setCopiedContent("");
      }, 2000);
    } catch {
      setError("Unable to copy content. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-8 py-20">
        <h1 className="text-6xl font-bold mb-6">
          CareerForge AI
        </h1>

        <p className="text-xl text-gray-400 mb-12">
          AI-powered career growth platform helping students build
          professional skills, create portfolios, discover career paths,
          and achieve financial independence.
        </p>

        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-6">
            Generate Your Career Roadmap
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Career Topic (e.g. AI Engineering)"
              value={careerTopic}
              onChange={(event) => setCareerTopic(event.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Target Audience"
              value={targetAudience}
              onChange={(event) => setTargetAudience(event.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Career Goal"
              value={careerGoal}
              onChange={(event) => setCareerGoal(event.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Current Skills (optional, comma separated)"
              value={currentSkills}
              onChange={(event) => setCurrentSkills(event.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-zinc-700"
            />

            <button
              onClick={generateRoadmap}
              disabled={isLoading || !isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate Career Plan"}
            </button>

            {!isFormValid && (
              <p className="text-sm text-gray-400">
                Complete all three fields to generate your career plan.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 bg-zinc-900 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Career Insights
          </h2>

          {isLoading && (
            <p>
              Generating your AI-powered roadmap...
            </p>
          )}

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-400 mb-6">
              {success}
            </p>
          )}

          {!isLoading && !error && !roadmap && (
            <p>
              Your AI-generated roadmap will appear here.
            </p>
          )}

          {roadmap && (
            <div className="grid gap-6">
              <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                <h3 className="text-xl font-semibold mb-3">
                  Career Path
                </h3>
                <p className="text-gray-300 leading-7">{roadmap.careerPath}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                  <h3 className="text-xl font-semibold mb-3">
                    Skills
                  </h3>
                  <ul className="space-y-2">
                    {roadmap.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border border-zinc-800 rounded-lg px-4 py-3 text-gray-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                  <h3 className="text-xl font-semibold mb-3">
                    Portfolio Projects
                  </h3>
                  <ul className="space-y-2">
                    {roadmap.portfolioProjects.map((project) => (
                      <li
                        key={project}
                        className="border border-zinc-800 rounded-lg px-4 py-3 text-gray-300"
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                <h3 className="text-xl font-semibold mb-3">
                  Skill Gap Analysis
                </h3>
                <p className="text-gray-300 leading-7 mb-4">
                  {roadmap.skillGap.summary}
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border border-zinc-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Current Skills</h4>
                    <ul className="space-y-2 text-gray-300">
                      {roadmap.skillGap.currentSkills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Recommended Skills</h4>
                    <ul className="space-y-2 text-gray-300">
                      {roadmap.skillGap.recommendedSkills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Skills To Build</h4>
                    <ul className="space-y-2 text-gray-300">
                      {roadmap.skillGap.skillsToBuild.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                <h3 className="text-xl font-semibold mb-3">
                  Learning Roadmap
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {roadmap.learningRoadmap.map((phase) => (
                    <div
                      key={phase.phase}
                      className="border border-zinc-800 rounded-lg p-4"
                    >
                      <p className="text-sm text-blue-400 mb-1">
                        {phase.timeline}
                      </p>
                      <h4 className="font-semibold mb-2">{phase.phase}</h4>
                      <p className="text-gray-300 leading-7">{phase.focus}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                <h3 className="text-xl font-semibold mb-3">
                  Income Opportunities
                </h3>
                <ul className="grid gap-3 md:grid-cols-3">
                  {roadmap.incomeOpportunities.map((opportunity) => (
                    <li
                      key={opportunity}
                      className="border border-zinc-800 rounded-lg p-4 text-gray-300"
                    >
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                <h3 className="text-xl font-semibold mb-3">
                  Action Plan
                </h3>
                <ol className="space-y-3">
                  {roadmap.actionPlan.map((action, index) => (
                    <li key={action} className="flex gap-3 text-gray-300">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <span className="pt-1">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border border-zinc-800 rounded-xl p-5 bg-black/40">
                <h3 className="text-xl font-semibold mb-3">
                  Content Toolkit
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-zinc-800 rounded-lg p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="font-semibold">LinkedIn Post</h4>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            "LinkedIn Post",
                            roadmap.contentToolkit.linkedInPost
                          )
                        }
                        className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-gray-300 hover:bg-zinc-800"
                      >
                        {copiedContent === "LinkedIn Post"
                          ? "Copied LinkedIn Post"
                          : "Copy"}
                      </button>
                    </div>
                    <p className="text-gray-300 leading-7">
                      {roadmap.contentToolkit.linkedInPost}
                    </p>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="font-semibold">Portfolio Bio</h4>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            "Portfolio Bio",
                            roadmap.contentToolkit.portfolioBio
                          )
                        }
                        className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-gray-300 hover:bg-zinc-800"
                      >
                        {copiedContent === "Portfolio Bio"
                          ? "Copied Portfolio Bio"
                          : "Copy"}
                      </button>
                    </div>
                    <p className="text-gray-300 leading-7">
                      {roadmap.contentToolkit.portfolioBio}
                    </p>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="font-semibold">Project Pitch</h4>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            "Project Pitch",
                            roadmap.contentToolkit.projectPitch
                          )
                        }
                        className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-gray-300 hover:bg-zinc-800"
                      >
                        {copiedContent === "Project Pitch"
                          ? "Copied Project Pitch"
                          : "Copy"}
                      </button>
                    </div>
                    <p className="text-gray-300 leading-7">
                      {roadmap.contentToolkit.projectPitch}
                    </p>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="font-semibold">Reel Script</h4>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            "Reel Script",
                            roadmap.contentToolkit.reelScript
                          )
                        }
                        className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-gray-300 hover:bg-zinc-800"
                      >
                        {copiedContent === "Reel Script"
                          ? "Copied Reel Script"
                          : "Copy"}
                      </button>
                    </div>
                    <p className="text-gray-300 leading-7">
                      {roadmap.contentToolkit.reelScript}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>


      </section>
    </main>
  );
}
