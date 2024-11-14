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
    mutation CreateProduct($name: String!, $price: Float!, $image: String) {
        createProduct(name: $name, price: $price, image: $image) {
            product {
                id
                name
                price
            }
        }
    }
`;
