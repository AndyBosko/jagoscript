import { useState, useEffect } from "react";

export default function App() {
  const [idea, setIdea] = useState("");
  const [script, setScript] = useState("");
  const [dark, setDark] = useState(false);
  const [negativeHook, setNegativeHook] = useState(false);

  useEffect(() => {
    document.body.style.background = dark ? "#0f172a" : "#ffffff";
    document.body.style.color = dark ? "#e5e7eb" : "#0f172a";
  }, [dark]);

  function generateScript() {
    if (!idea.trim()) {
      alert("Masukkan ide dulu");
      return;
    }

    let hook = negativeHook
      ? "Most people get this wrong, and here’s why…"
      : "You won’t believe this true story…";

    const result = `
${hook}

${idea}

This story really happened.
    `.trim();

    setScript(result);
  }

  function exportText(type) {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "pdf" ? "script.pdf" : "script.doc";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
      <h1>JagoScript.ai</h1>
      <p>Bikin skrip konten cepat & natural</p>

      <textarea
        placeholder="Tulis ide konten kamu di sini..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{ width: "100%", height: 120 }}
      />

      <div style={{ margin: "12px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={negativeHook}
            onChange={() => setNegativeHook(!negativeHook)}
          />{" "}
          Negative Hook
        </label>
      </div>

      <button onClick={generateScript}>Generate Script</button>

      <button
        onClick={() => setDark(!dark)}
        style={{ marginLeft: 8 }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {script && (
        <>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
            {script}
          </pre>

          <button onClick={() => exportText("pdf")}>Export PDF</button>
          <button onClick={() => exportText("doc")} style={{ marginLeft: 8 }}>
            Export Word
          </button>
        </>
      )}
    </div>
  );
}
