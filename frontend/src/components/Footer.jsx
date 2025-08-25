import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4 text-center">
            <p>© {new Date().getFullYear()} D2D Healthcare. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
