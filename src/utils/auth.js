import axios from "axios";

export async function createOrUpdateUser(authToken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
}

export async function currentUser(authToken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
}

export async function currentAdmin(authToken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/current-admin`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
}
