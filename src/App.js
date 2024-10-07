import { useDispatch, useSelector } from "react-redux";
import Compose from "./components/Compose";
import EmailList from "./components/EmailList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import EmailDetail from "./components/EmailDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { selectUser, signin, signout } from "./features/userSlice";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Spinner from "./components/Spinner";

function App() {
  const isMessageOpen = useSelector(selectSendMessageIsOpen)
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        dispatch(signin({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email
        }));
      } else {
        dispatch(signout());
      }
      setLoading(false)
    })
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      )
        : (
          user ?
            (
              <div className="App" >
                <Header />
                <div className="App_body">
                  <Sidebar />
                  <Routes>
                    <Route exact path="/" element={<EmailList />} />
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
        )
      }
    </BrowserRouter >
  );
}

export default App;
