import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";

interface ITourCardProps {
  image: string;
  title: string;
  description: string | null;
}

const FeatureCard = ({ image, title, description }: ITourCardProps) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0px_4px_30px_rgba(0,0,0,0.1)] transition duration-300 hover:hover:shadow-[0px_4px_30px_rgba(0,0,0,0.25)]">
      <div className="relative h-68 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-opacity duration-500"
        />
      </div>
      <div className="flex grow flex-col px-6 pt-4 pb-6">
        <h3 className="text-black-900 text-dark mb-2 line-clamp-2 h-16 text-center text-2xl">
          {title}
        </h3>
        <p className="text-black-600 mb-4 line-clamp-3 h-20 text-center text-gray-600">
          {description}
        </p>

        <div className="flex justify-center">
          <Button
            variant="no-border"
            btnLabel={""}
            className="flex items-center justify-center gap-2"
          >
            <p className="text-lg">Read More</p>
            <FaArrowRight size={18}/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
