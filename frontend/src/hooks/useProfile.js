import { useState } from "preact/hooks";
import { getUserData } from "../services/data.js";

export const useProfile = () => {
  const [response, setResponse] = useState(false);

  const refreshResponse = () => {
    getUserData().then((r) => setResponse(r));
  };

  /*useEffect(refreshResponse, [])*/

  /*useEffect(() => {
    if (!user) return
  },[user])*/

  return {
    response,
    refreshResponse,
  };
};
