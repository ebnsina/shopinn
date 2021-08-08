import axios from "axios";

export async function createProduct(product, authtoken) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
    headers: {
      authtoken,
    },
  });
}

export async function getProductsByCount(count) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`);
}

export async function removeProduct(slug, authtoken) {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getProduct(slug) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);
}

export async function updateProduct(slug, product, authtoken) {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getProducts(sort, order, page) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
    sort,
    order,
    page,
  });
}

export async function getProductsCount() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products/total`);
}

export async function productStar(productId, star, authtoken) {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/products/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getRelated(productId) {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/products/related/${productId}`
  );
}

export async function fetchProductsByFilter(args) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/search/filters`,
    args
  );
}
