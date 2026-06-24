import "./App.css";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo, useState } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io"

export default function App() {

  const ydoc = useMemo(() => new Y.Doc , [])
  const yText = useMemo(() => ydoc.getText("monaco") , [ydoc])
  const editorRef = useRef(null);
  const [username, setUsername] = useState("")

  function handleMount(editor){
    editorRef.current = editor

    const provider = new SocketIOProvider("http://localhost:3000", "monaco",  ydoc, {
      autoConnect:true
    })
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    )
  }

  if(!username){
    return(
      <main className="h-screen w-full bg-gray-950 flex gap-4 p-4 items-center justify-center">
        <div className="flex flex-col gap-4">
          <input 
          type="text"
          placeholder="Enter your name"
          className="p-2 rounded-lg bg-gyay-900 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
          <button
          className="p-2 rounded-lg bg-amver-50 text-gray-600 font-bold"
          onClick={()=>{
            if(username.trim()){
              setUsername(username.trim())
            }
          }}></button>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4">
      <aside className="h-full w-1/5 bg-amber-50 rounded-b-lg"></aside>
      <section className="h-full w-4/5 bg-neutral-800 rounded-b-lg overflow-hidden">
        <Editor 
          height="100%"
          defaultLanguage="javascript"
          defaultValue="//some comment" 
          theme="vs-darke"
          onMount={handleMount}>

        </Editor>
      </section>
    </main>
  );
}
