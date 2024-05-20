import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const scrollToRef = (ref) => {
  if (ref.current) {
    const navbarHeight = 100;
    const offset = ref.current.offsetTop - navbarHeight;
    window.scrollTo({ top: offset, behavior: "smooth" });
    // console.log(offset);
  }
};

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  // Create a ref for the content element
  const contentRef = useRef(null);

  // Function to scroll to the content
  const scrollToContent = () => {
    if (contentRef.current) {
      const navbarHeight = 100; // Adjust as needed
      const offset = contentRef.current.offsetTop - navbarHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        closeDropdown();
        scrollToRef(contentRef);
      }}
    >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}
          >
            <Link to={items.url}>{items.title}</Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={scrollToContent}
          >
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.url} ref={contentRef} target={items.target}>
          {items.title}
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
