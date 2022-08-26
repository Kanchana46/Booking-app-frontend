import React, { useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { base_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'

const Featured = () => {

    const { data, loading, error } = useFetch(base_URL + "/hotels/countByCity?cities=berlin,madrid,austin");

    const navigate = useNavigate();

    return (
        <div className="featured">
            {loading ? <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            /> : <>
                {data.slice(0, 4).map(item => (
                    <div className="featuredItem" key={item._id} onClick={() => {
                        navigate("/hotels", {
                            state:
                            {
                                destination: item._id,
                                dates: [{ endDate: new Date(), startDate: new Date() }],
                                options: { adult: 1, children: 0, room: 1 },
                                showSearch: false,
                                propertyType: ""
                            }
                        });
                    }}>
                        <img
                            src={item.image}
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>{item._id}</h1>
                            <h2>{item.count} properties</h2>
                        </div>
                    </div>
                ))}
            </>}
        </div>

    )
}

export default Featured;