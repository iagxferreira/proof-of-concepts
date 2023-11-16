import { invoke } from "@tauri-apps/api";
import { useNavigate } from 'react-router-dom'
export default function Two() {
    const navigate = useNavigate();

    async function shutdown(){
      await invoke("machine_shutdown");
    }

    return (
      <div className="container">
        <h1>Welcome to Two!</h1>
        <button onClick={() => navigate('/')}>go back</button>
        <button type="submit" onClick={()=> shutdown()}>Shutdown</button>
      </div>
    );
  }