import { CDN_URL } from "../utils/constants";

const ResCard = (props) => {
  const { name, cuisines, avgRating, cloudinaryImageId } = props?.resInfo;
  return (
    <div className="m-4 p-4 w-[200px] bg-gray-100 rounded-md shadow-md hover:bg-gray-200 hover:border border-gray-400">
      <img
        alt="res-logo"
        className="rounded-lg"
        src={`${CDN_URL}${cloudinaryImageId}`}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4 className="truncate"> {cuisines.join(",")}</h4>
      <h4>{avgRating}</h4>
    </div>
  );
};

export default ResCard;
