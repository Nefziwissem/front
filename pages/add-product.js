import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, GET_PRODUCTS } from "../pages/queries/products";
import { useRouter } from "next/router";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null); // Stocke le fichier sélectionné
    const [createProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }], // Met à jour la liste des produits
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct({
                variables: {
                    name,
                    price: parseFloat(price),
                    image, // Fichier capturé
                },
            });
            router.push("/"); // Redirige vers la page principale
        } catch (error) {
            console.error("Error creating product:", error);
        }
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
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} // Capture le fichier sélectionné
                        required
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
