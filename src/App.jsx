import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"

import "./App.css"
import { PaymentPage } from "./pages/order/payment"
import { OrderStatusPage } from "./pages/order/status"

const routes = [
  {
    path: "/order/payment/:intentId",
    element: <PaymentPage />,
  },
  {
    path: "/order/status/:intentId",
    element: <OrderStatusPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
]

function App() {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  )
}

export default App
