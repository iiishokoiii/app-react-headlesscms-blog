import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Header from './components/Header';
import ListPage from './components/ListPage';
import SideNav from "./components/SideNav";
import SinglePage from './components/SinglePage';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/page/:pageid" element={<ListPage />} />
        <Route path="/category/:categoryid/page/:pageid" element={<ListPage />} />
        <Route path="/tag/:tagid/page/:pageid" element={<ListPage />} />
        <Route path="/post/:postid" element={<SinglePage />} />
      </Routes>
      <SideNav />
    </BrowserRouter>
  );
}

export default App;
