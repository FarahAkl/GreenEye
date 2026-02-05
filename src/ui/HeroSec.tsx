// import Button from "./Button";

// const HeroSec = () => {
//   return (
//     <section className="relative grid grid-cols-1 items-center justify-between gap-8 bg-[linear-gradient(to_right,#002F20,#009566)] md:grid-cols-2">
//       <div className="flex flex-col items-center gap-3 px-8 pt-24 pb-32 md:items-start md:px-12 lg:px-20 lg:pt-24">
//         <h1 className="text-center text-6xl/22 font-bold text-white uppercase md:text-start">
//           higher yields lower lost
//         </h1>
//         <p className="text-center text-lg/8 text-white md:text-start">
//           An AI-powered agriculture platform that helps farmers make smarter
//           decisions before damage happens.
//         </p>
//         <Button
//           btnLabel="Join Us"
//           className="my-3 w-1/2 border border-white px-5 text-lg shadow-sm"
//         />
//       </div>
//       <div className="h-full w-full">
//         <img
//           src="/images/plantHologrampng.png"
//           alt=""
//           className="w-full object-cover"
//         />
//       </div>
//     </section>
//   );
// };

// export default HeroSec;

import Button from "./Button";

const HeroSec = () => {
  return (
    <section className="relative grid grid-cols-1 bg-[linear-gradient(to_right,#002F20,#009566)] md:grid-cols-2">
      {/* Text Content */}
      <div className="z-10 flex flex-col items-center gap-3 px-8 pt-24 pb-32 md:items-start md:px-12 lg:px-20 lg:pt-24">
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

      {/* Image */}
      <div className="relative">
        <img
          src="/images/plantHologrampng.png"
          alt="Plant Hologram"
          className="md:absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSec;
