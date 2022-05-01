import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MusicList from "./components/MusicList.js"
import { Provider } from "react-redux";
import store from "./store.js"

/*

- Start page: Includes Navbar and list creation or list authentication, very quick description of site with maybe background example, this page should make list creation super easy and streamline the process of hooking users
- Player page: Includes the player, the list, 99% of the functionality, and the navbar, this page needs to most importantly work and to make adding songs/playlists painfully obvious and as easy and quick as possible to hook users.
- Help/FAQ: A bunch of help and FAQ info, not as important as the top two
- Contact/Donation: Kinda important for bug fixing and donations, pretty much it

*/

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MusicList/>
      </div>
    </Provider>
  );
}

export default App;