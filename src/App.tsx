import { Button } from "./components/common/button/Button";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<p>hello</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
