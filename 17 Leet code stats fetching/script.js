document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("user_input");
  const searchButton = document.getElementById("search_btn");
  const statsContainer = document.querySelector(".stats_container");
  const easyProgressCircle = document.querySelector(".easy_progress");
  const mediumProgressCircle = document.querySelector(".medium_progress");
  const hardProgressCircle = document.querySelector(".hard_progress");
  const easyLabel = document.getElementById("easy_label");
  const medium_label = document.getElementById("medium_label");
  const hard_label = document.getElementById("hard_label");
  const cardStatsContainer = document.querySelector(".stats_card");

  //Return true or false based on a regexx
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username should not be empty");

      return false;
    }

    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid Username");
    }
    return isMatching;
  }
  function updateProgress(solved, totalSolved, label, circle) {
    const percentage = (solved / totalSolved) * 100;
    circle.style.setProperty("--progress_degree", `${percentage}%`);

    label.textContent = `${solved}/${totalSolved}${label.textContent}`;
  }

  function displayUserData(data) {
    console.log(data);
    const totalSolved = data.totalSolved;
    const totalQuestions = data.totalQuestions;
    const easySolved = data.easySolved;
    const totalEasy = data.totalEasy;
    const mediumSolved = data.mediumSolved;
    const totalMedium = data.totalMedium;
    const hardSolved = data.hardSolved;
    const totalHard = data.totalHard;

    updateProgress(easySolved, totalEasy, easyLabel, easyProgressCircle);
    updateProgress(
      mediumSolved,
      totalMedium,
      medium_label,
      mediumProgressCircle
    );
    updateProgress(hardSolved, totalHard, hard_label, hardProgressCircle);
  }
  // cpcs
  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;
      console.log(statsContainer.classList);

      console.log(statsContainer.classList.toggle("hide"));
      console.log(statsContainer.classList);

      //   stats_container.classList.add("hiddessn");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch the User details");
      }

      const data = await response.json();
      if (data.status === "error") {
        throw new Error(data.message);
      }
      displayUserData(data);
    } catch (error) {
      statsContainer.innerHTML = `<p>${error} </p>`;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  searchButton.addEventListener("click", () => {
    const username = usernameInput.value;
    if (validateUsername(username));
    {
      fetchUserDetails(username);
    }
  });
});
