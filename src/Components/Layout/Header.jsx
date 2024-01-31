import logo from "../../images/react.png";
const Header = () => {
  return (
    <div className="py-2 p1-2" style={{ borderBottom: "1px solid #777" }}>
      {/* <h1 className="heading1">React Course</h1> -- Old before adding Image */}
      <img
        src={logo}
        alt="reactlogo"
        style={{ height: "35px", verticalAlign: "top" }}
      ></img>
      <span className="h2 pt-4 m-2 text-white-50">Cyclopedia</span>
    </div>
  );
};

export default Header;
