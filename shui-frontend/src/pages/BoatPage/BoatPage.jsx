import "./boatPage.css";
import boat from "../../assets/vectors/top.png";
import ocean from "../../assets/vectors/BottomImage.png";

export const BoatPage = () => {
  return (
    <div className="ocean-container">
      <div className="boat">
        <img src={boat} alt="S-båt" />
      </div>
      <div className="ocean">
        <img src={ocean} alt="ocean-image" className="ocean-image" />
        <div className="ocean-blue"></div>
      </div>
    </div>
  );
};
