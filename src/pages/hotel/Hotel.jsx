import React, { useContext, useState } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { base_URL } from "../../constants/constants";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showReserve, setShowReserve] = useState(location?.state?.showReserve);

    const { data, loading, error } = useFetch(base_URL + `/hotels/find/${id}`);
    let { dates, options } = useContext(SearchContext);
    if (dates.length === 0) {
        const state = JSON.parse(localStorage.getItem('state'));
        if (state) {
            dates = state.dates.map(date => ({
                startDate: new Date(date.startDate),
                endDate: new Date(date.endDate)
            }));
        } else {
            dates = [{ endDate: new Date(), startDate: new Date() }]
        }
    }
    if (!options.adult || !options.children || !options.room) {
        const state = JSON.parse(localStorage.getItem('state'));
        if (state) {
            options.room = state.options.room;
        }
    }

    const user = useContext(AuthContext);
    const navigate = useNavigate();

    const MILIS_PER_DAY = 1000 * 60 * 60 * 24;

    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDates = Math.ceil(timeDiff / MILIS_PER_DAY);
        return diffDates;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    }

    const handleMove = (direction) => {
        let newSlideNo;
        if (direction === "l") {
            newSlideNo = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNo = slideNumber === 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNo);
    }

    const handleClick = () => {
        if (user.user) {
            setOpenModal(true);
        } else {
            navigate("/");
        }
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? "" : (<div className="hotelContainer">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="close"
                            onClick={() => setOpen(false)}
                        />
                        <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className="arrow"
                            onClick={() => handleMove("l")}
                        />
                        <div className="sliderWrapper">
                            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                        </div>
                        <FontAwesomeIcon
                            icon={faCircleArrowRight}
                            className="arrow"
                            onClick={() => { handleMove("r") }}
                        />
                    </div>
                )}
                <div className="hotelWrapper">
                    {showReserve && <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>}
                    <h1 className="hotelTitle"> {data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location – {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotelImages">
                        {data.photos?.map((photo, i) => (
                            <div className="hotelImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={photo}
                                    alt=""
                                    className="hotelImg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">
                                {data.desc}
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an
                                excellent location score of 9.8!
                            </span>
                            {showReserve && <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                            </h2>}
                            {showReserve && <button onClick={handleClick}>Reserve or Book Now!</button>}
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>)}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel;