const url = "https://api.github.com/users";
const username = process.argv[2];

async function getUserActivity(username) {
  let json;

  try {
    if (!username) {
      help();
      throw new Error("Invalid command");
    }
    const response = await fetch(url + `/${username}/events`);
    if (!response.ok) {
      throw new Error("Response status: " + response.status);
    }
    json = await response.json();
    commitSummary(json);
  } catch (error) {
    console.error(error.message);
  }
}

function help() {
  console.log("Github-User-Activity Command\n\tindex.js username");
}

function commitSummary(json) {
  const commits = {};
  for (let key of json) {
    if (!(key.repo.name in commits) && key.type === "PushEvent") {
      commits[key.repo.name] = 1;
    } else if (key.repo.name in commits && key.type === "PushEvent") {
      commits[key.repo.name]++;
      console.log(`Pushed ${key.payload.commits.length} commit in ${key.repo.name}`);
    } else if (key.repo.name in commits && key.type === "CreateEvent") {
      console.log(`Created repository ${key.repo.name}`);
    } else if (key.type === "WatchEvent") {
      console.log(`Starred ${key.repo.name}`);
    } else if (key.type === "IssueEvent") {
      console.log(`Created issue in ${key.repo.name}`);
    } else if (key.type === "ForkEvent") {
      console.log(`Forked ${key.repo.name}`);
    } else {
      throw new Error("Unknown error occured.");
    }
  }

  for (let key in commits) {
    console.log(`-  ${commits[key]} commits in ${key}`);
  }
}


if (require.main === module) {
  try {
    getUserActivity(username);
  } catch (error) {
    console.error(error.message);
  }
}
