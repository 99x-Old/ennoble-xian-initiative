import API from "./axiosInstance";
import { FETCHTYPE } from "../constants/apiConstants";

export interface FetchProps {
  type: string;
  url: string;
  data?: any;
}

const fetch = async (fetchProps: FetchProps) => {
  let response;
  try {
    switch (fetchProps.type) {
      case FETCHTYPE.GET:
        response = await API.get(fetchProps.url, fetchProps?.data);
        break;
      case FETCHTYPE.POST:
        response = await API.post(fetchProps.url, fetchProps.data);
        break;
    }
  } catch (error) {
    response = error;
  }
  return response;
};

export { fetch };
