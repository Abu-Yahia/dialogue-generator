import React, { useState, useRef } from "react";

const QUESTIONS_DATA = [{"id":"1","category":"Reflective","stage":"Discovery","question":"Don't you think we're missing a key assumption here?","tense":"Negative Interrogative","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"2","category":"Reflective","stage":"Discovery","question":"What makes you confident this is the best option?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"3","category":"Reflective","stage":"Discovery","question":"What's the real outcome you want from this decision?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"4","category":"Reflective","stage":"Discovery","question":"What would success look like in one sentence?","tense":"Conditional","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"5","category":"Reflective","stage":"Discovery","question":"What are we optimizing for: time cost or quality?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"6","category":"Reflective","stage":"Discovery","question":"What belief is driving your position?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"7","category":"Reflective","stage":"Discovery","question":"If we replay this in 30 days what would you regret?","tense":"Conditional","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"8","category":"Reflective","stage":"Discovery","question":"What's the biggest risk you're willing to accept?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"9","category":"Reflective","stage":"Discovery","question":"What's the hidden cost of doing nothing?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"10","category":"Reflective","stage":"Discovery","question":"What problem are we actually solving?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"11","category":"Reflective","stage":"Discovery","question":"What's \"acceptable\" mean to you here?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"12","category":"Reflective","stage":"Discovery","question":"What's the one thing that cannot fail?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"13","category":"Reflective","stage":"Discovery","question":"What are we assuming will stay constant?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"14","category":"Reflective","stage":"Discovery","question":"What are we not discussing because it's uncomfortable?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"15","category":"Reflective","stage":"Discovery","question":"Where do you think this plan could break?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"16","category":"Reflective","stage":"Discovery","question":"What would make you change your mind?","tense":"Conditional","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"17","category":"Reflective","stage":"Discovery","question":"What's the strongest argument against your view?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"18","category":"Reflective","stage":"Discovery","question":"What's the strongest argument against my view?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"19","category":"Reflective","stage":"Discovery","question":"What's the core constraint we must respect?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"20","category":"Reflective","stage":"Discovery","question":"What's the real priority behind this request?","tense":"Present Simple","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"21","category":"Reflective","stage":"Discovery","question":"What's driving the urgency-risk or perception?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"22","category":"Reflective","stage":"Discovery","question":"How would you explain this decision to leadership?","tense":"Conditional","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"23","category":"Reflective","stage":"Discovery","question":"How would you explain it to the customer?","tense":"Conditional","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"24","category":"Reflective","stage":"Discovery","question":"What are we trying to avoid more than achieve?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"25","category":"Reflective","stage":"Discovery","question":"What's the trade-off you're implicitly accepting?","tense":"Present Continuous","hint":"Client pauses to think critically and shares a thoughtful, honest perspective."},{"id":"51","category":"Scale","stage":"Problem","question":"On a scale of 1-10 how urgent is this?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"52","category":"Scale","stage":"Problem","question":"On a scale of 1-10 how confident are you in this plan?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"58","category":"Scale","stage":"Problem","question":"What level of quality is required: basic standard or premium?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"59","category":"Scale","stage":"Problem","question":"What percentage of the scope is truly critical?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"64","category":"Scale","stage":"Problem","question":"What is your risk tolerance: low medium or high?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"72","category":"Scale","stage":"Problem","question":"How important is speed versus cost (1-10)?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"73","category":"Scale","stage":"Problem","question":"How important is quality versus speed (1-10)?","tense":"Present Simple","hint":"Client quantifies or gives magnitude to the problem or opportunity."},{"id":"91","category":"Obstacle","stage":"Problem","question":"What is preventing us from deciding today?","tense":"Present Continuous","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"92","category":"Obstacle","stage":"Problem","question":"What is blocking execution right now?","tense":"Present Continuous","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"93","category":"Obstacle","stage":"Problem","question":"What dependency must be cleared first?","tense":"Present Simple","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"97","category":"Obstacle","stage":"Problem","question":"What risk is stopping you from agreeing?","tense":"Present Continuous","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"99","category":"Obstacle","stage":"Problem","question":"What is the biggest constraint on your side?","tense":"Present Simple","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"101","category":"Obstacle","stage":"Problem","question":"What is the main bottleneck in the process?","tense":"Present Simple","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"105","category":"Obstacle","stage":"Problem","question":"What is the most likely failure point?","tense":"Present Simple","hint":"Client reveals a specific challenge, bottleneck, or pain point with detail."},{"id":"131","category":"Hypothetical","stage":"Solution","question":"What if we deliver 70% now and 30% next sprint?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"132","category":"Hypothetical","stage":"Solution","question":"What if we reduce scope to protect the deadline?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"135","category":"Hypothetical","stage":"Solution","question":"What if we switch to a pilot first?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"140","category":"Hypothetical","stage":"Solution","question":"What if we agree on a \"minimum viable\" version today?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"149","category":"Hypothetical","stage":"Solution","question":"What if we accept a controlled risk with mitigation?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"157","category":"Hypothetical","stage":"Solution","question":"What if we do nothing-what happens next?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"158","category":"Hypothetical","stage":"Solution","question":"What if we commit today but review in two weeks?","tense":"Conditional","hint":"Client engages with a future scenario and explores possibilities positively."},{"id":"171","category":"Commitment","stage":"Close","question":"Can we agree on the next step right now?","tense":"Modal Present","hint":"Client confirms alignment, next steps, or a decision."},{"id":"172","category":"Commitment","stage":"Close","question":"Can we confirm who owns the decision?","tense":"Modal Present","hint":"Client confirms alignment, next steps, or a decision."},{"id":"173","category":"Commitment","stage":"Close","question":"Can we confirm the deadline we're committing to?","tense":"Modal Present","hint":"Client confirms alignment, next steps, or a decision."},{"id":"176","category":"Commitment","stage":"Close","question":"What would you need to say \"yes\" today?","tense":"Conditional","hint":"Client confirms alignment, next steps, or a decision."},{"id":"183","category":"Commitment","stage":"Close","question":"What is your final decision today?","tense":"Present Simple","hint":"Client confirms alignment, next steps, or a decision."},{"id":"185","category":"Commitment","stage":"Close","question":"When should we review progress next?","tense":"Present Simple","hint":"Client confirms alignment, next steps, or a decision."},{"id":"197","category":"Commitment","stage":"Close","question":"Are there any final objections before we proceed?","tense":"Present Simple","hint":"Client confirms alignment, next steps, or a decision."},{"id":"199","category":"Commitment","stage":"Close","question":"Shall we proceed with the agreed plan?","tense":"Modal Present","hint":"Client confirms alignment, next steps, or a decision."},{"id":"201","category":"Situation","stage":"Opening","question":"Could you describe your current operational workflow for this process?","tense":"","hint":"Client describes current state, processes, and environment factually."},{"id":"202","category":"Situation","stage":"Opening","question":"What technologies are currently deployed to manage this function?","tense":"","hint":"Client describes current state, processes, and environment factually."},{"id":"203","category":"Implication","stage":"Problem","question":"What is the broader impact of these challenges on your team's productivity and morale?","tense":"","hint":"Client explains downstream consequences and organizational impact."},{"id":"204","category":"Implication","stage":"Problem","question":"How do these issues affect your ability to meet strategic objectives?","tense":"","hint":"Client explains downstream consequences and organizational impact."},{"id":"205","category":"Need-Payoff","stage":"Solution","question":"If we could resolve this challenge, how would that positively impact your bottom line?","tense":"","hint":"Client articulates the value and benefit of solving the problem."},{"id":"206","category":"Need-Payoff","stage":"Solution","question":"What benefits would your organization realize by implementing a more efficient solution?","tense":"","hint":"Client articulates the value and benefit of solving the problem."},{"id":"207","category":"Challenging","stage":"Solution","question":"Have you considered the long-term implications of maintaining your current approach?","tense":"","hint":"Client acknowledges a gap or blind spot and opens to new thinking."},{"id":"209","category":"Prioritization","stage":"Solution","question":"How would you rank the importance of speed, cost, and quality for this project?","tense":"","hint":"Client ranks or weighs competing priorities clearly."},{"id":"210","category":"Risk Assessment","stage":"Problem","question":"What are the primary risks associated with this strategic direction?","tense":"","hint":"Client identifies and evaluates potential risks with business context."}];

