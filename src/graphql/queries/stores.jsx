import { gql } from "@apollo/client";

export const ALL_STORES = gql `
    query{
        stores{
            id
            Nombre
            Logo
            Tel
            Mail
        }
    }
`;

export const SEARCH_STORES = gql `
    query ($sort: String, $limit: Int, $start: Int, $where: JSON){
        stores(sort: $sort, limit: $limit, start: $start, where: $where){
            id
            Nombre
            Logo
            Tel
            Mail
        }
    }
`;

export const SINGLE_STORE = gql `
    query ($id: ID!){
        store(id: $id){
            id
            Nombre
            Logo
            Tel
            Mail
            Address
            Rate
        }
    }
`;

