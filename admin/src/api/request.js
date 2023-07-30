import axios from "axios";
import { apiUrl } from "../utils/settings";

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const getAPiUrl =()=>{
  if(window.location.origin === 'http://localhost:3000' || window.location.origin ===  'http://localhost:3001') {
    return `${apiUrl}/user`;
  } else {
    return 'https://qavoucherify-backend.enetdefender.com';
  }
}

export default async function request(url, options) {
  const response = await axios({
    method: options.method,
    url: `${getAPiUrl() + url}`,
    data: options.data,
  })
    .then((res) =>  res.data)
    .catch((err) => {
      console.log('error', err);
    });

    console.warn("response ************", response)
  return response;
}
