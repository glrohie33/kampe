import React from 'react';
import logo from "../assets/images/logo_9.png";
import '../assets/css/footer.scss';
function Footer(props) {
    return (
        <>
            <footer>
            <section className={'row'}>
                <div className="col">
                    <div className="flex">
                        <div className="col_4">
                            <h3 className={'col-headers'}>About Us</h3>
                            <ul>
                                <li><a href="/aboutus">About us</a></li>
                                <li><a href="/terms">Terms & Conditon</a></li>
                                <li><a href="/privacy">Privacy</a></li>
                                <li><a href="/policy">Policy</a></li>
                                <li><a href="/aboutus">Report</a></li>
                            </ul>
                        </div>
                        <div className="col_4">
                            <h3 className={'col-headers'}>Quick Links</h3>
                            <ul>
                                <li><a href="/aboutus">Sell on Zoomba</a></li>
                                <li><a href="/terms">Latest Products</a></li>
                                <li><a href="/privacy">Contact Us</a></li>
                                <li><a href="/policy">View Cart</a></li>
                            </ul>
                        </div>
                        <div className="col_4">
                            <div className="footer-logo">
                                <img src={logo} alt="zoomba logo"/>
                            </div>
                            <p>
                                Buy and pay small-small on Zoomba Nigeria. An eCommerce marketplace dedicated to providing conveniently payment plan AKA LAYAWAY transactional model in Africa.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </footer>
            <section className={'footer-bottom'}>
                <div className="col">
                    <p>2022@All Rights Reserved@Zoomba.ng</p>
                </div>
            </section>
        </>

    );
}

export default Footer;