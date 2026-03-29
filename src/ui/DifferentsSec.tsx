import Slider from "react-slick";
import useWindowSize from "../hooks/useWindowSize";
import Card from "./Card";

const DifferentsSec = () => {
  const { width } = useWindowSize();
  const content = [
    {
      icon: "/icons/hardware.svg",
      label: "Hardware-Free",
      describtion:
        "GreenEye delivers advanced insights without relying on costly on-field hardware.",
    },
    {
      icon: "/icons/proactive.svg",
      label: "Proactive",
      describtion:
        "GreenEye focuses on early prediction and risk reduction, not post-damage reporting.",
    },
    {
      icon: "/icons/landSpecific.svg",
      label: "Land-specific decisions",
      describtion:
        "Every recommendation is tailored to the exact land location and its environmental conditions.",
    },
    {
      icon: "/icons/allInOne.svg",
      label: "All-in-One Platform",
      describtion:
        "GreenEye brings analysis, prediction, decision support, and access to services into a single unified platform",
    },
    {
      icon: "/icons/region.svg",
      label: "Egypt & similar regions ",
      describtion:
        "GreenEye is built with arid and semi-arid regions in mind, where water scarcity and land degradation are real daily challenges.",
    },
    {
      icon: "/icons/realTime.svg",
      label: "Real Environmental Data",
      describtion: "Powered by satellite imagery and climate datasets.",
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="px-8 py-20 shadow-xl md:px-12 lg:px-24">
      <div className="flex flex-col gap-4">
        <p className="text-dark mb-4 text-center text-4xl">
          What Makes GreenEye Different
        </p>
        <div
          className={`grid grid-cols-2 gap-4 lg:grid-cols-3 ${width > 560 ? "grid" : "hidden"}`}
        >
          {content.map((cardContent) => (
            <Card
              label={cardContent.label}
              icon={cardContent.icon}
              describtion={cardContent.describtion}
              key={cardContent.label}
            />
          ))}
        </div>
        {width <= 560 && (
          <Slider {...settings} className="features-slider">
            {content.map((cardContent) => (
              <div className="px-5">
                <Card
                  label={cardContent.label}
                  icon={cardContent.icon}
                  describtion={cardContent.describtion}
                  key={cardContent.label}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default DifferentsSec;
