import { useEffect, useState } from 'react';
import useBannerData from '../hooks/useBannerData';
import Loader from './Loader';

export default function Banner(){
    const [countdown, setCountdown] = useState(0);
    const { loading, banner } = useBannerData();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    if (loading) {
        return (<Loader />)
    }

    return (
        <div className='text-center text-md font-bold text-gray-900'>
            <div>{banner?.description}</div>
            <div>{banner?.url}</div>
            <div>Offer Remains till {banner?.timer}</div>
        </div>
    );
};