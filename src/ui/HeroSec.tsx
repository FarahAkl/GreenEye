import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import Button from "./Button";

const HeroSec = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="relative grid min-h-[80vh] grid-cols-1 bg-[linear-gradient(to_right,#002F20,#009566)] md:grid-cols-2">
      {/* Text Content */}
      <div className="z-10 flex flex-col items-center gap-3 px-8 pt-24 pb-20 md:items-start md:px-12 md:pb-32 lg:px-20 lg:pt-34">
        <h1 className="text-center text-6xl/22 font-bold text-white uppercase md:text-start">
          higher yields lower lost
        </h1>

        <p className="text-center text-lg/8 text-white md:text-start">
          An AI-powered agriculture platform that helps farmers make smarter
          decisions before damage happens.
        </p>

        {!isAuthenticated && (
          <Button
            btnLabel="Join Us"
            onClick={() => navigate("/login")}
            className="my-3 w-1/2 border border-white px-5 text-lg shadow-sm"
          />
        )}
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src="/images/plantHologrampng.png"
          alt="Plant Hologram"
          className="inset-0 h-full w-full object-cover md:absolute"
        />
      </div>
    </section>
  );
};

export default HeroSec;
