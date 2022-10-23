import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Tasks } from '../pages/Tasks';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};
