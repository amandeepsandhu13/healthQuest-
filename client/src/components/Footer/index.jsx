import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

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
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        <Panel 
          className="p-3"
        >
          <p className="text-center">
            Made with ❤️ by the following web devs:
          </p>
          <div className="d-flex justify-content-center gap-3">
            {developers.map((dev, index) => (
              <Button
                key={index}
                label={dev.name}
                icon="pi pi-github"
                className="p-button-link p-text-light"
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
