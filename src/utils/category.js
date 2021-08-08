import axios from "axios";

export async function getCategories() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/category`);
}

export async function getCategory(slug) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);
}

export async function createCategories(category, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/category`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function updateCategory(slug, category, authtoken) {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function removeCategory(slug, authtoken) {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getSubcategories(_id) {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/category/subcategory/${_id}`
  );
}
