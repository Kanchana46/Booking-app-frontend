import "./searchItem.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const SearchItem = ({ item }) => {
    const navigate = useNavigate();
    const { dates, dispatch } = useContext(SearchContext);

    const handleClick = () => {
        navigate(`/hotels/${item._id}`, {
            state: {
                showReserve: true
            }
        });
        if (dates.length === 0) {
            dispatch({
                type: "NEW_SEARCH", payload: {
                    destination: item.city,
                    dates: [{ endDate: new Date(), startDate: new Date() }],
                    options: { adult: 1, children: 0, room: 1 }
                }
            });
        }
    }
    return (
        <div className="searchItem">
            <img
                src={item.image}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air Conditioning
                </span>
                <span className="siFeatures">
                    {item.desc}
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <button className="siCheckButton" onClick={handleClick}>See availability</button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem;