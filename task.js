const data = require("./data.json");

const filterDeactivatedUsers = (response) => {
    try {
        if (response.status === 200) {
            const users = response.users;
            const deactivatedUsers = users.filter((user) => {
                return user.isActive === false;
            });
            return deactivatedUsers;
        } else {
            throw new Error("Fetch Failed");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getUserFirstAndLastNameAppended = (users) => {
    try {
        const usersFirstAndLastNameAppendedResult = users.map((user) =>
            user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
        );

        return usersFirstAndLastNameAppendedResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getCountOfUsersAfterGivenDate = (response, param) => {
    try {
        if (response.status === 200) {
            const users = response.users;
            const userCountOnGivenDate = users.filter((user) => {
                if (param.role === user.role && param.date < user.registeredAt) return user;
            });
            return userCountOnGivenDate.length;
        } else {
            throw new Error("Fetch Failed");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//This is not being invoked please uncomment line 59
const sortUsersByDate = (obj) => {
    if (obj === "asc") {
        return users.slice().sort((a, b) => a.registeredAt - b.registeredAt);
    } else if (obj === "dsc") {
        return users.slice().sort((a, b) => b.registeredAt - a.registeredAt);
    }
};

// console.log(sortUsersByDate(data.users));

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
