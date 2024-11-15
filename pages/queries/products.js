// product-management-frontend/queries/products.js
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query GetProducts {
        allProducts {
            id
            name
            price
            image
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $price: Float!, $image: Upload) {
        createProduct(name: $name, price: $price, image: $image) {
            product {
                id
                name
                price
                image
            }
        }
    }
`;
export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            success
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: ID!, $name: String, $price: Float, $image: String) {
        updateProduct(id: $id, name: $name, price: $price, image: $image) {
            product {
                id
                name
                price
                image
            }
        }
    }
`;