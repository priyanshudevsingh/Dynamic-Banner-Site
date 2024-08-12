import Avatar from "./Avatar";
import sm_logo from "../assets/sm_logo.png";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { useState } from "react";

export default function Appbar() {
    const navigate = useNavigate();
    const { userDataLoading, user } = useUserData();
    const [hover, setHover] = useState(false);

    console.log(userDataLoading);

    return (
        <div className="flex justify-between items-center py-1 pl-2 shadow-2xl">
            <Link to={`/`}>
                <img className="h-16 w-16" src={sm_logo} alt="Small logo" />
            </Link>

            <div className="items-center flex">
                <div className="flex justify-center text-slate-700 text-xl mr-5 cursor-pointer font-bold" onClick={() => { navigate("/") }}>
                    Home
                </div>

                {user ? (
                    <>
                        <div className="flex justify-center text-slate-700 text-xl mr-5 cursor-pointer font-bold" onClick={() => { localStorage.removeItem("token"); window.location.href = "/" }}>
                            Logout
                        </div>

                        <div className="flex justify-center text-slate-700 text-xl mr-5 cursor-pointer font-bold" onClick={() => { navigate("/dashboard") }}>
                            Dashboard
                        </div></>
                ) : (
                    <>
                        <div className="flex justify-center text-slate-700 text-xl mr-5 cursor-pointer font-bold" onClick={() => { navigate("/signin") }}>
                            Signin
                        </div>

                        <div className="flex justify-center text-slate-700 text-xl mr-5 cursor-pointer font-bold" onClick={() => { navigate("/signup") }}>
                            Signup
                        </div>
                    </>
                )}

                {user && (
                    <>
                        <div className="flex mr-5 justify-center relative" onMouseEnter={() => setHover(c => !c)} onMouseLeave={() => setHover(c => !c)}>
                            {user && <div>
                                <Avatar name={user.name} size="big" />
                            </div>
                            }
                        </div>
                        {hover && user && (
                            <div className="absolute top-14 p-3 bg-white border rounded shadow-lg" onMouseEnter={() => setHover(c => !c)} onMouseLeave={() => setHover(c => !c)}>
                                <div className="flex">
                                    <div className="font-bold pr-1">Name:</div>
                                    <div className="text-slate-500">{user.name}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold pr-1">Email: </div>
                                    <div className="text-slate-500">{user.email}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold">AccountID</div>
                                    <div className="text-slate-500">{user.id}</div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}