import { useDispatch, useSelector } from "react-redux";
import Compose from "./components/Compose";
import EmaiList from "./components/EmaiList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import EmailDetail from "./components/EmailDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { selectUser, signin, signout } from "./features/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const isMessageOpen = useSelector(selectSendMessageIsOpen)
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signin({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email
        }));
      } else {
        dispatch(signout());
      }
    })
  }, []);
  return (
    <BrowserRouter>
      {
        user ?
          (
            <div className="App">
              <Header />
              <div className="App_body">
                <Sidebar />
                <Routes>
                  <Route exact path="/" element={<EmaiList />} />
                </Routes>
                <Routes>
                  <Route path="/mail" element={<EmailDetail />} />
                </Routes>
              </div>
              {isMessageOpen && <Compose />}
            </div>
          )
          :
          <Login />
      }

    </BrowserRouter>
  );
}

export default App;
