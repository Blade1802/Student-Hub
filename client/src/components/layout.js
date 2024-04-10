import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-shrink-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
