import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";

function Home() {
  const location = useLocation();
  const { userName } = location.state;

  const [name, setName] = useState("User Name");
  const [bio, setBio] = useState("Bio");
  const [githubLink, setGithubLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [repoDetails, setRepoDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getDetails = async (username) => {
    await axios
      .get(`/api/github/displayGet/${username}?page=${currentPage}`)
      .then((res) => {
        const { userDetails, repos } = res.data;

        setName(userDetails.github_username);
        setBio(userDetails.bio);
        setGithubLink(userDetails.link);
        setImageUrl(userDetails.avatar_url);
        setRepoDetails(repos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDetails(userName);
  }, [userName, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <div className="user-details">
        <div className="flex mt-[8%] mb-[4%] ml-[200px]">
          <img src={imageUrl} className="rounded-full h-20"></img>

          <div className="ml-[3%] w-[42%]">
            <p>
              <b>UserName :</b> {name}
            </p>
            <p>
              <b>Bio : </b> {bio}
            </p>
            <p>
              <b>Github Profile :</b>{" "}
              <a href={githubLink} className="text-[#68D2E8]">
                {githubLink}
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-start repos-details border-2 w-[80%] p-6 ml-[140px] bg-[#FFF2D7]">
          {repoDetails.map((repo) => {
            return (
              <div
                key={repo.github_username + repo.repo_name}
                className="repo border-2 w-1/5 h-[150px] m-3 p-2 bg-[#FFE0B5]"
              >
                <p>
                  <b>Repo name :</b>{" "}
                  <a href={repo.repo_url} className="text-[#B51B75]">
                    {repo.repo_name}
                  </a>
                </p>
                <p>
                  <b>Description : </b>
                  {repo.repo_description}
                </p>
              </div>
            );
          })}

          {/* <div className="repo border-4 w-[30%] h-[100px]">
            <p>Repo Name</p>
            <p>Repo Description</p>
          </div> */}
        </div>

        <div className="ml-[45%]">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="mr-[5%] mt-[3%] text-[#640D6B]"
          >
            <MdSkipPrevious className="text-4xl" />
          </button>
          <button onClick={handleNextPage} className="text-[#640D6B]">
            <MdSkipNext className="text-4xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
