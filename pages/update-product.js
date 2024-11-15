// product-management-frontend/pages/update-product.js
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, UPDATE_PRODUCT } from "../pages/queries/products";
import { useState, useEffect } from "react";

export default function UpdateProduct() {
    const router = useRouter();
    const { id } = router.query; // Get product ID from URL query

    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],
    });

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (data && id) {
            const product = data.allProducts.find((p) => p.id === id);
            if (product) {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image || "");
            }
        }
    }, [data, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProduct({
            variables: {
                id,
                name,
                price: parseFloat(price),
                image,
            },
        });
        router.push("/");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit" style={{ marginTop: "10px" }}>Update Product</button>
                <button
                    type="button"
                    onClick={() => router.push("/")}
                    style={{ marginLeft: "10px", color: "red" }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
