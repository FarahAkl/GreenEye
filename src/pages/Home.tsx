import AppSec from "../ui/AppSec";
import ArticleSec from "../ui/ArticleSec";
import DifferentsSec from "../ui/DifferentsSec";
import FeatureSec from "../ui/FeatureSec";
import GreenEyeSec from "../ui/GreenEyeSec";
import HeroSec from "../ui/HeroSec";
import MarketSec from "../ui/MarketSec";
import MeetUsSec from "../ui/MeetUsSec";
import WhyMattersSec from "../ui/WhyMattersSec";

const Home = () => {
  return (
    <>
      <HeroSec />
      <ArticleSec />
      <MeetUsSec />
      <FeatureSec />
      <WhyMattersSec />
      <DifferentsSec />
      <GreenEyeSec />
      <AppSec />
      <MarketSec />
    </>
  );
};

export default Home;
