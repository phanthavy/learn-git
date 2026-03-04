import { useState, useEffect } from "react"

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    // lock scroll when menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto"
    }, [menuOpen])

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center relative">

            {/* Logo */}
            <h1 className="text-2xl font-bold">MyLogo</h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 text-lg">
                <li className="hover:text-yellow-400 cursor-pointer">Home</li>
                <li className="hover:text-yellow-400 cursor-pointer">About</li>
                <li className="hover:text-yellow-400 cursor-pointer">Services</li>
            </ul>

            {/* Hamburger */}
            <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden flex flex-col gap-1"
            >
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white"></span>
            </button>

            {/* Overlay */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
            ></div>

            {/* Slide Menu From Right */}
            <div
                className={`
          fixed top-0 right-0 h-full w-72 bg-white text-gray-800 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu Items */}
                <ul className="flex flex-col gap-6 px-8 text-lg">
                    <li className="hover:text-blue-600 cursor-pointer transition">
                        Home
                    </li>
                    <li className="hover:text-blue-600 cursor-pointer transition">
                        About
                    </li>
                    <li className="hover:text-blue-600 cursor-pointer transition">
                        Services
                    </li>
                    <li className="hover:text-blue-600 cursor-pointer transition">
                        Contact
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar