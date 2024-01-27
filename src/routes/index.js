import AuthView from "../views/auth/AuthView";
import About from "../views/About.js";
import Home from "../views/Home";
import Builder from "../views/Builder";
import CheckOut from "../views/CheckOut";
import PrivacyPolicy from "../views/PrivacyPolicy";
import TermConditions from "../views/TermConditions";
import Faq from "../views/Faq";
import Pricing from "../views/Pricing";
import Cv from "../views/Cv";
import SurveyResponse from "../views/SurveyResponse";
let routes = [
    {
        path: "/auth",
        component: AuthView,
        layout: "auth",
    },
    {
        path: "/",
        component: Home,
        layout: "main",
    },
    {
        path: "/about",
        component: About,
        layout: "main",
    },
    {
        path: "/builder",
        component: Builder,
        layout: "main",
    },
    {
        path: "/checkout/:id",
        component: CheckOut,
        layout: "main",
    },
    {
        path: "/pricing/:id",
        component: Pricing,
        layout: "main",
    },
    {
        path: "/privacy-policy",
        component: PrivacyPolicy,
        layout: "main",
    },
    {
        path: "/term-conditions",
        component: TermConditions,
        layout: "main",
    },
    {
        path: "/faq",
        component: Faq,
        layout: "main",
    },
    {
        path: "/survey-response/:id",
        component: SurveyResponse,
        layout: "main",
    },
    {
        path: "/cv/:id",
        component: Cv,
        layout: "main",
    }
];
export default routes;
