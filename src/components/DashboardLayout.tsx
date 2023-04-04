import * as React from "react";

import Breadcrumbs from "./Breadcrumbs";
import Navbar from "./Navbar";

type DasboardProperties = React.PropsWithChildren

function DashboardLayout({children}: DasboardProperties) {
    const [darkToggle, setDarkToggle] = React.useState(false);
    return (
        <div className={darkToggle ? 'dark' : 'default'}>
            <div className={`container-fluid h-screen w-full darkeable`}>
                <div className="flex flex-col h-full">
                    <Navbar darkToggle={darkToggle} setDarkToggle={setDarkToggle}/>
                    <Breadcrumbs/>
                    <div className="h-full mx-auto darkeable-light container-fluid w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
