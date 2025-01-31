import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactButton from "./ContactButton"; 

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null); // Track which product is expanded

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleDescription = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id); // Toggle between show/hide
  };

  return (
    <div className="container">
      <div className="countdown-space"></div> {/* Added space below countdown */}

      {products.map((product) => (
        <div key={product.id} className="product-view">
          <div className="gallery-container">
            {/* Thumbnails on the left */}
            <div className="thumbnail-column">
              {[1, 2, 3].map((index) => (
                <img
                  key={index}
                  src={`/shoes/${product.id}/${index}.png`} // Load from /public/shoes/{id}/{index}.png
                  alt={`${product.name} ${index}`}
                  className="thumbnail"
                  onClick={(e) => {
                    document.getElementById(`main-img-${product.id}`).src = e.target.src;
                  }}
                />
              ))}
            </div>

            {/* Main Image - Defaults to 1.png */}
            <div className="main-image">
              <img
                id={`main-img-${product.id}`}
                src={`/shoes/${product.id}/1.png`}
                alt={product.name}
                className="large-img"
              />
            </div>
          </div>

          {/* Product Details */}
          <h3
            className="toggle-title"
            onClick={() => toggleDescription(product.id)} // Toggle description on click
            style={{ cursor: "pointer" }}
          >
            {product.name}
          </h3>

          <p
            onClick={() => toggleDescription(product.id)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            {product.price}
          </p>

          {expandedProduct === product.id && (
            <p 
              className="description" 
              onClick={() => toggleDescription(product.id)} // Click description to collapse
              style={{ 
                marginTop: "10px", 
                marginBottom: "15px", 
                cursor: "pointer",
                background: "#f8f8f8", 
                padding: "10px", 
                borderRadius: "5px"
              }}
            >
              {product.description}
            </p>
          )}
          <ContactButton />  
          {/* <button className="btn">Order Now</button> */}
        </div>
      ))}
    </div>
  );
}

export default ProductCatalog;
