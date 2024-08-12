import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import moment from "moment";

interface Banner {
  id: string;
  description: string;
  url: string;
  visible: boolean;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  timer: string;
}

export default function useBannerData() {
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<Banner>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/banner/get`)
      .then((res) => {
        setBanner(res.data);
        setLoading(false);
      });
  }, []);

  return { loading, banner };
}
