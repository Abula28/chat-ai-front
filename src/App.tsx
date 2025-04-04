import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import MainComponent from "./components/main-component/MainComponent";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainComponent />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
