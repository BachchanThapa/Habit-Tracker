import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="content">
          <div className="socialSection">
            <p className="followText">Follow us</p>

            <div className="socials">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook.svg" alt="Facebook" />
              </a>

              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram.svg" alt="Instagram" />
              </a>

              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/youtube.svg" alt="YouTube" />
              </a>
            </div>
          </div>

          <p className="copyright">
            © 2026 HabitTrack <br />
            Exam project by Bachchan Thapa
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;