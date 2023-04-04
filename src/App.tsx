import React, {lazy} from "react";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

// import Index from "./pages/Index";
// import QuestionnaireManager from "./pages/questionnaire/QuestionnaireManager";
// import QuestionnairesDashboard from "./pages/questionnaire/QuestionnairesDashboard";
// import QuestionnairesDashboard from "./pages/QuestionnairesDashboard";

// import { ThemeProvider } from "@material-tailwind/react";
// import theme from "./theme";
// import Index from "./pages/Index";

const Dashboard = lazy(() => import("./pages/Index"));
const QuestionnaireManager = lazy(() => import("./apps/Questionnaire/pages/QuestionnaireManager"));
const QuestionnairesDashboard = lazy(() => import("./apps/Questionnaire/pages/QuestionnairesDashboard"));


type AppProperties = React.PropsWithChildren
const Loading = () => <p>Loading ...</p>;

function App({children}: AppProperties) {
    return (
        <div className="App">
            <React.Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/">
                        <Route element={<Dashboard/>} index/>
                        <Route path="questionnaires">
                            <Route element={<QuestionnairesDashboard/>} index/>
                            <Route element={<QuestionnaireManager/>} path="/questionnaires/manage/:uuid/*"/>
                        </Route>
                    </Route>
                </Routes>
            </React.Suspense>
            <ToastContainer/>
        </div>
    );
}

export default App;
