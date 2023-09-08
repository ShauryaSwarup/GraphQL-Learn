import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            age
            username
            nationality
            friends {
                name
                nationality
                age
            }
        }
    }
`;
const GET_MOVIE_BY_NAME = gql`
    query GetMovie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
            isInTheaters
        }
    }`
const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        name
        username
        age
      }
    }`

const DisplayData = () => {
    //Create User
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [createUser, { loading: createUserLoading, error: createUserError, data: createUserData }] = useMutation(CREATE_USER);

    //Movie Form Name
    const [movie,setMovie] = useState("");

    //Query Users
    const {loading:usersLoading, error:usersError, data:usersData, refetch } = useQuery(GET_ALL_USERS);

    //Query Movies on Search
    const [getMovie, { loading: movieLoading, error: movieError, data: movieData }] = useLazyQuery(GET_MOVIE_BY_NAME);

    return (
        <>
        <div>
            {usersLoading && <p>Loading...</p>}
            {usersError && <p>Error</p>}
            {usersData && <div>{JSON.stringify(usersData)}</div>}
        </div>
        <br/>
        <div>
            <input placeholder="Enter Movie Name" onChange={(event)=>{
                setMovie(event.target.value)
            }}/>
            <button onClick={() => getMovie({ variables: { name: movie } })}>Get Movie</button>
            {movieLoading && <p>Loading...</p>}
            {movieError && <p>Error</p>}
            {movieData && <div>{JSON.stringify(movieData)}</div>}
        </div>
        <br/>
        <input placeholder="Name" onChange={(event)=>{setName(event.target.value)}}/>
        <input placeholder="Username" onChange={(event)=>{setUsername(event.target.value)}}/>
        <input placeholder="Age" onChange={(event)=>{setAge(Number(event.target.value))}}/>
        <button onClick={() => createUser({ variables: { input: { name, username, age } } })}>Create User</button>
        {createUserLoading && <p>Loading...</p>}
        {createUserError && <p>Error</p>}
        {createUserData && <div>{JSON.stringify(createUserData)}</div>}
        </>
    );
    
};

export default DisplayData;
