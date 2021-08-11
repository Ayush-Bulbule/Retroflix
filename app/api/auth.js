import client from './client'

const login = (email, password) => {
    const data = new FormData();
    data.append("email", email)
    data.append("password", password)
    const res = client.post("/userLogin", data)
    console.log(res.data)
    return res;
}

const register = (name, email, password) => {
    const data = new FormData();

    data.append("email", email);
    data.append("name", name);
    data.append("password", password)
    const res = client.post("/userSignup", data)
    return res;

}
export default {
    login,
    register
}