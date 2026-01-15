import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalcPage from './components/CalcPage';
import HomePage from './components/HomePage';
import StatisticPage from './components/StatisticPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calc" element={<CalcPage />} />
          <Route path="/statistic" element={<StatisticPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
