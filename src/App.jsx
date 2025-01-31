import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import CountdownTimer from "./CountdownTimer";
import ProductCatalog from "./ProductCatalog";
import ProductDetails from "./ProductDetails";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <CountdownTimer />
            <ProductCatalog />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

// ✅ Ensure this is at the very bottom!
export default App;
