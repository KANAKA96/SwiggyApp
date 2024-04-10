import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  let [userStatus, setStatus] = useState(null);
  useEffect(() => {
    window.addEventListener("online", () => {
      setStatus(true);
    });
    window.addEventListener("offline", () => {
      setStatus(false);
    });
  }, []);
  return userStatus;
};
export default useOnlineStatus;
