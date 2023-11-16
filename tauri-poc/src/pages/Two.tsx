import { invoke } from "@tauri-apps/api";

export default function Two() {

    async function shutdown(){
      await invoke("machine_shutdown");
    }

    return (
      <div className="container">
        <h1>Welcome to Two!</h1>
        <button type="submit" onClick={()=> shutdown()}>Shutdown</button>
      </div>
    );
  }