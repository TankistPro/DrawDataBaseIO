import EditorSide from "./components/EditorSide/EditorSide.tsx";
import EditorArea from "./components/EditorArea/EditorArea.tsx";

import {EditorContextProvider} from "./context/useEditorContext.tsx";
import { TableContextProvider } from "./context/TableContext.tsx";

function App() {
  return (
    <main className="bg-sky-50 h-full flex">
        <EditorContextProvider>
            <TableContextProvider>
                <EditorSide />
                <EditorArea />
            </TableContextProvider>
        </EditorContextProvider>
    </main>
  )
}

export default App
