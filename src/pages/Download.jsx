import { useNavigate } from "react-router-dom";
import AnimatedNumberCounter from "../components/AnimatedNumberCounter";
import { m } from "../i18n/paraglide/messages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { kyAspDotnet } from "../api/ky";
import { Globe, Download as DownloadIcon } from "lucide-react";
import IosLogo from "../assets/apple_logo.svg?react";
import AndroidLogo from "../assets/android_logo.svg?react";

export default function Download() {
  const navigate = useNavigate();

  const downloadCount = useQuery({
    queryKey: ["downloadCount"],
    queryFn: async () => {
      return await kyAspDotnet.get("api/siteanalytic/4").json()
    }
  });

  const accountCount = useQuery({
    queryKey: ["accountCount"],
    queryFn: async () => {
      const count = await kyAspDotnet.get("api/user/total-active").json();
      return {count};
    }
  });

  const visitCount = useQuery({
    queryKey: ["visitCount"],
    queryFn: async () => {
      return await kyAspDotnet.get("api/siteanalytic/5").json();
    }
  });

  const incrementDownload = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.post("api/siteanalytic/4/increment").json();
    }
  })

  const handleWebDownload = () => {
    navigate("/app");
  };

  function handleAndroidDownload() {
    incrementDownload.mutate();
  }

  const renderStatCounter = (query, label) => {
    if (query.isSuccess) {
      console.log(query.data)

      return (
        <AnimatedNumberCounter
          count={query.data.count}
          countName={label}
        />
      );
    }
    return (
      <div>
        <div className="text-3xl font-bold text-gray-800">
          0
          <span className="ml-2 text-lg font-medium text-gray-600">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {m["common.topnavbar.download"]()}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {m["download.subtitle"]()}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center bg-amber-100/40">
          <div className="py-4">
            {renderStatCounter(downloadCount, m["download.stats.downloads"]())}
          </div>
          <div className="py-4">
            {renderStatCounter(accountCount, m["download.stats.accountsCreated"]())}
          </div>
          <div className="py-4">
            {renderStatCounter(visitCount, m["download.stats.siteVisits"]())}
          </div>
        </div>

        {/* Download Icon */}
        <div className="flex justify-center mb-8">
          <DownloadIcon className="w-16 h-16 text-green-600" />
        </div>

        {/* Download Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Web Version */}
          <button
            onClick={handleWebDownload}
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex flex-col items-center gap-3">
              <Globe className="w-12 h-12" />
              <span className="text-lg font-bold">{m["download.platforms.web.title"]()}</span>
              <span className="text-sm">{m["download.platforms.web.subtitle"]()}</span>
            </div>
          </button>

          {/* iOS Version - Disabled */}
          <button
            disabled
            className="bg-gray-400 cursor-not-allowed p-6 rounded-xl shadow-lg"
          >
            <div className="flex flex-col items-center gap-3">
              <IosLogo className="w-12 h-12" />
              <span className="text-lg font-bold">{m["download.platforms.ios.title"]()}</span>
              <span className="text-sm">{m["download.platforms.ios.subtitle"]()}</span>
            </div>
          </button>

          {/* Android Version */}
          <a
            href="https://drive.google.com/uc?export=download&id=1chBEjJvICUSa_J4j6SLIvO9yXlcaHulg"
            download="finamon.apk"
            onClick={handleAndroidDownload}
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 no-underline"
          >
            <div className="flex flex-col items-center gap-3">
              <AndroidLogo className="w-12 h-12" />
              <span className="text-lg font-bold">{m["download.platforms.android.title"]()}</span>
              <span className="text-sm">{m["download.platforms.android.subtitle"]()}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
