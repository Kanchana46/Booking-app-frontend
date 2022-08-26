import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./featuredProperties.css";
import { base_URL } from "../../constants/constants";
import { SearchContext } from "../../context/SearchContext";
import { ThreeDots } from 'react-loader-spinner'

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch(base_URL + "/hotels?featured=true&limit=4");
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);

    return (
        <div className="fp">
            {loading ? <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            /> :
                <> {data.map((item, i) => (
                    <div className="fpItem" key={item._id} onClick={() => {
                        navigate(`/hotels/${item._id}`, {
                            state: {
                                showReserve: false
                            }
                        });
                        dispatch({
                            type: "NEW_SEARCH", payload: {
                                destination: item.city,
                                dates: [{ endDate: new Date(), startDate: new Date() }],
                                options: { adult: 1, children: 0, room: 1 }
                            }
                        });
                    }}>
                        <img
                            src={item.image}
                            alt=""
                            className="fpImg"
                        />
                        <span className="fpName">{item.name}</span>
                        <span className="fpCity">{item.city}</span>
                        <span className="fpPrice">${item.cheapestPrice}</span>
                        {item.rating && <div className="fpRating">
                            <button>{item.name}</button>
                            <span>{item.name}</span>
                        </div>}

                    </div>
                ))}
                </>}
        </div>
    )
}

export default FeaturedProperties;