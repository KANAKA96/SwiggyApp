import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const ResMenu = () => {
  let [menuItems, setMenuItems] = useState(null);
  let [resInfo, setResInfo] = useState([]);

  useEffect(() => {
    fetchMenu();

    return () => {
      fetchMenu();
    };
  }, []);

  const { resId } = useParams();
  console.log("resId", typeof resId);
  const fetchMenu = async () => {
    let data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9063433&lng=77.5856825&restaurantId=" +
        resId +
        "&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER"
    );
    let jsonData = await data.json();
    console.log("dataasdasd", jsonData?.data?.cards[2]?.card?.card?.info);
    setMenuItems(
      jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
        ?.card?.card?.itemCards
    );
    setResInfo(jsonData?.data?.cards[2]?.card?.card?.info);
  };
  if (menuItems === null) {
    return <Shimmer />;
  }

  let { name, avgRating, costForTwoMessage, cuisines } = resInfo && resInfo;
  console.log("menuItems", menuItems);
  console.log("resInfo", resInfo);
  return (
    <div className="memu">
      <h1> {name}</h1>
      <p>{costForTwoMessage}</p>

      {/* <h2>{avgRating}</h2> */}

      {menuItems.map((el) => (
        <li key={el?.card?.info?.id}>
          {el?.card?.info?.name} - {parseInt(el?.card?.info?.price / 100)}
        </li>
      ))}
    </div>
  );
};

export default ResMenu;
