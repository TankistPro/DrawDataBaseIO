import EditorSide from "./components/EditorSide/EditorSide.tsx";
import EditorArea from "./components/EditorArea/EditorArea.tsx";

import { TableContextProvider } from "./context/TableContext.tsx";
import { SideBarContextProvider } from "./context/SideBarContext.tsx";
import { EditAreaContextProvider } from "./context/EditAreaContext.tsx";
import { RelationshipContextProvider } from "./context/RelationshipContext.tsx";

function App() {

  return (
    <main className="bg-sky-50 h-full flex">
        <SideBarContextProvider>
            <EditAreaContextProvider>
                <TableContextProvider>
                    <RelationshipContextProvider>
                        <EditorSide />
                        <EditorArea />
                    </RelationshipContextProvider>
                </TableContextProvider>
            </EditAreaContextProvider>
        </SideBarContextProvider>
    </main>
  )
}

export default App
