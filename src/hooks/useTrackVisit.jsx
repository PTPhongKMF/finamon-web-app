import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { kyAspDotnet } from "../api/ky";

const useTrackVisit = () => {
  const incrementVisit = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.post("api/siteanalytic/5/increment").json();
    }
  })

  useEffect(() => {
    incrementVisit.mutate();
  }, []);
};

export default useTrackVisit;
