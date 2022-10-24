import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Tasks } from '../pages/Tasks';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/task" element={<Tasks />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
