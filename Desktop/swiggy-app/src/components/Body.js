import ResCard from "./ResCard";
import resData from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  let [filterRes, SetFilterState] = useState(resData);
  let [initialData, setInitialData] = useState(resData);
  let [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9063433&lng=77.5856825&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const jsonData = await data.json();
    SetFilterState(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    // SetFilterState([]);
    setInitialData(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    // console.log("json", jsonData?.data?.cards);
  };

  useEffect(() => {
    filterType();
    return () => {
      filterType();
    };
  }, [searchText]);

  let handleData = () => {
    let filterData = filterRes.filter((el) => el?.info?.avgRating > 4.1);
    SetFilterState(filterData);
  };

  const filterType = () => {
    if (searchText === "") {
      SetFilterState(initialData);
    } else {
      let filData = filterRes.filter((el) => {
        return el?.info?.name
          ?.toLowerCase()
          .includes(searchText?.toLowerCase());
      });

      SetFilterState(filData);
    }
  };

  let status = useOnlineStatus();
  console.log("status", status);
  if (status === false) {
    return <h1>looks like your offline please check your internet</h1>;
  }

  return filterRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="flex m-4 p-4 items-center">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <button onClick={filterType}>search</button> */}
        </div>
        <button
          className="px-4 bg-green-100 m-8 py-2 rounded-md"
          onClick={handleData}
        >
          top rated restaurants
        </button>
      </div>
      <div className="flex flex-wrap">
        {filterRes.map((el) => (
          <Link key={el?.info?.id} to={"/restaurant/" + el?.info?.id}>
            <ResCard resInfo={el?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
