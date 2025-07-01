import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Header({ darkMode, handleToggle }) {
  return (
    <header className="header" id="site-header">
      <div className="header-spacing">
        <Tooltip title="Toggle light/dark mode">
          <IconButton onClick={handleToggle} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        <div className="header-text">
          <Link to="/" className="nav-link">
            {darkMode ? (
              <img
                className="header-image"
                alt="raincheck-header"
                src="src/assets/the-raincheck-header-white.png"
              />
            ) : (
              <img
                className="header-image"
                alt="raincheck-header"
                src="src/assets/the-raincheck-header-black.png"
              />
            )}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link to="/" className="nav-link">
            <img
              className="profile-image"
              alt="profile"
              src="https://cdn.pixabay.com/photo/2013/04/01/09/22/thunderstorm-98541_1280.png"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
