// product-management-frontend/pages/add-product.js
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, GET_PRODUCTS } from "../pages/queries/products";
import { useRouter } from "next/router";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [createProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],  // Refresh product list after adding
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProduct({ variables: { name, price: parseFloat(price), image } });
        router.push("/");
    };

    return (
        <div>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit}>
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
                    <label>Image:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
