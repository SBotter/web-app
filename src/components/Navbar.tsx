import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { Button, Image } from "@chakra-ui/react";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#79613f" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" onClick={closeMobileMenu}>
              <Image src="/images/PastaLogo.png" height="90px" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <Button
                  as={RouterLink} // Use the Link component from react-router-dom
                  to={"/delivery"}
                  leftIcon={
                    <i className="fa-solid fa-truck-monster product-detail-icon-link" />
                  }
                  colorScheme="base"
                  variant="solid"
                  onClick={closeMobileMenu}
                  className="button-margin-bottom"
                >
                  WE DELIVER!
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <i className="fa-solid fa-cart-shopping product-detail-icon-link" />
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
