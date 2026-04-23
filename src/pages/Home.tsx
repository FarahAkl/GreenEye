import AppSec from "../ui/AppSec";
import ArticleSec from "../ui/ArticleSec";
import ChallengesSec from "../ui/ChallengesSec";
import DifferentsSec from "../ui/DifferentsSec";
import FeatureSec from "../ui/FeatureSec";
import GreenEyeSec from "../ui/GreenEyeSec";
import HeroSec from "../ui/HeroSec";
import MarketSec from "../ui/MarketSec";
import MeetUsSec from "../ui/MeetUsSec";
import WhyMattersSec from "../ui/WhyMattersSec";
import SEO from "../ui/SEO";

const Home = () => {
  return (
    <>
      <SEO title="Home" />
      <HeroSec />
      <ArticleSec />
      <ChallengesSec/>
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
