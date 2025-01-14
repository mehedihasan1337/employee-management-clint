import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../assets/banner-1.jpg"
import img2 from "../assets/banner2.jpg"
import img3 from "../assets/banner3.jpg"

const Banner = () => {
    return (
        <Carousel>
                <div>
                    <img className="lg:h-[450px] md:h-[300px] h-[270px]  object-cover" src={img1} />
                   
                </div>
                <div>
                    <img className="lg:h-[450px] md:h-[300px] h-[270px]  object-cover" src={img2} />
              
                </div>
                <div>
                    <img className="lg:h-[450px] md:h-[300px] h-[270px]  object-cover" src={img3}/>
                   
                </div>
            </Carousel>
    );
};

export default Banner;