import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import './Footer.css'; // Import a custom CSS file for additional styling

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const developers = [
    { name: 'Natalie Clinton', github: 'https://github.com/NatalieClinton' },
    { name: 'Amandeep Sandhu', github: 'https://github.com/amandeepsandhu13' },
    { name: 'Aneri Patel', github: 'https://github.com/aneripatel2002' },
    { name: 'Udit Sachdeva', github: 'https://github.com/usachdeva' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <Panel className="footer-panel">
          <p className="footer-text">Made with ❤️ by the following web devs:</p>
          <div className="footer-buttons">
            {developers.map((dev, index) => (
              <Button
                key={index}
                label={dev.name}
                icon="pi pi-github"
                className="footer-button"
                onClick={() => window.open(dev.github, '_blank')}
              />
            ))}
          </div>
        </Panel>
      </div>
    </footer>
  );
};

export default Footer;
