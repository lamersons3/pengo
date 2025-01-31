import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showDescription, setShowDescription] = useState(false); // Track click state

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setProductInfo(data);
        setSelectedImage(data.image);
        setGallery(data.gallery);
      })
      .catch(err => console.error("Error fetching product details:", err));
  }, [id]);

  if (!productInfo) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <h2 
        className="toggle-title" 
        onClick={() => setShowDescription(!showDescription)} // Toggle visibility
        style={{ cursor: "pointer" }} // Make it clickable
      >
        {productInfo.name}
      </h2>
      <p 
        onClick={() => setShowDescription(!showDescription)} // Also toggle on price click
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        {productInfo.price}
      </p>

      {showDescription && (
        <p className="description">{productInfo.description}</p>
      )}

      <div className="product-display">
        {/* Left Thumbnails */}
        <div className="gallery">
          {gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${productInfo.name} - ${index + 1}`}
              className="thumb"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="main-image-container">
          <img src={selectedImage} alt={productInfo.name} className="main-img" />
        </div>
      </div>

      <button className="btn">Make Reservation</button>
    </div>
  );
}

export default ProductDetails;
