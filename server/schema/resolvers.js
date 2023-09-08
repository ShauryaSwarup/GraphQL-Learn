const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        },
        movies: () => {
            return MovieList;
        },
        movie: (parent,args) => {
            const name = args.name;
            const movie = _.find(MovieList, { name: name });
            return movie;
        },
    },
    User: {
        favouriteMovies: () => {
            return _.filter(MovieList, { isInTheaters: true });
        }
    },
    Mutation: {
        createUser: (parent,args) => {
            const user = args.input;
            user.id=UserList[UserList.length-1].id+1;
            UserList.push(user);
            return user;
        },
        updateUsername: (parent,args) => {
            const {id,username} = args.input;
            const user = _.find(UserList, { id: Number(id) });
            user.username = username;
            return user;
        },
        deleteUser: (parent,args) => {
            const {id} = args.input;
            const user = _.find(UserList, { id: Number(id) });
            _.remove(UserList, { id: Number(id) });
            return user;
        }
    }
};

module.exports = { resolvers };
