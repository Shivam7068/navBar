import { menuData } from "../data/menuItem";
import MenuItems from "./MenuItems";
const DesktopNav = () => {
    const depthLevel = 0;

    return (
        <nav className="desktop-nav">
            <ul className="menus">
                {menuData.map((menu, index) => {
                    return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                })}
            </ul>
        </nav>
    );
};

export default DesktopNav;
