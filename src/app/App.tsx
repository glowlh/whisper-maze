import { Route, BrowserRouter, Routes } from 'react-router';
import { MainPage } from '../pages';
import { _DebuggerPage } from '../pages/_debugger.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<MainPage />}/>
        <Route path="/debugger" element={<_DebuggerPage />}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
