import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF, faYoutube, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css";


function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-container">
        {/* Quick Links Column */}
        <div className="footer-column">
          <h4 className='text-uppercase'>Quick Links</h4>
          <ul className='list-unstyled mb-0'>
            <li>
              <a href='/' className='text-white'>
                Home
              </a>
            </li>
            <li>
              <a href='/bills' className='text-white'>
                Bills
              </a>
            </li>
            <li>
              <a href='/about' className='text-white'>
                About Us
              </a>
            </li>
            <li>
              <a href='/contact' className='text-white'>
                Contact Us
              </a>
            </li>
            <li>
              <a href='/report' className='text-white'>
                Concerns
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us Column */}
        <div className="footer-column">
          <h4 className='text-uppercase'>Contact Us</h4>
          <ul className='list-unstyled mb-0'>
            <li>Customer support: 0720 1111 111</li>
          </ul>
        </div>

        {/* Social Handles Column */}
        <div className="footer-column">
          <h4 className='text-uppercase'>Social Handles</h4>
          <div className='icons'>
            <a href="https://instagram.com" className='text-white'><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://twitter.com" className='text-white'><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://facebook.com" className='text-white'><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://youtube.com" className='text-white'><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="https://linkedin.com" className='text-white'><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://github.com" className='text-white'><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="footer-column">
          <div className='newsletter'>
            <h4 className='text-uppercase'>Subscribe to Our Newsletter</h4>
            <form className='subscribe-form'>
              <input type='email' placeholder='Your Email Address' className='subscribe-input' />
              <button type='submit' className='btn subscribe-button'>Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className='text-center p-3'>
        © 2021 FitLife Kenya - All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
