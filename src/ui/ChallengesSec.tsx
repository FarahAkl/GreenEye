import Slider from "react-slick";
import useWindowSize from "../hooks/useWindowSize";
import { motion } from "framer-motion";

const ChallengesSec = () => {
  const { width } = useWindowSize();
  const settings = {
    dots: false,
    arrows: false,
    speed: 400,
    slidesToShow:
      width > 1024
        ? 7
        : width > 768
          ? 5
          : width > 650
            ? 4
            : width > 425
              ? 3
              : 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <section className="px-8 py-20 md:px-12 lg:px-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-dark text-4xl font-bold">Challenges</p>
        <p className="my-2 font-semibold text-gray-600">
          There are lots of factors, making agriculture harder everyday
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Slider {...settings} className="features-slider">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <img
              src={`/images/challenge${i}.avif`}
              alt="challenge"
              className="transition-all hover:translate-y-5"
              key={i}
            />
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default ChallengesSec;
