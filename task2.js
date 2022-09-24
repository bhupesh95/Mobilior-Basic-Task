const data = require("./data.json");
const { filterDeactivatedUsers,getUserFirstAndLastNameAppended,getCountOfUsersAfterGivenDate } = require("./task1.js");

const getUsers = () => {
    return new Promise((resolve, reject) => {
        if (data) {
            const response = { message: "Success", status: 200, users: data.users };
            return resolve(response);
        } else {
            const response = { message: "Error Fetching Users", status: 400 };
            reject(response);
        }
    });
};

getUsers()
    .then(filterDeactivatedUsers)
    .then(getUserFirstAndLastNameAppended)
    .then((users) => console.log(users))
    .catch((error) => console.log(error));

const param = {
    role: "student",
    date: 1512155600000,
};

getUsers()
    .then((response) => {
        const usersCount = getCountOfUsersAfterGivenDate(response, param);
        return usersCount;
    })
    .then((count) => console.log("count of users", count))
    .catch((error) => console.log(error));