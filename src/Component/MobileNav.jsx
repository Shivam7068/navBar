import React, { useEffect, useRef, useState } from "react";
import MobileMenuItems from "./MobileMenuItems";
import { RiMenu3Line } from "react-icons/ri";
import MenuItems from "./MenuItems";
import { menuData } from "../data/menuItem";

const MobileNav = () => {
    const depthLevel = 0;
    const [showMenu, setShowMenu] = useState(false);
    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (showMenu && ref.current && !ref.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [showMenu]);

    return (
        <nav className="mobile-nav">
            <button
                className="mobile-nav__menu-button"
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
            >
                <RiMenu3Line />
            </button>

            {showMenu && (
                <ul className="menus" ref={ref}>
                    {menuData.map((menu, index) => {
                        return (
                            <MobileMenuItems
                                items={menu}
                                key={index}
                                depthLevel={depthLevel}
                                showMenu={showMenu}
                                setShowMenu={setShowMenu}
                            />
                        );
                    })}
                </ul>
            )}
        </nav>
    );
};

export default MobileNav;
