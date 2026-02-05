import Button from "./Button";

const ArticleSec = () => {
  return (
    <section className="grid grid-cols-1 items-center justify-between gap-8 px-8 pt-24 pb-12 md:grid-cols-2 md:px-12 lg:px-20 lg:pt-24">
      <div className="flex justify-center">
        <svg viewBox="0 0 200 200" className="h-115 w-115 md:h-120 md:w-120">
          <defs>
            <clipPath id="blobClip">
              <path
                d="M38.9,-65.1C53.2,-59.2,69.3,-54.3,74.7,-43.6C80,-32.9,74.5,-16.5,73.4,-0.7C72.2,15.1,75.3,30.2,71.6,43.6C67.8,57,57.1,68.6,44,75.3C30.9,82,15.4,83.6,0.6,82.5C-14.2,81.4,-28.4,77.6,-38.3,69.1C-48.3,60.6,-54.1,47.6,-59.1,35.3C-64,23,-68.2,11.5,-68.2,0C-68.2,-11.5,-63.9,-22.9,-57.5,-32.9C-51.2,-42.8,-42.8,-51.2,-32.9,-59.6C-22.9,-67.9,-11.5,-76.3,0.4,-77.1C12.3,-77.9,24.7,-71,38.9,-65.1Z"
                transform="translate(100 100) scale(1.2)"
              />
            </clipPath>
          </defs>

          <image
            href="/images/article-img.png"
            width="200"
            height="200"
            clipPath="url(#blobClip)"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-start">
        <p className="text-dark text-4xl font-bold">
          Agriculture at a Turning Point
        </p>
        <p className="text-lg/8 text-gray-500">
          Agriculture is the backbone of food security, economic stability, and
          human survival. For generations, farming decisions were guided by
          experience, observation, and seasonal patterns. Today, this reality
          has changed.Climate variability, water scarcity, land degradation, and
          rapid population growth have transformed agriculture into a high-risk
          system with shrinking margins for error. Not to mention that these
          decisions are made reactively —responding to problems after they occur
          rather than preventing them in advance. Farmers are now required to
          make critical decisions in an environment where natural resources are
          declining and conditions are becoming increasingly unpredictable.
        </p>
        <Button btnLabel="Continue Reading" className="mt-4 md:w-1/2" />
      </div>
    </section>
  );
};

export default ArticleSec;
