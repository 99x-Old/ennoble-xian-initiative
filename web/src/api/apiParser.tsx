// interface
export interface ErrorMessage {
  status?: number;
  message: string;
}

const parseErrorResponse = async (error) => {
  let errorMessage = {} as ErrorMessage;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    errorMessage.status = error.response.status;
    errorMessage.message = error.response.data?.message;
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log("Error", error.message);
    errorMessage.message = "Oops! Something went wrong!";
  }
  return errorMessage;
};

const isErrorMessage = (object: any): object is ErrorMessage => {
  return "message" in object;
};

export { parseErrorResponse, isErrorMessage };
