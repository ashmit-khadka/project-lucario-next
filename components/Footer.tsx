import React from "react";

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content screen">
                <p>© {year} Ashmit Khadka. All rights reserved.</p>
                <p>Follow me on
                    <a href="
                        https://www.linkedin.com/in/ashmit-khadka/"
                        target="_blank"
                        rel="noopener noreferrer"
                    > LinkedIn</a>

                </p>
            </div>
        </footer>
    );
}

export default Footer;
