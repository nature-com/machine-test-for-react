
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            {/* <div className="dark:bg-boxdark-2 dark:text-bodydark"> */}

            <div className="flex h-screen overflow-hidden">

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#f1f1f1]">

                    <main>
                        <div className="mx-auto p-4 md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>

                </div>

            </div>

            {/* </div> */}
        </>
    );
};

export default Layout;
