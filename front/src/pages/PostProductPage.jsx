import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";

function PostProductPage() {

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedDate = date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        if (isFormValid()) {
            const formData = new FormData();
            formData.append('image', imageFile); // Append the image file
            // Prepare the data to be sent
            const postData = {
                type: type,
                title: title,
                description: description,
                imageUrl: imageUrl,
                // Conditional properties based on the type
                ...(type === 'donatedItem' && {
                    condition: condition,
                }),
                ...(type === 'lostItem' && {
                    location: location,
                    dateLost: formattedDate,
                }),
                ...(type === 'foundItem' && {
                    location: location,
                    dateLost: formattedDate,
                }),
                ...(type === 'lendItem' && {
                    duration: combinedDuration,
                    condition: condition,
                }),
                ...(type === 'rentedItem' && {
                    condition: condition,
                    duration: combinedDuration,
                    price: price,
                }),
                ...(type === 'secondHandItem' && {
                    price: price,
                    condition: condition,
                }),
            };
            formData.append('item', JSON.stringify(postData));
            try {
                // Send the POST request to the backend server
                const response = await fetch('http://localhost:8080/items', {
                    method: 'POST',
                    body: formData, // Send formData instead of JSON
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log('Form submitted successfully:', responseData);
                // Handle the response data as needed, maybe reset the form or redirect the user
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            alert('Please fill in all required fields with appropriate values.');
        }
        navigate('')
    };

    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl]=useState("");
    const [imageFile, setImageFile] = useState(null);

    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState(0);

    const [durationType, setDurationType] = useState("");
    const [durationNumber, setDurationNumber] = useState("");
    const combinedDuration = `${durationNumber} ${durationType}${durationNumber > 1 ? 's' : ''}`;

    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const currentDate = new Date(); // Current date and time
    // Function to get min and max time for the date picker
    const getMinMaxTime = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return { minTime: new Date(), maxTime: new Date() };
        }

        const minTime = new Date(date);
        minTime.setHours(0, 0, 0, 0);

        const maxTime = new Date();
        if (date.toDateString() === maxTime.toDateString()) {
            // If the selected date is today, max time is the current time
            return { minTime, maxTime };
        } else {
            // If the selected date is not today, max time is the end of the day
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            return { minTime, maxTime: endOfDay };
        }
    };

    const { minTime, maxTime } = getMinMaxTime(date);

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleDurationTypeChange = (event) => {
        setDurationType(event.target.value);
    };

    const handleDurationNumberChange = (event) => {
        setDurationNumber(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (date) => {
        setDate(date); // Updates the state with the selected date
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleProductTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleConditionChange = (event) => {
        setCondition(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // File type validation
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file type');
            return;
        }
        // File size validation (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size exceeds limit');
        }

        const url = URL.createObjectURL(file);
        setImageUrl(url); // For image preview
        setImageFile(file); // Store the file object for form submission
    };

    const durationToDays = (number, type) => {
        const daysInMonth = 30; // Average number of days in a month
        const daysInWeek = 7;
        const daysInYear = 365; // Or 365.25 to account for leap years

        switch (type) {
            case 'day':
                return number;
            case 'week':
                return number * daysInWeek;
            case 'month':
                return number * daysInMonth;
            case 'year':
                return number * daysInYear;
            default:
                return 0;
        }
    };

    const isDurationLessThanTwoYears = () => {
        const durationInDays = durationToDays(parseInt(durationNumber), durationType);
        const twoYearsInDays = 2 * 365; // 730 days
        return durationInDays < twoYearsInDays;
    };

    const isFormValid = () => {

        // First, check for the comment properties of the all types of items, they should not be empty
        if(type === "" || title.trim() === "" || description === "" || imageUrl === "") {
            return false;
        }

        if (type === "lostItem" || type === "foundItem") {
            return(
                location !== "" &&
                date !== ""
            );
        }
        else if (type === "lendItem") {
            return(
                condition !== "" &&
                isDurationLessThanTwoYears()
            );
        }
        else if (type === "secondHandItem") {
            return(
                condition !== "" &&
                price > 0
            );
        }
        else if (type === "donatedItem") {
            return(
                condition !== ""
            );
        }
        else if (type === "rentedItem") {
            return(
                condition !== "" &&
                price > 0 &&
                isDurationLessThanTwoYears()
            );
        }
    };

    return(
        <div>
        <Navbar/>
        <section className="bg-white dark:bg-gray-900 h-auto bg-gradient-to-b from-white to-gray-300">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Post a new product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title (max. 60 characters)</label>
                            <input type="text" name="name" id="name" maxLength={60} value={title} onChange={handleProductTitleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product title" required=""></input>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                            <select id="category" onChange={handleTypeChange} value={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Select type</option>
                                <option value="secondHandItem">Second Hand</option>
                                <option value="donatedItem">Donation</option>
                                <option value="rentedItem">Rental</option>
                                <option value="lendItem">Lend</option>
                                <option value="lostItem">Lost</option>
                                <option value="foundItem">Found</option>
                            </select>
                        </div>
                        <div>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price ('.' for decimal, enter positive values) </label>
                            <input type="number" name="price" id="price" onChange={handlePriceChange} value={price} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="in ₺" required="" disabled={type === 'donatedItem' || type === 'lendItem' || type === 'lostItem' || type === 'foundItem'}></input>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="durationType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration Type</label>
                            <select
                                id="durationType"
                                onChange={handleDurationTypeChange}
                                value={durationType}
                                className="disabled:opacity-25 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                disabled={type === 'lostItem' || type === 'foundItem' || type === 'donatedItem' || type === 'secondHandItem'}
                            >
                                <option value="">Select type</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </select>

                            <label htmlFor="durationNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How many {durationType}s?</label>
                            <input
                                type="number"
                                name="durationNumber"
                                id="durationNumber"
                                onChange={handleDurationNumberChange}
                                value={durationNumber}
                                className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter number"
                                required=""
                                disabled={type === 'lostItem' || type === 'foundItem' || type === 'donatedItem' || type === 'secondHandItem' || durationType === ""}
                            />
                            {durationNumber && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Duration to give away: {combinedDuration}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location (Select the nearest)</label>
                            <select id="location" onChange={handleLocationChange} value={location} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={type === 'lendItem' || type === 'rentedItem' || type === 'donatedItem' || type === 'secondHandItem'}>
                                <option value="">Select location</option>
                                <option value="FA Building">FA Building</option>
                                <option value="FB Building">FB Building</option>
                                <option value="FC Building">FC Building</option>
                                <option value="FF Building">FF Building</option>
                                <option value="MA Building">MA Building</option>
                                <option value="A Building">A Building</option>
                                <option value="H Building">H Building</option>
                                <option value="T Building">T Building</option>
                                <option value="SA Building">SA Building</option>
                                <option value="SB Building">SB Building</option>
                                <option value="G Building">G Building</option>
                                <option value="Main Campus Library">Library</option>
                                <option value="EA Building">EA Building</option>
                                <option value="EB Building">EB Building</option>
                                <option value="EE Building">EE Building</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Condition</label>
                            <select id="condition" onChange={handleConditionChange} value={condition} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={type === 'lostItem' || type === 'foundItem'}>
                                <option value="">Select condition</option>
                                <option value="Like New">Like New</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date and Time</label>
                            <DatePicker className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="DD/MM/YYYY" required="" disabled={type === 'lendItem' || type === 'rentedItem' || type === 'donatedItem' || type === 'secondHandItem'}
                                        selected={date} type="text" name="date" id="date"
                                        onChange={handleDateChange} dateFormat="dd/MM/yyyy h:mm aa"
                                        placeholderText="Select a date and time"
                                        maxDate={currentDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15} // Interval of time options
                                        timeCaption="time"
                                        minTime={minTime}
                                        maxTime={maxTime}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="photo-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Photo</label>
                            <input
                                type="file"
                                id="photo-upload"
                                onChange={handleImageChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            {imageUrl && <img src={imageUrl} alt="Preview" />}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description (max. 160 characters)</label>
                            <textarea id="description" maxLength={160} rows="8" onChange={handleDescriptionChange} value={description} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type your description here"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add product
                    </button>
                </form>
            </div>
        </section>
        </div>
    );
}
export default PostProductPage;