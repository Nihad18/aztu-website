import React, { useState, useContext } from "react";
import { Context } from "../Context";
import axios from "axios";
const Login = () => {
  const { setToken } = useContext(Context);
  const [data, setData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, SetSuccess] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://armud.az/api/token/", data)
      .then((res) => {
        setIsLoading(false);
        setData({ username: "", password: "" });
        if (res.status === 200) {
          SetSuccess(true);
          sessionStorage.setItem("token", res.data.access);
          setToken(sessionStorage.getItem("token"));
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  };
  console.log("loading", isLoading);
  return (
    <div>
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Daxil ol
              </h1>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={data.username}
                  onChange={handleChange}
                  className='outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 '
                  placeholder='username'
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={data.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5'
                />
              </div>
              {error && (
                <div
                  className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50'
                  role='alert'
                >
                  <div className='font-medium'>Hesaba daxil ola bilmədiniz!</div>
                  <div>Username və ya password yanlışdır!</div>
                </div>
              )}
              {success && (
                <div
                  className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50'
                  role='alert'
                >
                  <span className='font-medium'>Hesaba uğurla daxil oldunuz!</span>
                </div>
              )}
              <button
                onClick={handleClick}
                disabled={data.username == "" || data.password == ""}
                type='submit'
                className='disabled:cursor-not-allowed disabled:bg-sky-400 w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
              >
                {isLoading ? (
                  <div className='lds-ellipsis'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  " Daxil ol"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
