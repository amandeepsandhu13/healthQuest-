import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const developers = [
    { name: 'Natalie Clinton', github: 'https://github.com/NatalieClinton' },
    { name: 'Amandeep Sandhu', github: 'https://github.com/amandeepsandhu13' },
    { name: 'Aneri Patel', github: 'https://github.com/aneripatel2002' },
    { name: 'Udit Sachdeva', github: 'https://github.com/usachdeva' },
    { name: 'Michelle Bell', github: 'https://github.com/MichelleBell0' }
  ];

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <p className="text-light">
          Made with ❤️ by the following web devs:
        </p>
        <ul className="list-unstyled">
          {developers.map((dev, index) => (
            <li key={index}>
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                {dev.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
