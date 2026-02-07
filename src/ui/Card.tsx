interface IProps {
  icon: string;
  label: string;
  describtion: string;
}

const Card = ({ icon, label, describtion }: IProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-white px-10 py-12 text-center shadow-sm transition duration-300 hover:hover:shadow-md">
      <div className="relative h-12 w-12 rounded-tl-2xl rounded-tr-lg rounded-br-2xl rounded-bl-lg bg-[#E4F2E8]">
        <img src={icon} alt="icon" className="absolute -top-3 -left-3" />
      </div>
      <p className="text-dark text-2xl">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{describtion}</p>
    </div>
  );
};

export default Card;
