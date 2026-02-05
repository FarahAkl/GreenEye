import Button from "./Button";

const HeroSec = () => {
  return (
    <section className="relative grid grid-cols-1 items-center justify-between gap-8 bg-[linear-gradient(to_right,#002F20,#009566)] px-8 pt-24 pb-12 md:grid-cols-2 md:px-12 lg:px-20 lg:pt-24">
      <div className="flex flex-col items-center gap-3 md:items-start">
        <h1 className="text-center text-6xl/22 font-bold text-white uppercase md:text-start">
          higher yields lower lost
        </h1>
        <p className="text-center text-lg/8 text-white md:text-start">
          An AI-powered agriculture platform that helps farmers make smarter
          decisions before damage happens.
        </p>
        <Button
          btnLabel="Join Us"
          className="my-3 w-1/2 border border-white px-5 text-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default HeroSec;
