import { FooterProps } from "./Footer";

function Footer(props: FooterProps) {
  //{isLoggedIn && <div className="fixed-bottom-left">Logged in as {displayUserID}</div>}
  return (
    <footer className="is-flex is-justify-content-center is-size-6">
      {props.isLoggedIn && (
        <div className="is-flex">
          <p className="mr-2">Logged in as {props.userID}</p>
          <p className="mr-2">|</p>
        </div>
      )}
      <a className="mb-3" href="/impressum" target="_blank">
        Impressum
      </a>
    </footer>
  );
}
export default Footer;
