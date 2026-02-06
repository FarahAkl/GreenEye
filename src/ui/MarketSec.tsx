import { useNavigate } from "react-router-dom";
import Button from "./Button";

const MarketSec = () => {
  const navigate = useNavigate();

  return (
    <section className="px-8 py-20 md:px-12 lg:px-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <div className="flex flex-col gap-6">
          <p className="text-dark text-4xl leading-tight font-bold">
            A Marketplace Built for Sustainable Farming
          </p>

          <p className="max-w-xl text-lg leading-8 text-gray-600">
            GreenEye connects farmers with trusted agricultural products and
            services in one web-based marketplace. From inputs to expertise,
            everything is curated to support sustainable and efficient farming
            decisions.
          </p>

          {/* Categories */}
          <div className="grid max-w-md grid-cols-3 gap-4">
            {[
              { icon: "/svg/fertilizer.svg", label: "Fertilizers" },
              { icon: "/svg/seeds.svg", label: "Seeds" },
              { icon: "/svg/tools.svg", label: "Tools" },
            ].map((item) => (
              <div
                key={item.label}
                className="hover:border-primary flex flex-col items-center gap-3 rounded-2xl border border-gray-300 p-5 transition hover:shadow-sm"
              >
                <img src={item.icon} alt={item.label} className="h-10 w-10" />
                <p className="text-dark text-sm font-semibold">{item.label}</p>
              </div>
            ))}
          </div>

          <Button
            btnLabel="View Marketplace"
            className="mt-4 w-full sm:w-1/2 lg:w-1/3"
            onClick={() => navigate("/marketplace")}
          />
        </div>

        {/* Right image */}
        <div className="hidden justify-end lg:flex">
          <img
            src="/images/marketSec.avif"
            alt="Marketplace preview"
            className="w-full max-w-lg rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MarketSec;
