import React,{Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div>loading</div>}>
    <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
