import { useState } from 'react';
import Navbar from "../components/navbar.jsx";
import PhotoUpload from "../components/photoUpload.jsx";
function PostItem() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleDurationChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    }

    const handleProductTitleChange = (event) => {
        setProductTitle(event.target.value);
    };

    const handleConditionChange = (event) => {
        setSelectedCondition(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const isFormValid = () => {
        if (selectedCategory === "Lost" || selectedCategory === "Found") {
            return(
                productTitle.trim() !== "" &&
                selectedCategory !== "" &&
                selectedDescription !== "" &&
                selectedLocation !== "" &&
                selectedDate !== "" &&
                selectedTime !== ""
            );
        }
        else if (selectedCategory === "Lend") {
            return(
                productTitle.trim() !== "" &&
                selectedCategory !== "" &&
                selectedDescription !== "" &&
                selectedCondition !== "" &&
                selectedDuration !== 0
            );
        }
        else if (selectedCategory === "Second Hand") {
            return(
                productTitle.trim() !== "" &&
                selectedCategory !== "" &&
                selectedDescription !== "" &&
                selectedCondition !== "" &&
                selectedPrice > 0
            );
        }
        else if (selectedCategory === "Donation") {
            return(
                productTitle.trim() !== "" &&
                selectedCategory !== "" &&
                selectedDescription !== "" &&
                selectedCondition !== ""
            );
        }
        else if (selectedCategory === "Rent") {
            return(
                productTitle.trim() !== "" &&
                selectedCategory !== "" &&
                selectedDescription !== "" &&
                selectedCondition !== "" &&
                selectedPrice > 0 &&
                selectedDuration !== 0
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isFormValid()) {
            //Form submission logic here!!
            console.log('Form submitted');
        } else {
            alert('Please fill in all required fields with appropriate values.');
        }
    };

    return(
        <div>
        <Navbar/>
        <section className="bg-white dark:bg-gray-900 h-auto bg-gradient-to-b from-white to-gray-300">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
                            <input type="text" name="name" id="name" value={productTitle} onChange={handleProductTitleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product title" required=""></input>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="category" onChange={handleCategoryChange} value={selectedCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Select category</option>
                                <option value="Second Hand">Second Hand</option>
                                <option value="Donation">Donation</option>
                                <option value="Rent">Rent</option>
                                <option value="Lend">Lend</option>
                                <option value="Lost">Lost</option>
                                <option value="Found">Found</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" onChange={handlePriceChange} value={selectedPrice} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2999 TL" required="" disabled={selectedCategory === 'Donation' || selectedCategory === 'Lend' || selectedCategory === 'Lost' || selectedCategory === 'Found'}></input>
                        </div>
                        <div className="w-full">
                            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                            <input type="text" name="duration" id="duration" onChange={handleDurationChange} value={selectedDuration} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Duration in months" required="" disabled={selectedCategory === 'Lost' || selectedCategory === 'Found' || selectedCategory === 'Donation' || selectedCategory === 'Second Hand'}></input>
                        </div>
                        <div className="w-full">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input type="text" name="date" id="date" onChange={handleDateChange} value={selectedDate} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="dd/mm/yyyy" required="" disabled={selectedCategory === 'Lend' || selectedCategory === 'Rent' || selectedCategory === 'Donation' || selectedCategory === 'Second Hand'}></input>
                        </div>
                        <div className="w-full">
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                            <input type="text" name="time" id="time" onChange={handleTimeChange} value={selectedTime} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="hh:mm" required="" disabled={selectedCategory === 'Lend' || selectedCategory === 'Rent' || selectedCategory === 'Donation' || selectedCategory === 'Second Hand'}></input>
                        </div>
                        <div>
                            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Condition</label>
                            <select id="condition" onChange={handleConditionChange} value={selectedCondition} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={selectedCategory === 'Lost' || selectedCategory === 'Found'}>
                                <option value="">Select condition</option>
                                <option value="Like new">Like new</option>
                                <option value="Very good">Very good</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                            <select id="location" onChange={handleLocationChange} value={selectedLocation} className="disabled:opacity-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={selectedCategory === 'Lend' || selectedCategory === 'Rent' || selectedCategory === 'Donation' || selectedCategory === 'Second Hand'}>
                                <option value="">Select location</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="F">F</option>
                                <option value="E">E</option>
                                <option value="M">M</option>
                            </select>
                        </div>
                        <PhotoUpload/>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="8" onChange={handleDescriptionChange} value={selectedDescription} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add product
                    </button>
                </form>
            </div>
        </section>
        </div>
    );
}
export default PostItem;