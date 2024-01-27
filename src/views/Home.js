import HeroSection from "../components/HeroSection";
import BuildCv from "../components/BuildCv";
import Pricing from "../components/Pricing";
import Templates from "../components/Templates";
import EaseOfAccess from "../components/EaseOfAccess";
import RightSkills from "../components/RightSkills";

const Home = (props) => {
    return (
        <>
            <BuildCv />
            <Pricing />
            <Templates />
            <EaseOfAccess />
            <RightSkills/>
        </>
    );
};

export default Home;
