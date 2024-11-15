// product-management-frontend/pages/index.js
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, DELETE_PRODUCT } from "../pages/queries/products";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Handle delete functionality
    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct({ variables: { id } });
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            <Link href="/add-product">Add New Product</Link>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {data.allProducts.map((product) => (
                    <li key={product.id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px" }}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        {product.image ? (
                            <img
                                src={`http://localhost:8000/media/${product.image}`}
                                alt={product.name}
                                style={{ width: "150px", height: "auto" }}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <Link href={`/update-product?id=${product.id}`}>
                            <button style={{ marginRight: "10px" }}>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(product.id)} style={{ color: "red" }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
