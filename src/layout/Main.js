import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TopBar from "../components/Navbar";
import { Container } from "reactstrap";

const Main = (props) => {
  const history = useHistory();
  
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    scrollToTop();
    setTimeout(scrollToTop, 100);
  }, [history.location.pathname]);

  return (
    <>
      <div className="d-flex flex-column " style={{ minHeight: "100vh" }}>
        <TopBar />
        {history.location.pathname === "/" && <HeroSection />}
        <div style={{ flexGrow: 1, overflowY: "auto" }}>{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
