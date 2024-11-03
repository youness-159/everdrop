import { createContext, useEffect, useState } from "react";
import { isEmptyObject } from "../utils/helpers.js";
import { getMyInfo } from "../services/userAPI.js";

export const UserContext = createContext({});

function UserContextAPI({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isEmptyObject(user) && localStorage.getItem("token"))
      (async () => {
        const myInfo = await getMyInfo();
        setUser(myInfo);
      })();
  }, [user]);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextAPI;
