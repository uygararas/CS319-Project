import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/Navbar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import apiService from '../services/apiService';
import Footer from "../components/Footer.jsx";

function UpdateProductPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isDataLoaded, setIsDataLoaded] = useState(false); // New state to track if data is loaded

    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl]=useState("");
    const [imageFile, setImageFile] = useState(null);

    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState(0);

    const[duration, setDuration] = useState("");
    const [durationType, setDurationType] = useState("");
    const [durationNumber, setDurationNumber] = useState("");
    const combinedDuration = `${durationNumber} ${durationType}${durationNumber > 1 ? 's' : ''}`;

    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await apiService.get(`/items/${itemId}`);
                const productData = response.data;
                console.log(productData);
                // Set initial values for form fields
                setType(productData.category);
                setTitle(productData.title);
                setDescription(productData.description);
                setImageUrl(productData.imageUrl);

                if(type === "lendItem") {
                    setDuration(productData.duration);
                    setCondition(productData.condition);
                }
                else if (type === "secondHandItem") {
                    setPrice(productData.price);
                    setCondition(productData.condition);
                }
                else if (type === "rentedItem") {
                    setPrice(productData.price);
                    setCondition(productData.condition);
                    setDuration(productData.duration);
                }
                else if(type === "lostItem" || type === "foundItem") {
                    setLocation(productData.location);
                    setDate(productData.date);
                }
                else if (type === "donatedItem") {
                    setCondition(productData.condition);

                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        getProduct().then(() => {
            setIsDataLoaded(true); // Set to true once data is loaded
        });
    }, [itemId]);

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
        processFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent the browser from opening the file
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        processFile(file);
    };

    const processFile = (file) => {
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
            return;
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
        if (!isDataLoaded) return false;
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

    function formatToLocaleString(date) {
        if (!date) return null;

        // Ensure the input is a Date object
        const dateObj = (date instanceof Date) ? date : new Date(date);

        // Format the date
        return dateObj.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        if (isFormValid()) {
            const formData = new FormData();

            // Prepare the data to be sent
            const postData = {
                category: type,
                title: title,
                description: description,
                imageUrl: imageUrl,
                // Conditional properties based on the type
                ...(type === 'donatedItem' && {
                    condition: condition,
                }),
                ...(type === 'lostItem' && {
                    location: location,
                    dateLost: formatToLocaleString(date),
                }),
                ...(type === 'foundItem' && {
                    location: location,
                    dateLost: formatToLocaleString(date),
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
            // Append item data as JSON string
            formData.append('item', JSON.stringify(postData));

            // Append image file if available
            if (imageFile) {
                formData.append('image', imageFile);
            }
            try {
                const response = await apiService.put(`/items/${itemId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    console.log('Form submitted successfully:', response.data);
                    alert("Form submitted successfully");
                    navigate('/home'); // Redirect after successful submission
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert("Error in submitting form");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
            alert('Please fill in all required fields with appropriate values.');
        }
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        console.log('Deleting item with ID:', itemId); // Debugging line
        if(window.confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await apiService.delete(`/items/${itemId}`);
                if (response.status === 200) {
                    alert("Item deleted successfully");
                    navigate('/active-posts'); // Redirect after successful submission
                    // Handle additional logic after deletion, like updating UI or redirecting
                }
            } catch (error) {
                console.error('Error deleting item:', error);
                alert("Error in deleting item");
            }
        }
    };

    return(
        <div>
            <Navbar/>
            <section className="bg-gray-100 body">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title (max. 60 characters)</label>
                                <input type="text" name="name" id="name" maxLength={60} value={title} onChange={handleProductTitleChange} className="bg-gray-50 placeholder-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""></input>
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                <select id="category" onChange={handleTypeChange} value={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
                                {!durationNumber && (
                                    <p className="mt-2 text-base font-medium mb-3">
                                        Duration to give away now: {duration}
                                    </p>
                                )}
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

                                <label htmlFor="durationNumber" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${durationType ? 'opacity-full' : 'opacity-25'}`}>How many {durationType}s?</label>
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
                                        New duration to give away: {combinedDuration}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location (Select the nearest)</label>
                                <select id="location" onChange={handleLocationChange} value={location} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={type === 'lendItem' || type === 'rentedItem' || type === 'donatedItem' || type === 'secondHandItem'}>
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
                                    <option value="Main Campus Library">Main Campus Library</option>
                                    <option value="EA Building">EA Building</option>
                                    <option value="EB Building">EB Building</option>
                                    <option value="EE Building">EE Building</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Condition</label>
                                <select id="condition" onChange={handleConditionChange} value={condition} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={type === 'lostItem' || type === 'foundItem'}>
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
                            <div className="sm:col-span-2 grid grid-cols-2 gap-5">
                                <label htmlFor="dropzone-file"
                                       className="flex flex-col col-span-1 items-center font-medium text-sm justify-center w-full h-64 border-2 border-blue-text border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                       onDragOver={handleDragOver}
                                       onDrop={handleDrop}>
                                    Upload Product Photo
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 5MB)</p>
                                    </div>
                                    <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" />
                                </label>
                                <div className="col-span-1">
                                    {imageUrl && <img src={imageUrl} alt="Preview"/>}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description (max. 160 characters)</label>
                                <textarea id="description" maxLength={160} rows="4" onChange={handleDescriptionChange} value={description} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type your description here"></textarea>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-10">
                            <button onSubmit={handleSubmit} type="submit" className="text-white bg-blue-hover-text hover:bg-blue-text focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update product"}
                            </button>
                            <button type="button" onClick={handleDelete} className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
}
export default UpdateProductPage;