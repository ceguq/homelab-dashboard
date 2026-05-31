import {
  SiAdguard,
  SiDocker,
  SiHomepage,
  SiNetdata,
  SiNextcloud,
  SiNginx,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPortainer,
} from "react-icons/si";

function CasaOSLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.8 21 7.9v8.2l-9 5.1-9-5.1V7.9l9-5.1Zm0 3.1L5.7 9.5v5l6.3 3.6 6.3-3.6v-5L12 5.9Z"
        fill="currentColor"
        opacity="0.34"
      />
      <path
        d="M12 6.7 17.3 10v5.2h-3.1v-3.4H9.8v3.4H6.7V10L12 6.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const LOGOS = {
  casaos: CasaOSLogo,
  portainer: SiPortainer,
  adguard: SiAdguard,
  nextcloud: SiNextcloud,
  netdata: SiNetdata,
  npm: SiNginx,
  "dashboard-frontend": SiHomepage,
  "backend-api": SiOpenapiinitiative,
  docker: SiDocker,
  node: SiNodedotjs,
};

export default function ServiceLogo({ id, className = "service-logo", title }) {
  const Logo = LOGOS[id] ?? SiHomepage;

  return (
    <span className={className} title={title}>
      <Logo aria-hidden="true" focusable="false" />
    </span>
  );
}
