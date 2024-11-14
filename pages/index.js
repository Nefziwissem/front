// product-management-frontend/pages/index.js
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../pages/queries/products";
import Link from "next/link";

export default function Home() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Product List</h1>
            <Link href="/add-product">Add New Product</Link>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {data.allProducts.map((product) => (
                    <li key={product.id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px" }}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}
