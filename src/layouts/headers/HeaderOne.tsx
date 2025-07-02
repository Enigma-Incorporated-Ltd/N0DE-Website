 
import { useState } from "react";
import menu_data from "../../data/menu-data";
import { Link } from "react-router-dom";

if (typeof window !== 'undefined') { 
  import('bootstrap/dist/js/bootstrap.bundle.min.js');
}

const HeaderOne = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [navTitle, setNavTitle] = useState<string>(""); 
  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-overlay z-3 navbar--dark">
        <div className="container">
          <Link to="/" className="logo d-block">
          <img src="assets/img/logo-light.png" alt="logo" className="logo__img" /> 
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setShowMenu(!showMenu)}><span className="navbar-toggler-icon"></span>
            </button>
          <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="primaryMenu">
            <ul className="navbar-nav justify-content-end align-items-lg-center w-100">
              {menu_data.map((item, i) => (
                <li className={`nav-item ${item.has_dropdown ? 'has-sub' : ''} ${i === 0 && 'active ms-lg-auto'}`} key={i}>
                  <Link onClick={() => openMobileMenu(item.title)} onMouseOver={() => openMobileMenu(item.title)} className="nav-link fs-14" to={item.link}>{item.title}</Link>
                  {item.has_dropdown && (
                    <ul className="list sub-menu" style={{ display: navTitle === item.title ? "block" : "none", }}>
                      {item.sub_menus?.map((sub_item, index) => (
                        <li key={index} className="sub-menu__list">
                          <Link to={sub_item.link} className="link sub-menu__link fs-14">{sub_item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="nav-item ms-lg-auto">
                <ul className="list list-row gap-2">
                  <li>
                    <Link to="/contact" className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill">
                      <span className="d-inline-block">Get Started </span>
                      <span className="d-inline-block"><i className="bi bi-arrow-right"></i></span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>             
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderOne;