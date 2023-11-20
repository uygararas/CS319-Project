import { useState } from 'react';

function PhotoUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    const handleFileChange = (event) => {
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
            return;
        }

        setSelectedFile(file);
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('image', selectedFile);

        // Replace with your API endpoint
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Handle the server response
    };

    return (
        <div className="sm:col-span-2">
            <label htmlFor="photo-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Photo</label>
            <input
                type="file"
                id="photo-upload"
                onChange={handleFileChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg" />
                </div>
            )}
        </div>
    );
}

export default PhotoUpload;
