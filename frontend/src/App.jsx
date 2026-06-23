import "./App.css";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRef, useMemo } from "react";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io"

export default function App() {

  const ydoc = useMemo(() => new Y.Doc , [])
  const yText = useMemo(() => ydoc.getText("monaco") , [ydoc])
  const editorRef = useRef(null);

  function handleMount(editor){
    editorRef.current = editor

    const provider = new SocketIOProvider("http://localhost:3000", "monaco",  ydoc)
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getMode(),
      new Set([editorRef.current]),
      provider.awareness
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
          theme="vs-darke">

        </Editor>
      </section>
    </main>
  );
}
