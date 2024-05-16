import EditorSide from "./components/EditorSide/EditorSide.tsx";
import EditorArea from "./components/EditorArea/EditorArea.tsx";
import {EditorContextProvider} from "./context/useEditorContext.tsx";

function App() {
  return (
    <main className="bg-sky-50 h-full flex">
        <EditorContextProvider>
            <EditorSide />
            <EditorArea />
        </EditorContextProvider>
    </main>
  )
}

export default App
