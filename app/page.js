"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const techOptions = useMemo(
    () => [
      "Foundation Models / GPT-class AI",
      "Multimodal Generative AI",
      "Semi-autonomous AI Agents",
      "Large Behavioral AI Models",
      "Constitutional / Aligned AI",
      "Analogue AI & Neuromorphic Computing",
      "Exascale Computing",
      "Photonic (Petabit-scale) Chips",
      "AI-discovered CRISPR Platforms",
      "Predictive Vaccine & Drug Development",
      "Living CAR-T Therapies",
      "In-vivo Robotic Surgery",
      "Injectable Neuroprosthetics",
      "Brain–Computer Interfaces",
      "Nanorobotic Swarms",
      "Self-replicating DNA Nanobots",
      "Brain-controlled Microbots",
      "Autonomous Drone Swarms",
      "Uncrewed Combat Systems",
      "Laser-based Directed Energy",
      "Zero-Knowledge Proof Cryptography",
      "Hardware-level Cyber Weapons",
      "Matter Creation from Light",
      "Quantum Energy Transmission",
      "Spray-on Sensors & Interfaces",
      "Ambient & Invisible UI",
      "Synthetic Media (creator-grade)",
      "Memory Manipulation via Light",
      "AI-led Scientific Discovery",
      "AI-run Organizations",
    ],
    []
  );

  const [challenge, setChallenge] = useState("");
  const [tech, setTech] = useState("");
  const [story, setStory] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const introText =
    "While we finish cooking, you can enjoy future stories from our home grown agent STOR-E.";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = challenge.trim();
    if (!trimmed || !tech || isStreaming) return;

    setShowForm(false);
    setStory("");
    setIsStreaming(true);

    try {
      const prompt = `Business challenge: ${trimmed}\nTechnology: ${tech}`;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to start streaming response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n");
        buffer = parts.pop() || "";

        for (const line of parts) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const payload = trimmedLine.replace("data:", "").trim();
          if (payload === "[DONE]") continue;

          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content || "";
            if (!delta) continue;
            assistantText += delta;
            setStory(assistantText);
          } catch (err) {
            // Ignore malformed chunks
          }
        }
      }
    } catch (error) {
      setStory(
        "I ran into an issue reaching Azure. Please verify the API key and deployment."
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleReset = () => {
    setShowForm(true);
    setStory("");
  };

  return (
    <div className="min-h-screen bg-[#0b122b] text-white">
      <div className="relative overflow-hidden">
        <div className="starfield absolute inset-0 opacity-50" />
        <div className="glow-orb absolute -left-24 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top,#7c5cff,transparent_65%)] opacity-60" />
        <div className="glow-orb absolute right-0 top-64 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,#6ef3ff,transparent_70%)] opacity-40" />
        <div className="glow-orb absolute left-1/3 top-[520px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,#ff6b4a,transparent_70%)] opacity-30" />

        <div className="relative z-10 px-6 pt-10" />

        <main className="relative z-10 flex min-h-[78vh] items-center justify-center px-6 pb-24">
          <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 pt-10 text-center">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="bot-ring absolute h-72 w-72 rounded-full opacity-30" />
                <div className="bot-ring absolute h-52 w-52 rounded-full opacity-60" />
                <div className="float-slow bot-core relative flex h-44 w-44 items-center justify-center rounded-full">
                  <div className="absolute inset-3 rounded-full border border-white/10 bg-[rgba(11,15,36,0.6)]" />
                  <div className="relative z-10 flex items-center gap-6">
                    <span className="h-4 w-4 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
                    <span className="h-4 w-4 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div className="scanline absolute -bottom-6 h-1 w-32 rounded-full opacity-60" />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <h1 className="text-5xl font-semibold tracking-[0.12em] text-white sm:text-6xl lg:text-7xl">
                  <span className="inline-flex items-center gap-3">
                    <span className="tracking-[0.2em]">A1.</span>
                    <span className="inline-flex items-center gap-1">
                      <span className="roll-window">
                        <span className="roll-track roll-loop">
                          <span>9</span>
                          <span>R</span>
                          <span>+</span>
                          <span>F</span>
                          <span>4</span>
                          <span>Q</span>
                          <span>G</span>
                          <span>S</span>
                        </span>
                      </span>
                      <span className="roll-window">
                        <span className="roll-track roll-loop roll-delay-1">
                          <span>3</span>
                          <span>T</span>
                          <span>0</span>
                          <span>−</span>
                          <span>8</span>
                          <span>H</span>
                          <span>N</span>
                          <span>O</span>
                        </span>
                      </span>
                      <span className="roll-window">
                        <span className="roll-track roll-loop roll-delay-2">
                          <span>6</span>
                          <span>Y</span>
                          <span>÷</span>
                          <span>1</span>
                          <span>N</span>
                          <span>P</span>
                          <span>9</span>
                          <span>L</span>
                        </span>
                      </span>
                      <span className="roll-window">
                        <span className="roll-track roll-loop roll-delay-3">
                          <span>2</span>
                          <span>V</span>
                          <span>+</span>
                          <span>8</span>
                          <span>÷</span>
                          <span>4</span>
                          <span>K</span>
                          <span>V</span>
                        </span>
                      </span>
                      <span className="roll-window">
                        <span className="roll-track roll-loop roll-delay-4">
                          <span>5</span>
                          <span>G</span>
                          <span>×</span>
                          <span>3</span>
                          <span>+</span>
                          <span>M</span>
                          <span>9</span>
                          <span>E</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </h1>
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(124,92,255,0.45)] bg-[rgba(124,92,255,0.15)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  Something&apos;s cooking
                </div>
                <p className="mt-2 max-w-xl text-base text-white/80 sm:text-lg">
                  {introText}
                </p>
              </div>
            </div>

            <div className="w-full max-w-5xl sm:-ml-16">
              <div className="mt-4 flex w-full flex-col items-center gap-0 text-center sm:flex-row sm:items-center sm:gap-0 sm:text-left sm:justify-center">
                <div className="flex w-full flex-1 items-center justify-center sm:justify-end">
                  <img
                    src="/storyteller.png"
                    alt="Delphi, a future-seeing bot"
                    className="h-40 w-40 sm:h-44 sm:w-44"
                  />
                </div>
                <div className="w-full flex-1 sm:-ml-8">
                  {showForm ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        value={challenge}
                        onChange={(event) => setChallenge(event.target.value)}
                        placeholder="State a business challenge"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                      />
                      <div className="relative">
                        <select
                          value={tech}
                          onChange={(event) => setTech(event.target.value)}
                          className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        >
                          <option value="" className="bg-[#0b0f24] text-white/70">
                            Select a technology
                          </option>
                          {techOptions.map((item) => (
                            <option
                              key={item}
                              value={item}
                              className="bg-[#0b0f24]"
                            >
                              {item}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70">
                          ▼
                        </span>
                      </div>
                      <button
                        type="submit"
                        disabled={isStreaming}
                        className="w-full rounded-xl bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0b0f24] transition disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isStreaming ? "Telling..." : "Tell me a story"}
                      </button>
                    </form>
                  ) : (
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-base text-white/85 shadow-[0_20px_50px_rgba(8,12,32,0.4)]">
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {story}
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-5 w-full rounded-2xl border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
                      >
                        Tell another story
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
