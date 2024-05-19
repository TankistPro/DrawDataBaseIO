import EditorSide from "./components/EditorSide/EditorSide.tsx";
import EditorArea from "./components/EditorArea/EditorArea.tsx";

import { TableContextProvider } from "./context/TableContext.tsx";
import { RelationshipContextProvider } from "./context/RelationshipContext.tsx";
import {SideBarContextProvider} from "./context/SideBarContext.tsx";

function App() {
  return (
    <main className="bg-sky-50 h-full flex">
        <SideBarContextProvider>
            <TableContextProvider>
                <RelationshipContextProvider>
                    <EditorSide />
                    <EditorArea />
                </RelationshipContextProvider>
            </TableContextProvider>
        </SideBarContextProvider>
    </main>
  )
}

export default App
