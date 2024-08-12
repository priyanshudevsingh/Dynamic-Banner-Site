import { useState, useEffect } from "react";
import { BlackButton } from "../components/Button";
import LabelledInput from "../components/LabelledInput";
import Loader from "../components/Loader";
import { BACKEND_URL } from "../config";
import axios from "axios";
import useBannerData from "../hooks/useBannerData";
import { useNavigate } from "react-router-dom";

interface timerProps {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export default function Dashboard() {
    const { bannerDataLoading, banner } = useBannerData();
    const navigate = useNavigate();

    // Initialize timerInputs and postInputs with default values
    const [timerInputs, setTimerInputs] = useState({
        days: "",
        hours: "",
        minutes: "",
        seconds: ""
    });
    const [postInputs, setPostInputs] = useState({
        description: "",
        url: "",
        timer: "",
        id: "",
        visible: false
    });

    useEffect(() => {

    }, [])

    // Update the inputs field with the old banner data
    useEffect(() => {
        if (banner) {
            setPostInputs({
                description: banner.description || "",
                url: banner.url || "",
                timer: banner.timer.toString(),
                id: banner.id || "",
                visible: banner.visible || false
            });

            // Convert the timer in seconds to days, hours, minutes and seconds
            const days = Math.floor(banner.timer / 86400);
            const hours = Math.floor((banner.timer % 86400) / 3600);
            const minutes = Math.floor((banner.timer % 3600) / 60);
            const seconds = banner.timer % 60;

            setTimerInputs({
                days: days.toString(),
                hours: hours.toString(),
                minutes: minutes.toString(),
                seconds: seconds.toString()
            });
        }
    }, [banner]);

    // Convert the timer inputs to seconds
    function convertToSeconds({ days, hours, minutes, seconds }: timerProps) {
        const daysInSeconds = parseInt(days) * 86400 || 0;
        const hoursInSeconds = parseInt(hours) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes) * 60 || 0;
        const secondsInt = parseInt(seconds) || 0;

        return daysInSeconds + hoursInSeconds + minutesInSeconds + secondsInt;
    }

    const [pageLoading, setLoading] = useState(false);

    // Send the updated banner data to the backend
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
            navigate("/")
        } catch (e) {
            setLoading(false);
            alert("Error updating banner");
            console.log(e);
        }
    }

    if (pageLoading || bannerDataLoading) {
        return (<Loader />);
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
                            <LabelledInput
                                label="Description"
                                type="text"
                                placeholder="Enter Description"
                                value={postInputs.description}
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        description: e.target.value
                                    });
                                }}
                            />

                            <LabelledInput
                                label="Url"
                                type="text"
                                placeholder="Enter Url"
                                value={postInputs.url}
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        url: e.target.value
                                    });
                                }}
                            />

                            <div className="mt-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={postInputs.visible}
                                        onChange={(e) => {
                                            setPostInputs({
                                                ...postInputs,
                                                visible: e.target.checked
                                            });
                                        }}
                                    />
                                    <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${postInputs.visible ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                        <div className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-300 ${postInputs.visible ? 'translate-x-full' : 'translate-x-0'}`} />
                                    </div>
                                    <span className="ms-3 text-md font-bold text-gray-900">Change Banner Visibility</span>
                                </label>
                            </div>

                            <div className="mt-2 text-md font-bold text-gray-900">Timer in</div>

                            <div className="grid grid-cols-4">
                                <LabelledInput
                                    label="Days"
                                    type="text"
                                    placeholder="Enter Days"
                                    value={timerInputs.days}
                                    onChange={(e) => {
                                        setTimerInputs({
                                            ...timerInputs,
                                            days: e.target.value
                                        });
                                    }}
                                />
                                <LabelledInput
                                    label="Hours"
                                    type="text"
                                    placeholder="Enter Hours"
                                    value={timerInputs.hours}
                                    onChange={(e) => {
                                        setTimerInputs({
                                            ...timerInputs,
                                            hours: e.target.value
                                        });
                                    }}
                                />
                                <LabelledInput
                                    label="Minutes"
                                    type="text"
                                    placeholder="Enter Minutes"
                                    value={timerInputs.minutes}
                                    onChange={(e) => {
                                        setTimerInputs({
                                            ...timerInputs,
                                            minutes: e.target.value
                                        });
                                    }}
                                />
                                <LabelledInput
                                    label="Seconds"
                                    type="text"
                                    placeholder="Enter Seconds"
                                    value={timerInputs.seconds}
                                    onChange={(e) => {
                                        setTimerInputs({
                                            ...timerInputs,
                                            seconds: e.target.value
                                        });
                                    }}
                                />
                            </div>

                            <BlackButton type="Update" reqFunction={sendRequest} />
                            <div className="text-right text-slate-700 font-serif mt-2">
                                Last Updated At: {new Date(banner?.updatedAt ?? "").toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
