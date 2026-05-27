import { useState, useEffect } from "react";

function App() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");

  const API = "https://daily-journal-api-zpnp.onrender.com";

  useEffect(() => {
    fetch(`${API}/api/entries/`)
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const handleSubmit = () => {
    if (!title || !content) return;
    fetch(`${API}/api/entries/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, mood }),
    })
      .then((res) => res.json())
      .then((newEntry) => {
        setEntries([newEntry, ...entries]);
        setTitle("");
        setContent("");
        setMood("happy");
      });
  };

  const moodEmoji = { happy: "😊", sad: "😢", productive: "💪" };
  const moodColor = { happy: "#fff9c4", sad: "#bbdefb", productive: "#c8e6c9" };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", fontFamily: "Segoe UI, Arial" }}>
      
      {/* Header */}
      <div style={{ background: "#4A90D9", padding: "20px", textAlign: "center", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "28px" }}> Daily Journal</h1>
        <p style={{ margin: "5px 0 0", opacity: 0.8 }}>Write your thoughts every day</p>
      </div>

      <div style={{ maxWidth: "650px", margin: "30px auto", padding: "0 20px" }}>

        {/* Form */}
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "25px" }}>
          <h2 style={{ margin: "0 0 15px", color: "#333" }}>✏️ New Entry</h2>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px", boxSizing: "border-box" }}
          />
          <textarea
            placeholder="How was your day?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px", height: "120px", boxSizing: "border-box", resize: "none" }}
          />
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px" }}
          >
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="productive">💪 Productive</option>
          </select>
          <button
            onClick={handleSubmit}
            style={{ width: "100%", background: "#4A90D9", color: "white", padding: "12px", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
          >
            Save Entry
          </button>
        </div>

        {/* Entries */}
        <h2 style={{ color: "#333" }}>📋 All Entries ({entries.length})</h2>
        {entries.length === 0 && <p style={{ color: "#999" }}>No entries yet. Write your first one!</p>}
        {entries.map((entry) => (
          <div key={entry.id} style={{ background: moodColor[entry.mood], padding: "18px", borderRadius: "12px", marginBottom: "12px", boxShadow: "0 1px 5px rgba(0,0,0,0.08)" }}>
            <h3 style={{ margin: "0 0 8px", color: "#333" }}>{moodEmoji[entry.mood]} {entry.title}</h3>
            <p style={{ margin: "0 0 10px", color: "#555" }}>{entry.content}</p>
            <small style={{ color: "#888" }}>{new Date(entry.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;