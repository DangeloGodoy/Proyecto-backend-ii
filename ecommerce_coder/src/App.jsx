import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Login from "./components/Login";

function App() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const url = "http://localhost:8080/api/products";
    const response = await axios.get(url);
    setProducts(response.data.response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-pink-200">
        <h1 className="text-red-600 text-4xl font-bold py-4">Ecomerce</h1>
      </div>
      <section className="flex flex-wrap justify-center items-center">
        {products.map((each) => (
          <Card key={each.id} each={each} />
        ))}
      </section>
      <section className="flex flex-col items-center justify-center bg-pink-200">
        <Login />
      </section>
    </>
  );
}

export default App;
