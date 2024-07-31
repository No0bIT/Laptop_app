import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const ProductDetail = () => {
    const { id } = useParams();
    const [laptop, setLaptop] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/laptop/${id}`);
            setLaptop(response.data);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
      }, [id]);

    return (
        <div>
            details
        </div>
      );
};

export default ProductDetail;