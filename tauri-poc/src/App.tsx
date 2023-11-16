import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  async function greet() {
    console.log("here")
    setGreetMsg( await invoke("greeter", { name }))
  }

  async function getPath(){
    setResponse(await invoke("get_user_dir"));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      <form
        className="row"
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..." />
        <button onClick={(e) => { 
          e.preventDefault();
          greet();
          getPath();
        }}>Greet</button>
      </form>

      <p>{greetMsg}</p>
      <p>{response}</p>

      <a href="/two">Two</a>
    </div>
  );
}

export default App;
