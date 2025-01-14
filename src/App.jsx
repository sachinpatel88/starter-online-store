import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"

import "./App.css"

const routes = [
  {
    path: "/",
    element: <Home />,
  },
]

function App() {
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route path={path} element={element} key={index} />
      ))}
    </Routes>
  )
}

export default App
