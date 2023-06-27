import React from "react";
import Header from "./Header";

const Layout = ({ currentUser, children }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      {children}
    </div>
  );
};

export default Layout;
