import brand from "../services/brand.json";


export default function CoBrand() {
  const allLogos = brand.logos;

  return (<>

    <div className="container overflow-hidden">
      <div className="row brandLogo logos">

        {allLogos.map((logo, index) => (
          <div className="col-6 col-md-3 px-0" key={index}>
            <a href={logo.agencyUrl}>
              <img src={logo.logo} alt={logo.agency} />
            </a>
          </div>
        ))}

      </div>
    </div>
    
  </>);
}
