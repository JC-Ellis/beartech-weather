export default function Header() {
  return (
    <header className="header" id="site-header">
      <div>
        <div className="header-spacing">
          <div className="header-text">
            <h1>Quick Wet Check</h1>
          </div>
          <img
            className="profile-image"
            alt="profile-image"
            src="https://cdn.pixabay.com/photo/2013/04/01/09/22/thunderstorm-98541_1280.png"
          />
        </div>
        <p className="sub-header">Sometimes, you just want to know if it's wet</p>
      </div>
    </header>
  );
}
