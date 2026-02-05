const MeetUsSec = () => {
  return (
    <section className="bg-bg relative mt-24 overflow-visible px-8 py-20 md:px-12 lg:px-24">
      <img
        src="/svg/plant.svg"
        alt="plant"
        className="absolute right-5 bottom-0"
      />
      <img
        src="/svg/planet.svg"
        alt="planet"
        className="absolute bottom-5 left-4 hidden md:flex"
      />
      <img
        src="/svg/satelite.svg"
        alt="satalite"
        className="absolute -top-18 left-1/2 hidden md:flex"
      />
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="text-dark text-4xl font-bold">Meet GreenEye</p>
          <p className="text-lg text-gray-600">
            GreenEye is a smart agriculture platform designed to support farmers
            and decision-makers with accurate, data-driven insights. It combines
            satellite imagery, climate data, and artificial intelligence to help
            anticipate risks and improve agricultural decisions
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/graphicLogo.avif" alt="" className="w-80" />
        </div>
      </div>
    </section>
  );
};

export default MeetUsSec;
