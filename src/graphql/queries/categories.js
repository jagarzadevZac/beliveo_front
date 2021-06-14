import { gql } from '@apollo/client';

export  const  All_CATEGORIES = gql `

query{
    categorias{
        id
        Nombre
        Status
        image
    }
}
  
`;

export  const SEARCH_CATEGORY = gql `

query($sort: String ,$limit: Int ,$start: Int,$where: JSON){
    categoriasConnection(sort:$sort,limit:$limit,start:$start ,where:$where){
        values{
            id
            Nombre
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
                PrecioOferta
                rating
                Status
            }
        }
    }
}

`;


export const FILTER_BY_STATUS = gql `

query($sort: String ,$limit: Int ,$start: Int,$where: JSON){
    categoriasConnection(sort:$sort,limit:$limit,start:$start ,where:$where){
        values{
            id
            Nombre
        }
    }
}

`;