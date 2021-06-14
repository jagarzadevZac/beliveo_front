import { gql } from "@apollo/client";

export const ALL_PRODUCTS = gql `
    query{
        productos{
            id
            Nombre
            Url
            Precio
            Cantidad
            ImagenPrincipal
            ArrayImagenes
            IdVendedor
            UrlVendedor
            LogoVendedor
            Status
        }
    }  
`;

export const SEARCH_BY_ID_PRODUCT = gql `
    query($id:ID!){
        producto(id:$id){
            Nombre
            Url
            Precio
            Cantidad
            ImagenPrincipal
            ArrayImagenes
            IdVendedor
            UrlVendedor
            LogoVendedor
            rating
            PrecioOferta
            Descripcion
            store{
                id
                Nombre
                Logo
                Tel
            }
            categorias{
                id
                Nombre
            }
            rating
        }
    }
`;

export const TOP_RATED_PRODUCTS = gql `
    query($ratingMayor: Int,$ratingMenor: Int){
        graphqlfilterByRating(ratingMayor:$ratingMayor,ratingMenor:$ratingMenor){
            id
            Nombre
            Url
            Precio
            PrecioOferta
            Cantidad
            ImagenPrincipal
            ArrayImagenes
            IdVendedor
            LogoVendedor
            Status
            categorias{
                id
                Nombre
            }
            rating
            store{
                id
                Nombre
                Logo
                Tel
            }
        }
    }
`;


export const FILTER_PRODUCT = gql `
    query ($sort: String ,$limit: Int ,$start: Int ,$where: JSON){
        productosConnection(sort:$sort,limit:$limit,start:$start,where:$where){
            values{
                id
                Nombre
                Precio
                PrecioOferta
                Cantidad
                ImagenPrincipal
                ArrayImagenes
                IdVendedor
                Url
                Status
                categorias{
                    id
                    Nombre
                }
                rating
                store{
                    id
                    Nombre
                    Logo
                    Tel
                }
            }
        }
    }
`;

export const COUNT_PRODUCTS = gql`
    query ($sort: String ,$limit: Int ,$start: Int ,$where: JSON){
        productosConnection(sort:$sort,limit:$limit,start:$start,where:$where){
            values{
                id
            }
        }
    }
`;

export const OFFERS = gql `
    query($start:Int,$limit:Int){
        graphqlOffers(start:$start,limit:$limit){
            id
            Nombre
            Url 
            Precio
            Cantidad
            ImagenPrincipal
            ArrayImagenes
            IdVendedor
            UrlVendedor
            LogoVendedor
            Status
            rating
            PrecioOferta
            Descripcion
            store{
                id
                Nombre
                Logo
                Tel
            }
            categorias{
                id
                Nombre
            }
            rating
        }
    }
`;

export const COUNT_OFFERS = gql`
    query($evaluar:String){
        graphqlcountOffers(evaluar:$evaluar){
            id
        }
    }
`;