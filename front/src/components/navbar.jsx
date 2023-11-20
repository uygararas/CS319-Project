function Navbar () {
    return (
        <nav className="flex items-center body bg-white sticky top-0 z-50 shadow-inner shadow-gray-400 w-full h-[80px]">
            <div className="flex items-center justify-between pl-4 pr-4 pb-1 pt-1 w-full">
                <div className="flex items-center space-x-9">
                    <a href="/home">
                        <img src="/Logo-3.pdf" className="h-14" alt="Logo" />
                    </a>
                    <a href="/post-item" className="text-blue-hover-text hover:text-blue-text">
                        Post Product
                    </a>
                    <a href={`/category/${encodeURIComponent('Second Hands')}`} className="hover:text-blue-hover-text">
                        Second Hands
                    </a>
                    <a href={`/category/${encodeURIComponent('Donations')}`} className="hover:text-blue-hover-text">
                        Donations
                    </a>
                    <a href={`/category/${encodeURIComponent('Lends')}`} className="hover:text-blue-hover-text">
                        Lends
                    </a>
                    <a href={`/category/${encodeURIComponent('Rentals')}`} className="hover:text-blue-hover-text">
                        Rentals
                    </a>
                    <a href={`/category/${encodeURIComponent('Founds')}`} className="hover:text-blue-hover-text">
                        Founds
                    </a>
                    <a href={`/category/${encodeURIComponent('Losts')}`} className="hover:text-blue-hover-text">
                        Losts
                    </a>
                </div>
                <div className="flex">
                    <form className="flex items-center">
                        <label htmlFor="default-search" className="text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-900 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-80 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search with keywords" required></input>
                            <button type="submit" className="absolute text-gray-900 px-2 py-1 right-1.5 bottom-1.5 border border-gray-900 hover:bg-blue-hover-text rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <div className="flex items-center md:order-2 ml-5">
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-10 h-10" src="/Logo_Campus_Connect_Circular-removebg-preview.png" alt="user photo"></img>
                        </button>
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name.surname@role.bilkent.edu.tr</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href={`/category/${encodeURIComponent('Active Posts')}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Active Posts</a>
                                </li>
                                <li>
                                    <a href={`/category/${encodeURIComponent('Old Posts')}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Old Posts</a>
                                </li>
                                <li>
                                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Inn-App Chats</a>
                                </li>
                                <li>
                                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;