function Sidebar() {
    return(
        <div>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed w-64 mt-20 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <ul className="space-y-2 font-light">
                        <li>
                            <a href="/second-hand-sales" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                                </svg>
                                <span className="ml-3">Second Hand Sales</span>
                            </a>
                        </li>
                        <li>
                            <a href="/found-items" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Found Items</span>
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">?</span>
                            </a>
                        </li>
                        <li>
                            <a href="/rented-items" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Rented Items</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">?</span>
                            </a>
                        </li>
                        <li>
                            <a href="/lost-items" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Lost Items</span>
                            </a>
                        </li>
                        <li>
                            <a href="/lended-items" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Lended Items</span>
                            </a>
                        </li>
                        <li>
                            <a href="/donations" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.583 5.445h.01M8.86 16.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 10.31 1l5.734.007A1.968 1.968 0 0 1 18 2.983v5.5a.994.994 0 0 1-.316.727l-7.439 7.5a.975.975 0 0 1-1.385.001Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Donations</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
export default Sidebar;