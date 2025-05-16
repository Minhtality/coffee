export const PHOTO_QUERY = `
query{
    photos{
      data{
        attributes{
          title
          description
          slug
          image {
            data{
              attributes{
                width
                height
                    formats
              }
            }
          }
        }
      }
    }
  }
`;

export const PHOTO_QUERY_BY_CATEGORY = `
query{
    photos{
      data{
        attributes{
          title
          description
          slug
          image {
            data{
              attributes{
                width
                height
                    formats
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
query{
    products{
      data{
          attributes{
          title
          description
          price
          slug
          image {
            data{
              attributes{
                width
                height
                   formats
              }
            }
          }
        }
      }
    }
  }  
`;

export const GET_PRODUCT_QUERY = `
query getProduct($slug: String!){
    products(filters: {slug: {eq: $slug}}){
      data{
          attributes{
          title
          description
          price
          slug
          image {
            data{
              attributes{
                width
                height
                   formats
              }
            }
          }
        }
      }
    }
  }
`;
