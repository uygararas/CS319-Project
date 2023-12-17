function Footer() {
    return(
        <footer className="bg-white shadow-inner shadow-gray-300 body">
            <div className="flex flex-wrap w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <img src="/BilkoLogo.png" className="h-10" alt="Logo" />
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/home" className="hover:underline">campusconnect™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
export default Footer;