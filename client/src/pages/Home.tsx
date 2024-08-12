import logo from '../assets/logo.png';
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import useBannerData from '../hooks/useBannerData';

export default function Home() {
    const { bannerDataLoading, banner } = useBannerData();

    if (bannerDataLoading) {
        return <Loader />;
    }
    return (
        <div>
            {banner && banner.visible && <Banner />}
            <div className="flex justify-center flex-col items-center mt-10">
                <div>
                    <img className="h-96" src={logo} alt="Logo" />
                </div>

                <div className="text-4xl font-bold mt-28">15th August</div>
                <div className="text-lg mt-2">Satyamev Jayate</div>
            </div>
        </div>
    );
}