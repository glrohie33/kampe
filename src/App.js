import Header from "./components/header";
import {BrowserRouter ,Route,Routes} from "react-router-dom";

import './assets/css/maincss.css'
import './assets/css/main.scss'
import Home from "./views/home";
import Login from "./views/login";
import {AUTHALERTNAME} from "./utils/texthelper";
import Displayalerts from "./components/displayAlert";
import PageView from "./views/pageView";
import Cart from "./views/cart";
import Checkout from "./views/checkout";
import Authenticate from "./components/authenticate";
import MakePayment from "./views/makePayment";
import Footer from "./components/footer";
import Dashboard from "./views/dashboard/dashboard";
import Profile from "./views/dashboard/profile";
import Orders from "./views/dashboard/orders";
import ShippingAddress from "./views/dashboard/shippingAddress";
import Register from "./views/register";
import {Helmet} from "react-helmet";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Helmet>
                  <title>Zoomba Kampe Nigeria</title>
                  <meta name="description" content="No 1 store to get your foodstuff" />
                  <meta name="theme-color" content="#E6E6FA" />
              </Helmet>
              <Displayalerts name={AUTHALERTNAME}></Displayalerts>
              <Header className="App-header">
              </Header>
              <div className="page-content">
                  <Routes>
                      <Route path={''} element={<Home/>}>
                      </Route>
                      <Route path={'/login'} element={<Login/>}>
                      </Route>
                      <Route path={'/register'} element={<Register/>}>
                      </Route>
                      <Route path={'/cart'} element={<Cart/>}>
                      </Route>
                      <Route path={'/checkout'} element={<Authenticate><Checkout/></Authenticate>}>
                      </Route>
                      <Route path={'/makePayment/:orderId'} element={<Authenticate><MakePayment/></Authenticate>}>
                      </Route>
                      <Route path={'/:slug'} element={<PageView/>}>
                      </Route>
                      <Route path={'/dashboard'} element={<Authenticate><Dashboard/></Authenticate>}>
                          <Route index element={<Profile/>}  />
                          <Route path={'orders'} element={<Orders/>} />
                          <Route path={'shippingAddress'} element={<ShippingAddress/>}/>
                      </Route>
                  </Routes>
              </div>
              <Footer className="App-footer"></Footer>
          </div>
      </BrowserRouter>
  );
}


export default App;
