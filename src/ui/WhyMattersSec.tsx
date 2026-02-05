const WhyMattersSec = () => {
  return (
    <section className="bg-bg relative mt-24 overflow-visible px-8 pt-24 pb-12 md:px-12 lg:px-20 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        {/* Image column */}
        <div className="relative md:col-span-1">
          <div className="md:-top-84 left-1/2 absolute -top-60 flex -translate-x-1/2 justify-center sm:-top-78 md:left-0 md:translate-x-0">
            <img
              src="/images/FarmerThinking.avif"
              alt="Farmer Thinking"
              className="w-54 md:w-62 lg:w-70"
            />
          </div>
        </div>

        {/* Text column */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <p className="text-dark text-3xl font-bold">Why It Matters?</p>
          <p className="text-lg text-gray-600">
            GreenEye empowers farmers, agronomists, and decision-makers to act
            early, reduce risks, and protect agricultural productivity. By
            combining real data with AI-driven analysis, GreenEye helps reduce
            uncertainty, minimize losses, and improve long-term agricultural
            planning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyMattersSec;
