import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import { Layout } from 'components/ui';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
