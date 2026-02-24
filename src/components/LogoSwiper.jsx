import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from 'swiper/modules';


export default function LogoSwiper() {
    const logos = [
    {
        "agency": "臺北市立動物園",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770311598297.png",
        "agencyUrl":"https://www.zoo.gov.taipei/"
    },

    {
        "agency": "野灣 wildone",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770311719290.png",
        "agencyUrl":"https://www.wildonetaiwan.org/?gad_source=1&gad_campaignid=22539322536&gbraid=0AAAAA_LCx8VjQWGjzZYS0bSl9xy-JJGMG&gclid=Cj0KCQiA7-rMBhCFARIsAKnLKtCx1WANbDhshk1NB5vq6CYXiMANs9Aq1n8ioomspHEQLf0Yk7w3sWIaAma7EALw_wcB"
    },

    {
        "agency": "社團法人台北市野鳥學會",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770311801210.png",
        "agencyUrl":"https://www.birdtaiwan.com/"
    },

    {
        "agency": "台灣黑熊保育協會",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312089491.png",
        "agencyUrl":"https://www.taiwanbear.org.tw/"
    },

    {
        "agency": "台灣石虎保育協會",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312147794.png",
        "agencyUrl":"https://www.twlcat.org/"
    },

    {
        "agency": "國際北極熊協會",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312252052.png",
        "agencyUrl":"https://polarbearsinternational.org/"
    },

    {
        "agency": "西摩海洋探索中心",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312270797.png",
        "agencyUrl":"https://seymourcenter.ucsc.edu/"
    },

    {
        "agency": "海龜保護協會",
        "logo": "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312287055.png",
        "agencyUrl":"https://conserveturtles.org/"
    },

    {/*
        "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770311598297.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770311719290.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770311801210.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312089491.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312147794.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312252052.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312270797.png",
    "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770312287055.png", 
    */}
    
    ];

    const allLogos = [...logos, ...logos];

    return (
    <>
    <Swiper
        slidesPerView={6}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        speed={3500}
        loopedSlides={allLogos.length}
        autoplay={{
            delay: 0,
            disableOnInteraction: false,
        }}
        
        modules={[Autoplay]}
        className="logos">
        

        <SwiperSlide className="logo-swiper">
            <a href={logos[0].agencyUrl}>
            <img src={logos[0].logo} alt={logos[0].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[1].agencyUrl}>
            <img src={logos[1].logo} alt={logos[1].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[2].agencyUrl}>
            <img src={logos[2].logo} alt={logos[2].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[3].agencyUrl}>
            <img src={logos[3].logo} alt={logos[3].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[4].agencyUrl}>
            <img src={logos[4].logo} alt={logos[4].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[5].agencyUrl}>
            <img src={logos[5].logo} alt={logos[5].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[6].agencyUrl}>
            <img src={logos[6].logo} alt={logos[6].agency} /></a>
        </SwiperSlide>
        <SwiperSlide className="logo-swiper">
            <a href={logos[7].agencyUrl}>
            <img src={logos[7].logo} alt={logos[7].agency} /></a>
        </SwiperSlide>


    </Swiper>
    </>
    );
}