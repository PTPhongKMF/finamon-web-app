import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NotFound() {
const { t } = useTranslation("404");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {t("404message")}
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {t("goback")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;