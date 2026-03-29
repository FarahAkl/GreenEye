import Button from "./Button";

const AppSec = () => {
  const appSteps = [
    {
      icon: "/svg/plantStages1.svg",
      label: "Understand your land",
      describtion:
        "See what’s happening in your land and know its condition in a simple and clear way.",
    },
    {
      icon: "/svg/plantStages2.svg",
      label: "Choose the right crop",
      describtion:
        "Get help picking the best crop to grow based on your land and the time of year.",
    },
    {
      icon: "/svg/plantStages3.svg",
      label: "Check your plants",
      describtion:
        "Take a photo of your plant and find out if there’s a problem and how to fix it.",
    },
    {
      icon: "/svg/plantStages4.svg",
      label: "Follow your land over time",
      describtion:
        "Keep track of changes in your land and crops season after season.",
    },
    {
      icon: "/svg/plantStages5.svg",
      label: "Learn from others",
      describtion:
        "Talk with farmers and experts, ask questions, and share experiences.",
    },
  ];
  return (
    <section className="px-8 py-20 md:px-12 lg:px-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="text-dark text-4xl font-bold">The GreenEye App</p>
          <p className="text-lg text-gray-600">
            GreenEye is designed to be simple, intuitive, and practical. Farmers
            and decision-makers can access powerful insights through a clear
            visual interface — without technical complexity.
          </p>
          <p className="text-2xl text-[#004630]">What you can do:</p>
          {appSteps.map((step) => (
            <div className="flex flex-col gap-3" key={step.label}>
              <div className="flex items-end gap-2">
                <img src={step.icon} alt="plant" key={step.label} />
                <p className="text-xl">{step.label}</p>
              </div>
              <p className="text-lg text-gray-700">{step.describtion}</p>
            </div>
          ))}
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <img src="/images/application.avif" alt="application screens" />
        </div>
        <Button btnLabel="Download App" className="md:w-1/2" />
      </div>
    </section>
  );
};

export default AppSec;
