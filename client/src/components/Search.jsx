import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSearch = async () => {
    // console.log(userName);

    await axios
      .get(`/api/github/getUserDetails/${userName}`)
      .then(() => {
        navigate("/userPage", { state: { userName: userName } });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="ml-[35%] mt-[20%]">
        <input
          className="hover:border-[#FDDE55] border-[1px] border-[#68D2E8] w-[30%] rounded p-1"
          type="text"
          placeholder="Github User name"
          onChange={handleChange}
        ></input>
        <button
          className="hover:bg-[#03AED2] bg-[#68D2E8] text-white rounded p-1 ml-[2%]"
          onClick={handleSearch}
        >
          Get Deatils
        </button>
      </div>
    </div>
  );
}

export default Search;
