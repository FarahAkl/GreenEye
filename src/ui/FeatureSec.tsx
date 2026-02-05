import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider, { type CustomArrowProps } from "react-slick";
import useWindowSize from "../hooks/useWindowSize";
import FeatureCard from "./FeatureCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }: CustomArrowProps) => (
  <button
    onClick={onClick}
    className="border-primary text-primary absolute right-10 -bottom-16 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }: CustomArrowProps) => (
  <button
    onClick={onClick}
    className="text-primary border-primary absolute -bottom-16 left-10 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2"
  >
    <FaArrowLeft />
  </button>
);

const FeatureSec = () => {
  const { width } = useWindowSize();
  const cardsContent = [
    {
      title: "Plant Disease Detection",
      description:
        "Upload a photo and let AI identify plant diseases and suggest treatments",
      image: "/images/feat-disease.avif",
    },
    {
      title: "Land & Climate Monitoring",
      description:
        "Real time tracking of plant health and weather changes using real satellite and climate data.",
      image: "/images/feat-monitor.avif",
    },
    {
      title: "Community & Marketplace",
      description:
        "Connect with experts, share knowledge, and access agricultural products in one place",
      image: "/images/feat-market.avif",
    },
    {
      title: "Smart Crop Recommendations",
      description:
        "Get crop suggestions based on land suitability, climate, and planting season.",
      image: "/images/feat-recommend.avif",
    },
    {
      title: "Desertification Risk Prediction & Classification",
      description: "Know the severity and future risk of your land",
      image: "/images/feat-desert.avif",
    },
  ];

  const slidesToShow = width >= 1024 ? 3 : width >= 768 ? 2 : 1;

  const settings = {
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="px-8 pt-24 pb-12 md:px-12 lg:px-20 lg:pt-24">
      <div className="text-center">
        <p className="text-dark text-4xl font-bold">Core Capabilities</p>
        <p className="my-2 font-semibold text-gray-600">What GreenEye Offers</p>
      </div>
      <div className="relative my-10">
        <Slider {...settings} className="features-slider">
          {cardsContent.map((card) => (
            <div className="px-4">
              <FeatureCard
                title={card.title}
                image={card.image}
                description={card.description}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeatureSec;
