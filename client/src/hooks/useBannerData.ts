import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface BannerProps {
  id: string;
  description: string;
  url: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  timer: number;
}

export default function useBannerData() {
  const [bannerDataLoading, setLoading] = useState(true);
  const [banner, setBanner] = useState<BannerProps>();

  useEffect(() => {
    try {
      axios.get(`${BACKEND_URL}/api/v1/banner/get`).then((res) => {
        setBanner(res.data);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, []);

  return { bannerDataLoading, banner };
}
