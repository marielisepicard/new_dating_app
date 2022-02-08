import { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import { UserContext } from "./UserContext";

import ChatRoom from "./Components/ChatRoom/ChatRoom";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";
import Log from "./Components/Log";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import MatchingRoom from "./Components/MatchingRoom/MatchingRoom";
import Password from "./Components/UpdateProfile/Password";
import PrivateInfo from "./Components/UpdateProfile/PrivateInfo";
import PublicProfile from "./Components/UpdateProfile/PublicProfile";
import Signup from "./Components/Signup";
import UpdatePictures from "./Components/UpdateProfile/UpdatePictures";
import VisitProfile from "./Components/VisitProfile/VisitProfile";
import Welcome from "./Components/Welcome";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <div className="topBar">
            {user ? (
              <>
                <Logout />
                <Link to="/matchingroom">Matching Room</Link>
                <Link to="/home">Profile</Link>
                <Link to="/chatroom">Chatroom</Link>
              </>
            ) : (
              <>
                <Link to="/log">Log in</Link>
                <Link to="/signup">Sign up</Link>
              </>
            )}
          </div>
          <div className="wrapper">
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Welcome />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/log" element={<Log />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/updateinfo" element={<PrivateInfo />} />
                <Route exact path="/updatepassword" element={<Password />} />
                <Route exact path="/updatepics" element={<UpdatePictures />} />
                <Route exact path="/chatroom" element={<ChatRoom />} />
                <Route exact path="/matchingroom" element={<MatchingRoom />} />
                <Route
                  exact
                  path="/forgotpassword"
                  element={<ForgotPassword />}
                />
                <Route path="visit/:id" element={<VisitProfile />} />
                <Route
                  exact
                  path="/publicprofile"
                  element={<PublicProfile />}
                />
                <Route path="login/:validationLink" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
