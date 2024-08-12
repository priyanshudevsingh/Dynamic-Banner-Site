import { useState } from "react";
import { BlackButton } from "../components/Button";
import LabelledInput from "../components/LabelledInput";
import Loader from "../components/Loader";
import { BACKEND_URL } from "../config";
import axios from "axios";
import useBannerData from "../hooks/useBannerData";

interface timerProps {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export default function Dashboard() {
    const { loading, banner } = useBannerData();

    const [timerInputs, setTimerInputs] = useState({
        days: "",
        hours: "",
        minutes: "",
        seconds: ""
    })
    const [postInputs, setPostInputs] = useState({
        description: "",
        url: "",
        timer: "",
        id: "",
        visible:""
    })

    function convertToSeconds({ days, hours, minutes, seconds }: timerProps) {
        const daysInSeconds = parseInt(days) * 86400 || 0;
        const hoursInSeconds = parseInt(hours) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes) * 60 || 0;
        const secondsInt = parseInt(seconds) || 0;

        return daysInSeconds + hoursInSeconds + minutesInSeconds + secondsInt;
    }

    const [pageLoading, setLoading] = useState(false);

    async function sendRequest() {
        try {
            setLoading(true);

            const totalSeconds = convertToSeconds(timerInputs);
            const updatedPostInputs = {
                ...postInputs,
                timer: totalSeconds,
                id: banner?.id
            };

            await axios.put(`${BACKEND_URL}/api/v1/banner/update`, updatedPostInputs, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });

            setLoading(false);
            window.location.href = "/";
        } catch (e) {
            setLoading(false);
            alert("Error signing in")
            console.log(e);
        }
    }

    if (pageLoading || loading) {
        return (<Loader />)
    }

    return (
        <div>
            <div className="h-screen flex justify-center pt-10">
                <div className="flex justify-center">
                    <div>
                        <div className="text-4xl font-extrabold px-36 flex justify-center">
                            Edit Banner
                        </div>

                        <div className="pt-3">
                            <LabelledInput label="Description" type="text" placeholder="Enter Description" onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    description: e.target.value
                                })
                            }} />

                            <LabelledInput label="Url" type="text" placeholder="Enter Url" onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    url: e.target.value
                                })
                            }} />

                            <div className="mt-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-md font-bold text-gray-900">Change Banner Visibility</span>
                                </label>
                            </div>

                            <div className="mt-2 text-md font-bold text-gray-900">Timer in</div>

                            <div className="grid grid-cols-4">
                                <LabelledInput label="Days" type="text" placeholder="Enter Days" onChange={(e) => {
                                    setTimerInputs({
                                        ...timerInputs,
                                        days: e.target.value
                                    })
                                }} />
                                <LabelledInput label="Hours" type="text" placeholder="Enter Hours" onChange={(e) => {
                                    setTimerInputs({
                                        ...timerInputs,
                                        hours: e.target.value
                                    })
                                }} />
                                <LabelledInput label="Minutes" type="text" placeholder="Enter Minutes" onChange={(e) => {
                                    setTimerInputs({
                                        ...timerInputs,
                                        minutes: e.target.value
                                    })
                                }} />
                                <LabelledInput label="Seconds" type="text" placeholder="Enter Seconds" onChange={(e) => {
                                    setTimerInputs({
                                        ...timerInputs,
                                        seconds: e.target.value
                                    })
                                }} />
                            </div>

                            <BlackButton type="Update" reqFunction={sendRequest} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}