const ALL_CATEGORIES = ["Reflective","Scale","Obstacle","Hypothetical","Commitment","Situation","Implication","Need-Payoff","Challenging","Prioritization","Risk Assessment"];
const STAGE_ORDER = ["Opening","Discovery","Problem","Solution","Close"];
const INDUSTRIES = ["General Business","Technology / SaaS","Finance / Banking","Healthcare","Manufacturing","Retail & E-Commerce"];

const STAGE_COLORS = {
  Opening: "#6EE7B7",
  Discovery: "#93C5FD",
  Problem: "#FCA5A5",
  Solution: "#C4B5FD",
  Close: "#FDE68A"
};

export default function DialogueGenerator() {
  const [clientName, setClientName] = useState("Rashida");
  const [industry, setIndustry] = useState("General Business");
  const [turns, setTurns] = useState(12);
  const [mode, setMode] = useState("auto"); // auto or manual
  const [selectedCategories, setSelectedCategories] = useState(["Reflective","Obstacle","Hypothetical","Commitment"]);
  const [dialogue, setDialogue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState("");
  const dialogueRef = useRef(null);
  const [speaking, setSpeaking] = useState(null); // null | "all" | turnIndex
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);

  // ── Microsoft Edge TTS via SpeechSynthesis with Edge voices ──
  const EDGE_MALE_VOICE  = "Microsoft Guy Online (Natural) - English (United States)";
  const EDGE_FEMALE_VOICE = "Microsoft Jenny Online (Natural) - English (United States)";

  // Fallback priority list if Edge voices not available
  const MALE_FALLBACKS   = ["Google UK English Male", "Alex", "Daniel", "David", "Mark"];
  const FEMALE_FALLBACKS = ["Google UK English Female", "Samantha", "Karen", "Zira", "Victoria"];

  const pickVoice = (preferredName, fallbacks) => {
    const all = window.speechSynthesis.getVoices();
    return all.find(v => v.name === preferredName)
        || fallbacks.reduce((found, name) => found || all.find(v => v.name === name), null)
        || all.find(v => v.lang.startsWith("en"))
        || all[0];
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeaking(null);
    setIsPaused(false);
  };

  const buildUtt = (text, voiceType) => {
    const utt = new SpeechSynthesisUtterance(text);
    if (voiceType === "consultant") {
      utt.voice = pickVoice(EDGE_MALE_VOICE, MALE_FALLBACKS);
      utt.pitch = 0.9; utt.rate = 0.93;
    } else {
      utt.voice = pickVoice(EDGE_FEMALE_VOICE, FEMALE_FALLBACKS);
      utt.pitch = 1.05; utt.rate = 0.93;
    }
    utt.volume = 1;
    return utt;
  };

  const playTurn = (turnIndex) => {
    const turn = dialogue[turnIndex];
    if (!turn) return;
    window.speechSynthesis.cancel();
    setSpeaking(turnIndex);
    setIsPaused(false);

    const consultantUtt = buildUtt(turn.consultant, "consultant");
    consultantUtt.onend = () => {
      const clientUtt = buildUtt(turn.client, "client");
      clientUtt.onend = () => setSpeaking(null);
      clientUtt.onerror = () => setSpeaking(null);
      utteranceRef.current = clientUtt;
      window.speechSynthesis.speak(clientUtt);
    };
    consultantUtt.onerror = () => setSpeaking(null);
    utteranceRef.current = consultantUtt;
    window.speechSynthesis.speak(consultantUtt);
  };

  const playAll = () => {
    if (!dialogue || dialogue.length === 0) return;
    window.speechSynthesis.cancel();
    setSpeaking("all");
    setIsPaused(false);
    let idx = 0;

    const playNext = () => {
      if (idx >= dialogue.length) { setSpeaking(null); return; }
      const turn = dialogue[idx];

      const consultantUtt = buildUtt(turn.consultant, "consultant");
      consultantUtt.onend = () => {
        const clientUtt = buildUtt(turn.client, "client");
        clientUtt.onend = () => { idx++; setTimeout(playNext, 450); };
        clientUtt.onerror = () => setSpeaking(null);
        utteranceRef.current = clientUtt;
        window.speechSynthesis.speak(clientUtt);
      };
      consultantUtt.onerror = () => setSpeaking(null);
      utteranceRef.current = consultantUtt;
      window.speechSynthesis.speak(consultantUtt);
    };
    playNext();
  };

  const togglePause = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const buildPrompt = () => {
    let pool = QUESTIONS_DATA;
    if (mode === "manual" && selectedCategories.length > 0) {
      pool = pool.filter(q => selectedCategories.includes(q.category));
    }

    // Sort by stage order
    const stageIdx = (s) => STAGE_ORDER.indexOf(s);
    pool.sort((a, b) => stageIdx(a.stage) - stageIdx(b.stage));

    // Pick a balanced subset based on turns
    const picked = [];
    const stageGroups = {};
    for (const q of pool) {
      if (!stageGroups[q.stage]) stageGroups[q.stage] = [];
      stageGroups[q.stage].push(q);
    }

    const stages = STAGE_ORDER.filter(s => stageGroups[s]?.length > 0);
    const perStage = Math.ceil(turns / stages.length);
    for (const stage of stages) {
      const qs = stageGroups[stage];
      const n = Math.min(perStage, qs.length);
      for (let i = 0; i < n; i++) picked.push(qs[i]);
    }
    const finalPool = picked.slice(0, turns);

    const questionList = finalPool.map((q, i) =>
      `Turn ${i+1} [${q.stage} | ${q.category}]: "${q.question}" — Client hint: ${q.hint}`
    ).join("\n");

    return `You are generating a professional business dialogue between a Consultant named Bakkar and a Client named Rashida in the ${industry} industry.

Generate EXACTLY ${turns} turns. Each turn = Consultant asks + Client responds.

Use these questions IN ORDER for the Consultant's turns:
${questionList}

Rules:
- Weave each question naturally into the conversation — do not list them robotically
- The Client's answers must be detailed (3-5 sentences), realistic, and professionally written
- Maintain a coherent narrative arc: Opening → Discovery → Problem → Solution → Close
- The Consultant may add brief contextual bridging phrases before asking
- Keep a highly professional, consultative, persuasive tone throughout

Return ONLY a JSON array. No markdown, no explanation, no code blocks. Just raw JSON:
[
  {"turn": 1, "stage": "Opening", "consultant": "...", "client": "..."},
  ...
]`;
  };

  const generateDialogue = async () => {
    setLoading(true);
    setError("");
    setDialogue(null);
    setStreamingText("");

    try {
      const prompt = buildPrompt();

      const response = await fetch(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 8000,
            stream: true,
            messages: [{ role: "user", content: prompt }]
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error("API Error " + response.status + ": " + errText.slice(0, 300));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(l => l.startsWith("data: "));

        for (const line of lines) {
          const jsonStr = line.replace("data: ", "").trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.type === "content_block_delta" && parsed.delta?.text) {
              fullText += parsed.delta.text;
              setStreamingText(fullText);
            }
          } catch {}
        }
      }

      // Parse final JSON
      const cleaned = fullText.replace(/^```json\s*/i, "").replace(/```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setDialogue(parsed);
      setStreamingText("");
      setTimeout(() => dialogueRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    } catch (e) {
      setError("Failed to generate dialogue. Please try again. " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadText = () => {
    if (!dialogue) return;
    const lines = [
      `BUSINESS DIALOGUE`,
      `Client: ${clientName} | Industry: ${industry} | Turns: ${dialogue.length}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      "=".repeat(60),
      "",
      ...dialogue.map(t => [
        `--- Turn ${t.turn} | ${t.stage} ---`,
        `CONSULTANT: ${t.consultant}`,
        "",
        `${clientName.split(" ")[0].toUpperCase()}: ${t.client}`,
        ""
      ]).flat()
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dialogue_${clientName.replace(" ", "_")}.txt`;
    a.click();
  };

  const downloadJSON = () => {
    if (!dialogue) return;
    const out = {
      meta: { clientName, industry, turns: dialogue.length, generatedAt: new Date().toISOString() },
      dialogue
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dialogue_${clientName.replace(" ", "_")}.json`;
    a.click();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8e0d0",
      padding: "0"
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "32px 48px 28px",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
            <span style={{ fontSize: 11, letterSpacing: 4, color: "#6EE7B7", textTransform: "uppercase", fontFamily: "monospace" }}>STRATEGIC DIALOGUE</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>◆</span>
            <span style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>AI GENERATOR</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 400, margin: 0, letterSpacing: "-0.5px", color: "#f5f0e8" }}>
            Dialogue Architect
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 15, color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
            Generate professional consultant–client conversations from your question library
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>

        {/* Settings Panel */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 32,
          marginBottom: 28
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: 2, color: "#6EE7B7", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>Client Name</label>
              <input
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8, padding: "12px 16px",
                  color: "#f5f0e8", fontSize: 15,
                  fontFamily: "Georgia, serif", outline: "none"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: 2, color: "#6EE7B7", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>Industry</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8, padding: "12px 16px",
                  color: "#f5f0e8", fontSize: 15,
                  fontFamily: "Georgia, serif", outline: "none"
                }}
              >
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>

          {/* Turns */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: 2, color: "#6EE7B7", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>
              <span>Number of Turns</span>
              <span style={{ color: "#f5f0e8", fontSize: 16 }}>{turns}</span>
            </label>
            <input type="range" min={10} max={20} value={turns} onChange={e => setTurns(+e.target.value)}
              style={{ width: "100%", accentColor: "#6EE7B7" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4, fontFamily: "monospace" }}>
              <span>10</span><span>20</span>
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, letterSpacing: 2, color: "#6EE7B7", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" }}>Question Selection Mode</label>
            <div style={{ display: "flex", gap: 12 }}>
              {["auto", "manual"].map(m => (
                <button key={m} onClick={() => setMode(m)} style={{
                  padding: "8px 20px", borderRadius: 6, cursor: "pointer",
                  fontFamily: "monospace", fontSize: 12, letterSpacing: 1, textTransform: "uppercase",
                  border: mode === m ? "1px solid #6EE7B7" : "1px solid rgba(255,255,255,0.15)",
                  background: mode === m ? "rgba(110,231,183,0.12)" : "rgba(255,255,255,0.04)",
                  color: mode === m ? "#6EE7B7" : "rgba(255,255,255,0.5)",
                  transition: "all 0.2s"
                }}>
                  {m === "auto" ? "Auto (AI Chooses)" : "Manual (Pick Categories)"}
                </button>
              ))}
            </div>
          </div>

          {/* Category selector */}
          {mode === "manual" && (
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: 2, color: "#6EE7B7", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" }}>Categories</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ALL_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => toggleCategory(cat)} style={{
                    padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                    fontFamily: "monospace", fontSize: 11, letterSpacing: 1,
                    border: selectedCategories.includes(cat) ? "1px solid #93C5FD" : "1px solid rgba(255,255,255,0.12)",
                    background: selectedCategories.includes(cat) ? "rgba(147,197,253,0.15)" : "rgba(255,255,255,0.03)",
                    color: selectedCategories.includes(cat) ? "#93C5FD" : "rgba(255,255,255,0.4)",
                    transition: "all 0.15s"
                  }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={generateDialogue}
          disabled={loading}
          style={{
            width: "100%", padding: "18px",
            background: loading ? "rgba(110,231,183,0.1)" : "linear-gradient(135deg, rgba(110,231,183,0.2) 0%, rgba(147,197,253,0.2) 100%)",
            border: "1px solid rgba(110,231,183,0.4)",
            borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
            color: "#6EE7B7", fontSize: 15, letterSpacing: 2,
            fontFamily: "monospace", textTransform: "uppercase",
            transition: "all 0.2s", marginBottom: 32,
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "◈  Streaming..." : "◆  Generate Dialogue"}
        </button>

        {/* Streaming Preview */}
        {streamingText && !dialogue && (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(110,231,183,0.15)",
            borderRadius: 12, padding: "24px 28px",
            marginBottom: 28, fontFamily: "monospace",
            fontSize: 13, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7, maxHeight: 320, overflowY: "auto",
            whiteSpace: "pre-wrap", wordBreak: "break-word"
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#6EE7B7", marginBottom: 12, textTransform: "uppercase" }}>
              ◈ Generating — writing dialogue...
            </div>
            {streamingText}
            <span style={{ display: "inline-block", width: 8, height: 14, background: "#6EE7B7", marginLeft: 2, animation: "blink 1s infinite", verticalAlign: "middle" }} />
          </div>
        )}

        {/* Streaming Preview */}
        {streamingText && !dialogue && (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(110,231,183,0.15)",
            borderRadius: 12, padding: "24px 28px",
            marginBottom: 28, fontFamily: "monospace",
            fontSize: 13, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7, maxHeight: 320, overflowY: "auto",
            whiteSpace: "pre-wrap", wordBreak: "break-word"
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#6EE7B7", marginBottom: 12, textTransform: "uppercase" }}>
              ◈ Generating — writing dialogue...
            </div>
            {streamingText}
            <span style={{ display: "inline-block", width: 8, height: 14, background: "#6EE7B7", marginLeft: 2, verticalAlign: "middle" }} />
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(252,165,165,0.1)", border: "1px solid rgba(252,165,165,0.3)", borderRadius: 8, padding: "14px 18px", marginBottom: 24, color: "#FCA5A5", fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Dialogue Output */}
        {dialogue && (
          <div ref={dialogueRef}>
            {/* Export Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <span style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "monospace" }}>
                  {dialogue.length} turns · {clientName} · {industry}
                </span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[["⬇ TXT", downloadText], ["⬇ JSON", downloadJSON]].map(([label, fn]) => (
                  <button key={label} onClick={fn} style={{
                    padding: "8px 18px", borderRadius: 6, cursor: "pointer",
                    fontFamily: "monospace", fontSize: 11, letterSpacing: 1,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.15s"
                  }}>{label}</button>
                ))}
              </div>
            </div>

            {/* Play All Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
              <span style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", textTransform: "uppercase" }}>🎧 Listen</span>
              <div style={{ flex: 1 }} />
              {speaking === "all" ? (
                <>
                  <button onClick={togglePause} style={{ padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, border: "1px solid rgba(253,230,138,0.4)", background: "rgba(253,230,138,0.1)", color: "#FDE68A" }}>
                    {isPaused ? "▶ Resume" : "⏸ Pause"}
                  </button>
                  <button onClick={stopSpeech} style={{ padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, border: "1px solid rgba(252,165,165,0.4)", background: "rgba(252,165,165,0.1)", color: "#FCA5A5" }}>
                    ⏹ Stop
                  </button>
                </>
              ) : (
                <button onClick={playAll} style={{ padding: "8px 22px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, border: "1px solid rgba(110,231,183,0.4)", background: "rgba(110,231,183,0.1)", color: "#6EE7B7" }}>
                  ▶ Play Full Dialogue
                </button>
              )}
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
                🎙 Bakkar (Consultant) · Rashida (Client)
              </span>
            </div>

            {/* Stage Flow */}
            <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
              {[...new Set(dialogue.map(t => t.stage))].map(s => (
                <span key={s} style={{
                  padding: "4px 12px", borderRadius: 20,
                  background: `${STAGE_COLORS[s] || "#aaa"}22`,
                  border: `1px solid ${STAGE_COLORS[s] || "#aaa"}55`,
                  color: STAGE_COLORS[s] || "#aaa",
                  fontSize: 11, fontFamily: "monospace", letterSpacing: 1
                }}>{s}</span>
              ))}
            </div>

            {/* Turns */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {dialogue.map((turn, i) => {
                const stageColor = STAGE_COLORS[turn.stage] || "#aaa";
                return (
                  <div key={i} style={{
                    borderLeft: `2px solid rgba(255,255,255,0.06)`,
                    marginLeft: 0,
                    paddingBottom: 0
                  }}>
                    {/* Stage label if first of this stage */}
                    {(i === 0 || dialogue[i-1].stage !== turn.stage) && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "20px 0 12px"
                      }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: stageColor, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: stageColor, fontFamily: "monospace" }}>{turn.stage}</span>
                        <div style={{ flex: 1, height: 1, background: `${stageColor}22` }} />
                      </div>
                    )}

                    {/* Consultant bubble */}
                    <div style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      marginBottom: 2, padding: "12px 0 0"
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                        background: "rgba(110,231,183,0.15)",
                        border: "1px solid rgba(110,231,183,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: "#6EE7B7", fontFamily: "monospace"
                      }}>C</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: "#6EE7B7", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>
                          BAKKAR · Turn {turn.turn}
                        </div>
                        <div style={{
                          background: "rgba(110,231,183,0.06)",
                          border: "1px solid rgba(110,231,183,0.12)",
                          borderRadius: "0 12px 12px 12px",
                          padding: "14px 18px",
                          fontSize: 15, lineHeight: 1.65, color: "#f0ece4"
                        }}>
                          {turn.consultant}
                        </div>
                      </div>
                    </div>

                    {/* Client bubble */}
                    <div style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      flexDirection: "row-reverse",
                      padding: "12px 0 16px"
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                        background: "rgba(147,197,253,0.15)",
                        border: "1px solid rgba(147,197,253,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: "#93C5FD", fontFamily: "monospace"
                      }}>{clientName[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: "#93C5FD", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6, textAlign: "right" }}>
                          {clientName.split(" ")[0].toUpperCase()}
                        </div>
                        <div style={{
                          background: "rgba(147,197,253,0.06)",
                          border: "1px solid rgba(147,197,253,0.12)",
                          borderRadius: "12px 0 12px 12px",
                          padding: "14px 18px",
                          fontSize: 15, lineHeight: 1.65, color: "#e8e4f0",
                          textAlign: "left"
                        }}>
                          {turn.client}
                        </div>
                      </div>
                    </div>

                    {/* Per-Turn Play Button */}
                    <div style={{ display: "flex", justifyContent: "center", paddingBottom: 10 }}>
                      {speaking === i ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={togglePause} style={{ padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontFamily: "monospace", fontSize: 11, border: "1px solid rgba(253,230,138,0.4)", background: "rgba(253,230,138,0.08)", color: "#FDE68A" }}>
                            {isPaused ? "▶ Resume" : "⏸ Pause"}
                          </button>
                          <button onClick={stopSpeech} style={{ padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontFamily: "monospace", fontSize: 11, border: "1px solid rgba(252,165,165,0.3)", background: "rgba(252,165,165,0.06)", color: "#FCA5A5" }}>
                            ⏹ Stop
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => playTurn(i)} disabled={speaking === "all"} style={{ padding: "5px 16px", borderRadius: 20, cursor: speaking === "all" ? "not-allowed" : "pointer", fontFamily: "monospace", fontSize: 11, letterSpacing: 1, border: "1px solid rgba(196,181,253,0.3)", background: "rgba(196,181,253,0.06)", color: speaking === "all" ? "rgba(196,181,253,0.3)" : "#C4B5FD", opacity: speaking === "all" ? 0.5 : 1 }}>
                          ▶ Play Turn {turn.turn}
                        </button>
                      )}
                    </div>

                    {/* Divider */}
                    {i < dialogue.length - 1 && (
                      <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "0 0 4px" }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer re-export */}
            <div style={{ display: "flex", gap: 10, marginTop: 32, justifyContent: "center" }}>
              {[["⬇ Download as TXT", downloadText], ["⬇ Download as JSON", downloadJSON]].map(([label, fn]) => (
                <button key={label} onClick={fn} style={{
                  padding: "12px 24px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "monospace", fontSize: 12, letterSpacing: 1,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.7)",
                }}>{label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
