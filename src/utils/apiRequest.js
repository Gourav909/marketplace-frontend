import axios from "axios";

const url = "https://430b-2401-4900-1c19-4611-a75a-e6bd-a330-2286.ngrok-free.app/";
console.log(url)

export const makeApiOptions = (methodType, data) => {
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let options = {};
  if (currentUser) {
    if (data) {
      const formData = new FormData();

      formData.append(
        "address_attributes[city_id]",
        data.address_attributes.city_id
      );
      formData.append(
        "address_attributes[district_id]",
        data.address_attributes.district_id
      );
      formData.append("description", data.description);
      formData.append("image", null);
      formData.append("net_size", data.net_size);
      formData.append("no_of_rooms", data.no_of_rooms);
      formData.append("price_per_month", data.price_per_month);
      formData.append("property_type", data.property_type);
      formData.append("title", data.title);
      options = {
        method: methodType,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "access-token": currentUser.accessToken,
          client: currentUser.clientId,
          uid: currentUser.uid,
        },
      };

      return options;
    }

    options = {
      method: methodType,
      headers: {
        "access-token": currentUser.accessToken,
        client: currentUser.clientId,
        uid: currentUser.uid,
        "Content-Type": "application/json",
      },
    };

    return options;
  }
  if (!currentUser && data) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    options = {
      method: methodType,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    };
    return options;
  }
  return options;
};

export const makeApiRequest = ({
  url,
  options,
  requestAction,
  successAction,
  errorAction,
}) => {
  return (dispatch) => {
    dispatch({ type: requestAction });

    axios
      .request({
        url,
        ...options,
      })
      .then((response) => {
        dispatch({
          type: successAction,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({ type: errorAction, error: error?.response?.data });
      });
  };
};

///Property edit
export const fetchPropertyById = async (id) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "access-token": currentUser.accessToken,
      client: currentUser.clientId,
      uid: currentUser.uid,
    },
  };

  try {
    const response = await axios.get(url + `/properties/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching property: ", error);
    throw error;
  }
};

export const updatePropertyById = async (id, values) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "access-token": currentUser.accessToken,
      client: currentUser.clientId,
      uid: currentUser.uid,
    },
  };

  try {
    await axios.put(url + `/properties/${id}`, values, config);
  } catch (error) {
    console.error("Error fetching property: ", error);
    throw error;
  }
};

export const fetchCityAndDistrict = async () => {
  try {
    const response = await axios.get(url + `/cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities: ", error);
    throw error;
  }
};
