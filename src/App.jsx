import Level from "./components/Level"
import Team from "./components/Team"
import { BrowserRouter, Routes,Route } from "react-router-dom"
function App() {

  return (
    <>
   
    <BrowserRouter>
    <Routes>
      <Route index element={<Level/>}/>
      <Route path="/team/:abbrev" element={<Team/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
