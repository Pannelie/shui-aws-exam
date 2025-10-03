import "./oceanImage.css";
import ocean from "../../assets/vectors/BottomImage.png";

export const OceanImage = ({ className = "" }) => {
  return (
    <>
      <img src={ocean} alt="ocean-image" className={`ocean-image ${className}`} />;
    </>
  );
};
