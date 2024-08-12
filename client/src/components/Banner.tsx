import { useEffect, useState } from 'react';
import useBannerData from '../hooks/useBannerData';
import Loader from './Loader';

export default function Banner() {
    const [countdown, setCountdown] = useState(0);
    const { bannerDataLoading, banner } = useBannerData();

    // Calculate the remaining time for the banner to expire
    useEffect(() => {
        if (banner?.timer && banner?.updatedAt) {
            const updatedAt = new Date(banner.updatedAt).getTime();
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - updatedAt) / 1000);
            const remainingTime = Math.max(banner.timer - elapsedTime, 0);

            setCountdown(remainingTime);
        }
    }, [banner]);

    // Update the countdown every second
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [countdown]);

    // Format the countdown time
    const formatCountdown = (seconds: number) => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = Math.floor(seconds % 60);

        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    if (bannerDataLoading) {
        return <Loader />;
    }

    return (
        <div className='text-center text-md font-bold text-gray-900 bg-gray-100 bg-opacity-50 pt-4 px-2 rounded-lg'>
            <div>{banner?.description}</div>
            <div>
                <a href={banner?.url} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
                    {banner?.url}
                </a>
            </div>
            <div className='mt-4'>
                <span className='text-xl'>Offer Ends in: </span>
                <span className='text-2xl text-red-600'>{formatCountdown(countdown)}</span>
            </div>
            <div className='text-right text-sm font-thin'>
                * signin/signup to change details
            </div>
        </div>
    );
}
