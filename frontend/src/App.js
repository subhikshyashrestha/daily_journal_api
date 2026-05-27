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

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>📔 Daily Journal</h1>

      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>New Entry</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Write your journal..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", height: "100px" }}
        />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="productive">💪 Productive</option>
        </select>
        <button
          onClick={handleSubmit}
          style={{ background: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Save Entry
        </button>
      </div>

      <h2>All Entries</h2>
      {entries.map((entry) => (
        <div key={entry.id} style={{ background: "#fff", border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
          <p>Mood: {entry.mood} | {new Date(entry.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;