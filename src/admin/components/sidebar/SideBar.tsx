import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { LocalStoreServices } from "../../../services/export";

const SideBar = () => {
  let $$ = document.querySelectorAll.bind(document);
  let $ = document.querySelector.bind(document);

  let listItemSideBar = $$(".sidebar-link");

  // if (listItemSideBar) {
  //   listItemSideBar = $$('.sidebar-link');
  //   listItemSideBar?.forEach(item => {
  //     item.addEventListener("click", () => {
  //       listItemSideBar.forEach(itemChild => {
  //         if (itemChild.classList.contains("active")) {
  //           itemChild.classList.remove("active");
  //         }
  //       })
  //       item.classList.add("active");
  //     })
  //   })
  // }

  function handleLogout() {
    LocalStoreServices.removeUser();
    LocalStoreServices.removeToken();
  }

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <NavLink className="sidebar-brand" to="./admin/post">
          <span className="align-middle">AdminKit</span>
        </NavLink>

        <ul className="sidebar-nav d-flex flex-column justify-content-between">
          <div>
            <NavLink className="sidebar-link" to="./admin/post">
              <li className="sidebar-item">
                <i className="align-middle" data-feather="sliders"></i>
                <span className="align-middle">Post</span>
              </li>
            </NavLink>

            <NavLink className="sidebar-link" to="./admin/category">
              <li className="sidebar-item">
                <i className="align-middle" data-feather="user"></i>
                <span className="align-middle">Category</span>
              </li>
            </NavLink>

            <NavLink className="sidebar-link" to="./admin/user">
              <li className="sidebar-item">
                <i className="align-middle" data-feather="log-in"></i>
                <span className="align-middle">User</span>
              </li>
            </NavLink>
          </div>

          <NavLink
            className="sidebar-link bg-primary"
            to="/authen"
            onClick={handleLogout}
          >
            <li className="sidebar-item">
              <i className="align-middle" data-feather="user-plus"></i>{" "}
              <span className="align-middle">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Log out
              </span>
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

SideBar.propTypes = {};

export default SideBar;
