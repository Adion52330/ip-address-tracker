import { useState } from "react";
// import Map from "./Map";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

const Header = () => {
  const [ip, setIp] = useState("8.8.8.8");
  const [data, setData] = useState({
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      timezone: "-08:00",
    },
    domains: [
      "00000000-0000-0000-0000-002590baafe8.fertileunderground.com",
      "00011a8e-2189-45c0-92bf-1d45417bcef9.pong.s.elliq.co",
      "000180.top",
      "0002c794-9134-44fd-bc7c-5a383e5685f0.pong.s.elliq.co",
      "00031d1b-bc04-49f1-8cd3-3edf01701368.pong.s.elliq.co",
    ],
    as: {
      asn: 15169,
      name: "GOOGLE",
      route: "8.8.8.0/24",
      domain: "https://about.google/intl/en/",
      type: "Content",
    },
    isp: "Google LLC",
  });
  const [lat, setLat] = useState(119.4179);
  const [lng, setLng] = useState(36.7783);
  const [loading, setLoading] = useState(false);

  const getIp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_XxxX6fh3RIcTK1MnlhmE3czaeozkR&ipAddress=${ip}`
    );
    const data = await response.json();
    setData(data);
    setLoading(false);
    console.log(data);
    getCoordinates();
  };

  // get coordinates of data.location.region
  const getCoordinates = async () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.location.country}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWRpb24iLCJhIjoiY2t2aWJ3MmZqNGhsNDJybHVwY2ZiZXRtaSJ9.FUhkRv84vCMJcyHgOeB7Dw",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setLat(data.geometry.coordinates[0]);
        setLng(data.geometry.coordinates[1]);
        console.log(data.features);
      });
  };

  return (
    <div className="flex flex-col items-center z-50">
      <img
        className="w-full h-64 absolute -z-10 object-cover"
        src="https://i.ibb.co/Wsh3Vg0/pattern-bg.png"
        alt=""
      />

      <h1>IP Address Tracker - Adion</h1>

      <form className="flex items-center justify-center relative w-[80%] lg:w-[50%] top-20 rounded-2xl mx-auto ">
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          type="text"
          className="p-4 flex-1 truncate text-[18px] outline-none focus:shadow-lg shadow-sm rounded-2xl rounded-br-none rounded-tr-none"
        />
        <button
          onClick={getIp}
          type="submit"
          className="p-5 hover:bg-[#3f3f3f] transition bg-black rounded-2xl rounded-bl-none rounded-tl-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
            <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
          </svg>
        </button>
      </form>

      <div className="flex flex-col lg:flex-row absolute top-[13rem] rounded-3xl bg-white p-7 flex-wrap lg:space-x-10 ">
        {loading ? (
          <div className="animate-ping p-5 m-5 bg-black rounded-full"></div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center space-y-4">
              <h4 className="uppercase text-xs text-gray-500">IP Address</h4>
              <h1 className="font-bold text-3xl trancate">
                {data.ip.length > 11 ? (
                  <abbr title={data.ip}>{data.ip.slice(0, 10) + "..."}</abbr>
                ) : (
                  data.ip
                )}
              </h1>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center space-y-4">
              <h4 className="uppercase text-xs text-gray-500">Location</h4>
              <h1 className="font-bold text-3xl">
                {data.location.region}, {data.location.country}
              </h1>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center space-y-4">
              <h4 className="uppercase text-xs text-gray-500">Timezone</h4>
              <h1 className="font-bold text-3xl">{data.location.timezone}</h1>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center space-y-4">
              <h4 className="uppercase text-xs text-gray-500">ISP</h4>
              <h1 className="font-bold text-3xl truncate">
                {data.isp.length > 11 ? (
                  <abbr title={data.isp}>{data.isp.slice(0, 12) + "..."}</abbr>
                ) : (
                  data.isp
                )}
              </h1>
            </div>
          </>
        )}
      </div>
      <div className="-z-20 cursor-move">
        <Map lat={lat} lng={lng} placeName={data.location.region} />
      </div>
    </div>
  );
};

export default Header;
