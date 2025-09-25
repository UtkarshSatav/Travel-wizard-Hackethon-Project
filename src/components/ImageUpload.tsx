import React, { useCallback, useState } from 'react';
import { Upload, Camera, Film, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Demo images for quick testing
  const demoImages = [
    {
      url: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      label: '🏝️ Tropical Beach'
    },
    {
      url: 'https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=800',
      label: '🏔️ Mountain Peak'
    },
    {
      url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
      label: '🏛️ City Landmark'
    },
    {
      url: 'https://images.pexels.com/photos/2291004/pexels-photo-2291004.jpeg?auto=compress&cs=tinysrgb&w=800',
      label: '🏜️ Desert Safari'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileInputChange}
        />
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Your Dream Destination
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop an image or video, or click to browse
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Camera className="h-4 w-4 mr-1" />
                Images
              </span>
              <span className="flex items-center">
                <Film className="h-4 w-4 mr-1" />
                Videos
              </span>
            </div>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105">
            Choose File
          </button>
        </div>
      </div>

      {/* Demo Images */}
      <div>
        <h4 className="text-center text-sm font-medium text-gray-700 mb-4">
          Or try these demo destinations:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {demoImages.map((demo, index) => (
            <button
              key={index}
              onClick={() => onImageUpload(demo.url)}
              className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-400 transition-all duration-200"
            >
              <img
                src={demo.url}
                alt={demo.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
                  Analyze
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white text-xs font-medium">{demo.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;