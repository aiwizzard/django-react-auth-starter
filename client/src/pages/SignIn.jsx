import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());
    await axios({
      url: "http://127.0.0.1:8000/api/v1/core/login/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
    })
      .then((res) => {
        dispatch(signInSuccess(res.data.data));
        navigate("/");
      })
      .catch((error) => dispatch(signInFailure(error)));
  };
  return (
    <div className="flex flex-row h-screen">
      <img className="hidden md:flex" src="/image-2.png" alt="" />
      <div className="p-3 w-[30rem] max-w-xl mx-auto my-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="User Id"
            id="username"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont Have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}
