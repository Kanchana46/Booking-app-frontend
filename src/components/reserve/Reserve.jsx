import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { base_URL } from "../../constants/constants";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(base_URL + `/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();

    const getDatesInRange = (startDate, endDate) => {
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dateArray.push(new Date(currentDate).getTime());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    }

    const allDays = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNo) => {
        const isFound = roomNo.unavailableDates.some(date => allDays.includes(new Date(date).getTime()));
        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item != value));
    }

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map(roomId => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDays
                    });
                    return res.data
                })
            )
        } catch (error) {
        }
        setOpen(false);
        navigate("/");
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => { setOpen(false) }} />
                <span>Select your Rooms:</span>
                {data.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map(roomNo => (
                                <div className="room" key={roomNo.number}>
                                    <label>{roomNo.number}</label>
                                    <input type="checkbox" value={roomNo._id} onChange={handleSelect} disabled={!isAvailable(roomNo)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="rButton" onClick={handleClick}>Reserve Now</button>
            </div >
        </div>
    )
}

export default Reserve;