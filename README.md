# coffee

Order coffee for your visit.

## Front-end

The front-end is built with [Next.js](https://nextjs.org/).

## Back-end

The backend is built with [Strapi](https://strapi.io/). for integrated content management.

## Image optimization

Images are optimized using [Cloudinary](https://cloudinary.com/). Cloudinary is a cloud-based image and video management service for websites and mobile apps, covering everything from image and video uploads, storage, manipulations, optimizations to delivery.

## Development

Currently, only the backend is available for development. The front-end is still in development.

To run the backend, run the following commands:

```bash
cd backend
yarn
yarn build
yarn develop
```

## Local graphQL endpoint

```bash
http://localhost:1331/graphql

// Sample query
query{
  products{
    data{
    	attributes{
        title
        description
        price
        image {
          data{
            attributes{
              width
              url
            }
          }
        }
      }
    }
  }
}

tip: hit ctrl + space to see the available fields
```
