import Header from "./components/header";
import {BrowserRouter ,Route,Routes} from "react-router-dom";

import './assets/css/maincss.css'
import './assets/css/main.scss'
import Home from "./views/home";
import Login from "./views/login";
import {AUTHALERTNAME, DEFAULTHEADERS} from "./utils/texthelper";
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
import React, {useMemo} from "react";

function App() {

    const headers = useMemo(()=>{

        const {title,keywords,description,image} = DEFAULTHEADERS;

        return(<Helmet>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name={'keywords'} content={keywords}/>
                <meta name={'site_name'} content={'Zoomba Nigeria'}/>
                <meta name={'image'} content={image}/>
                <meta name={'title'} content={title}/>
                <meta itemProp='description' content={description}/>
                <meta itemProp={'keywords'} content={keywords}/>
                <meta itemProp={'site_name'} content={'Zoomba Nigeria'}/>
                <meta itemProp={'image'} content={image}/>
                <meta name={'twitter:card'} content={'summary_large_image'}/>
                <meta name={'twitter:title'} content={title}/>
                <meta name={'twitter:description'} content={description}/>
                <meta name={'twitter:image:src'} content={image}/>
                <meta property='og:description' content={description}/>
                <meta property={'og:keywords'} content={keywords}/>
                <meta property={'og:site_name'} content={'Zoomba Nigeria'}/>
                <meta property={'og:image'} content={image}/>
                <meta property={'og:title'} content={title}/>
            </Helmet>
        )

    },[])
  return (
      <BrowserRouter>
          <div className="App">
                {
                    headers
                }
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
