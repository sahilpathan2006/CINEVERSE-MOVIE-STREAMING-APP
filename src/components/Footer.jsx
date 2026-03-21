import { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Watch With Us</h2>
        <p>Stream unlimited movies & shows anytime, anywhere.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/tv-shows">TV Shows</a>

          <a
            href="https://www.linkedin.com/in/sahil-pathan-ba558a388/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact (LinkedIn)
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} WatchWithUs. All Rights Reserved.
          <br />
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Developed by Sahil Amjad Pathan
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
