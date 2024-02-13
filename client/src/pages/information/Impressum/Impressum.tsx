import VoiceControl from "../../../components/voiceControl/VoiceControl";


function Impressum() {
  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <VoiceControl />
      <div className="hero-body">
        <div className="content">
          <title>Impressum</title>
          <h1>Impressum</h1>
          <hr style={{ backgroundColor: "black" }}></hr>
          <p>
            <strong>Address:</strong>
            <br />
            Felix Herpich
            <br />
            Blochstra&szlig;e 1<br />
            04329 Leipzig
          </p>
          <p>
            <strong>Phone:</strong> +49 341 25687134
          </p>
          <p>
            <strong>E-Mail:</strong> s5002080@ba-sachsen.de
          </p>
        </div>
      </div>
    </div>
  );
}

export default Impressum;
