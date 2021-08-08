import axios from "axios";

export async function getSubcategories() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/subcategory`);
}

export async function getSubcategory(slug) {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`
  );
}

export async function createSubcategories(subcategory, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/subcategory`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function updateSubcategory(slug, subcategory, authtoken) {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function removeSubcategory(slug, authtoken) {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
}
