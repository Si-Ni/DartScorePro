import {Outlet, Navigate}  from "react-router-dom"


function PrivateRoutes() {
    let auth = {token: false}
  return (
    auth.token ? <Outlet/> : <Navigate to="/"/>
  );
}

export default PrivateRoutes;
