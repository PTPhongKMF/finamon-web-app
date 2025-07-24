import { Link } from "react-router-dom";
import { m } from "../i18n/paraglide/messages";
import { Check, MoreHorizontal } from "lucide-react";

function Pricing() {
  const renderFeatureItem = (text) => (
    <li className="flex items-center gap-2">
      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-gray-600">{text}</span>
    </li>
  );

  const renderMoreFeatures = (text) => (
    <div className="mt-8 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <MoreHorizontal className="w-5 h-5 text-blue-500 flex-shrink-0" />
        <span className="text-gray-500 italic">{text}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {m["pricing.hero.title"]()}
          </h1>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            {m["pricing.hero.subtitle"]()}
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-24 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2 text-green-700">
                  {m["pricing.plans.free.title"]()}
                </h2>
                <p className="text-gray-600 mb-4">
                  {m["pricing.plans.free.subtitle"]()}
                </p>
                <div className="text-4xl font-bold text-gray-900">
                  {m["pricing.plans.free.price"]()}
                </div>
              </div>
              
              {/* Add a spacer div to match Pro card's price section height */}
              <div className="h-[28px]" /> {/* This matches the height of Pro's monthly price */}

              <div className="flex-1 flex flex-col">
                <ul className="space-y-4 flex-1">
                  {renderFeatureItem(m["pricing.plans.free.features.profile"]())}
                  {renderFeatureItem(m["pricing.plans.free.features.aiChat"]())}
                  {renderFeatureItem(m["pricing.plans.free.features.expenses"]())}
                </ul>
                {renderMoreFeatures(m["pricing.plans.free.features.more"]())}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 relative hover:shadow-xl transition-shadow duration-300 flex flex-col">
              {/* Best Value Badge */}
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                {m["pricing.plans.pro.price.yearlyBadge"]()}
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2 text-green-700">
                  {m["pricing.plans.pro.title"]()}
                </h2>
                <p className="text-gray-600 mb-4">
                  {m["pricing.plans.pro.subtitle"]()}
                </p>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-gray-900">
                    {m["pricing.plans.pro.price.yearly"]()}
                  </div>
                  <div className="text-lg text-gray-600">
                    {m["pricing.plans.pro.price.monthly"]()}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <ul className="space-y-4 flex-1">
                  {renderFeatureItem(m["pricing.plans.pro.features.allFree"]())}
                  {renderFeatureItem(m["pricing.plans.pro.features.storage"]())}
                  {renderFeatureItem(m["pricing.plans.pro.features.aiChat"]())}
                  {renderFeatureItem(m["pricing.plans.pro.features.budget"]())}
                </ul>
                {renderMoreFeatures(m["pricing.plans.pro.features.more"]())}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link
              to="/profile/subscription"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200"
            >
              {m["pricing.cta"]()}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;