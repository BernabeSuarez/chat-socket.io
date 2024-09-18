import io from "socket.io-client";
import { useState, useEffect } from "react";
import { Input } from "./components/ui/input";
import { Button } from "@/components/ui/button";
import ChatCard from "./components/Card/Card";

const socket = io("http://localhost:3000");
function App() {
  const [message, setMessage] = useState("");
  const user = socket.id || "Anonymous";
  const [isConnected, setIsConected] = useState(false);
  const [sendMsgs, setSendMsgs] = useState<string[]>([]);
  const [newMsg, setNewMsg] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendMsgs([...sendMsgs, message]);
    socket.emit("message", message);
    setMessage("");
  };
  useEffect(() => {
    socket.on("connect", () => setIsConected(true));
    socket.on("message", (msg) => setNewMsg([...newMsg, msg]));
  }, [newMsg]);
  return (
    <div className="bg-zinc-950 text-slate-50 h-screen w-screen flex flex-col justify-center p-10">
      {isConnected ? (
        <div className="flex gap-2 flex-row items-center">
          <div className="bg-green-500 rounded-full w-4 h-4"></div>
          <p>Online</p>
        </div>
      ) : (
        <div className="flex gap-2 flex-row items-center">
          <div className="bg-red-500 rounded-full w-4 h-4"></div>
          <p>Outline</p>
        </div>
      )}
      <h1 className="text-3xl ">Chat Socket.io</h1>
      <div className="w-1/2 m-auto self-end gap-5  flex flex-col">
        {sendMsgs.map((msg, index) => (
          <div className="self-start">
            <ChatCard message={msg} key={index} user={user} />
          </div>
        ))}
        {newMsg.map((msg, index) => (
          <div className="self-end">
            <ChatCard message={msg} key={index} user={user} />
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-rox p-6 gap-3 w-1/2 m-auto items-center"
      >
        <Input
          className="w-1/2 rounded  bg-zinc-800"
          placeholder="Escribe un mensaje..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant="outline" className="w-1/4 self-end rounded">
          Enviar
        </Button>
      </form>

      <div className="w-1/2 m-auto self-start gap-5 flex flex-col"></div>
    </div>
  );
}

export default App;
