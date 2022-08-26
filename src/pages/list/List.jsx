import React, { useState } from "react";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import "./list.css"
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { base_URL } from "../../constants/constants";
import { ThreeDots } from 'react-loader-spinner'

const List = () => {
    const location = useLocation();

    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
    const [propertyType, setPropertyType] = useState(location.state.propertyType);
    const [showSearch, setShowSearch] = useState(location.state.showSearch);
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, error, reFetch } = useFetch(base_URL + (destination !== "" ?
        `/hotels?city=${destination}&min=${min || 0}&max=${max || 9990}` : `/hotels/getProperties/${propertyType}`)
    );

    const handleClick = () => {
        setOpenDate(false);
        reFetch();
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    {showSearch && <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text" onChange={e => setDestination(e.target.value)} />
                        </div>
                        <div className="lsItem">
                            <label>Check-In Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(
                                dates[0].startDate,
                                "MM/dd/yyyy"
                            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate &&
                                <DateRange
                                    onChange={(item) => setDates([item.selection])} m
                                    inDate={new Date()} ranges={dates} />}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="optionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={(e) => { setMin(e.target.value) }} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="optionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={(e) => { setMax(e.target.value) }} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="optionText">
                                        Adult
                                    </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="optionText">
                                        Children
                                    </span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="optionText">
                                        Room
                                    </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                                </div>
                            </div>
                            <button className="listSearchbtn" onClick={handleClick}>Search</button>
                        </div>
                    </div>}
                    <div className="listResult">
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
                            {data.map(item => (
                                <SearchItem item={item} key={item._id} />
                            ))}</>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;