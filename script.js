let usersData = {};
let allUsernames = [];

function handleLogin() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  if (!usersData[username]) {
    usersData[username] = {
      loginCount: 0,
      lastLogin: null,
      previousLogins: [],
    };
    allUsernames.push(username);
  }

  usersData[username].loginCount++;
  usersData[username].lastLogin = new Date();
  usersData[username].previousLogins.push({
    timestamp: usersData[username].lastLogin,
  });

  document.getElementById("loggedInUser").textContent = username;
  document.getElementById("loginCount").textContent =
    usersData[username].loginCount;
  document.getElementById("lastLogin").textContent =
    usersData[username].lastLogin.toLocaleString();

  document.getElementById("login-page").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  updatePreviousLoginsList(username);

  updateAllUsernamesList();
}

function handleLogout() {
  document.getElementById("login-page").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function updatePreviousLoginsList() {
  const previousLoginsList = document.getElementById("previousLogins");
  previousLoginsList.innerHTML = "";

  let allLogins = [];

  for (const username in usersData) {
    if (usersData.hasOwnProperty(username)) {
      allLogins = allLogins.concat(
        usersData[username].previousLogins.map((login) => {
          return {
            username,
            timestamp: login.timestamp,
          };
        })
      );
    }
  }

  allLogins.sort((a, b) => b.timestamp - a.timestamp);

  allLogins.forEach((login) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${login.username} Ultimo accesso ${new Date(
      login.timestamp
    ).toLocaleString()}`;
    previousLoginsList.appendChild(listItem);
  });
}

function updateAllUsernamesList() {
  const allUsernamesList = document.getElementById("allUsernames");
  allUsernamesList.innerHTML = "";

  allUsernames.forEach((username) => {
    const listItem = document.createElement("li");
    const userLoginCount = usersData[username].loginCount;
    listItem.textContent = `${username} - ${userLoginCount} accessi`;
    allUsernamesList.appendChild(listItem);
  });
}

document.getElementById("loginButton").addEventListener("click", handleLogin);
document.getElementById("logoutButton").addEventListener("click", handleLogout);
