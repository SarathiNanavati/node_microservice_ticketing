import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, successCallback, errorCallback }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (successCallback) {
        successCallback(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className='alert alert-danger'>
          <h4>Oops..</h4>
          <ul className='my-0'>
            {err.response.data.errors.map((err, errIndex) => {
              return <li key={errIndex}>{err.message}</li>;
            })}
          </ul>
        </div>
      );

      if (errorCallback) {
        errorCallback(response.data);
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
