import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface User {
  name: string;
  email: string;
  id: string;
}

export default function useUserData() {
  const [userDataLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/user/details`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, []);

  return { userDataLoading, user };
}
