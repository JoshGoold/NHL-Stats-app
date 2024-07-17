import Level from "./components/Level"
import Team from "./components/Team"
import { BrowserRouter, Routes,Route } from "react-router-dom"
function App() {

  return (
    <>
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    <BrowserRouter>
    <Routes>
      <Route index element={<Level/>}/>
      <Route path="/team/:abbrev" element={<Team/>}/>
    </Routes>
    </BrowserRouter>
      </div>
    </>
  )
}

export default App
