import EditorSide from "./components/EditorSide/EditorSide.tsx";
import EditorArea from "./components/EditorArea/EditorArea.tsx";

import { TableContextProvider } from "./context/TableContext.tsx";
import { RelationshipContextProvider } from "./context/RelationshipContext.tsx";

function App() {
  return (
    <main className="bg-sky-50 h-full flex">
        <TableContextProvider>
            <RelationshipContextProvider>
                <EditorSide />
                <EditorArea />
            </RelationshipContextProvider>
        </TableContextProvider>
    </main>
  )
}

export default App
