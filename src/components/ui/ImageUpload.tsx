"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload01Icon, Cancel01Icon, Loading01Icon, Link01Icon } from 'hugeicons-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(value);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, загрузите изображение (JPEG, PNG, WebP и т.д.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Размер файла не должен превышать 10MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      onChange(data.url);
      setUrlInput(data.url);
    } catch (err) {
      setError('Ошибка при загрузке изображения. Попробуйте снова.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleUrlSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(urlInput);
      setShowUrlInput(false);
    }
  };

  return (
    <div className={`w-full ${className || ''}`}>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2 ml-1">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group bg-gray-50 flex items-center justify-center">
          <Image
            src={value}
            alt="Uploaded image"
            width={800}
            height={600}
            className="w-full h-auto max-h-[300px] object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-white text-red-500 rounded-lg hover:bg-red-50 transition-colors"
              title="Удалить"
            >
              <Cancel01Icon size={20} />
            </button>
          </div>
        </div>
      ) : showUrlInput ? (
        <div className="relative">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={handleUrlSubmit}
            placeholder="Вставьте ссылку на изображение и нажмите Enter..."
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-primary-text focus:outline-none focus:ring-1 focus:ring-evergreen-forest pr-12"
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              onChange(urlInput);
              setShowUrlInput(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-secondary-text hover:text-primary-text"
          >
            <Link01Icon size={20} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging
              ? 'border-evergreen-forest bg-evergreen-forest/5'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="flex flex-col items-center justify-center gap-3">
            {isUploading ? (
              <>
                <Loading01Icon size={32} className="text-evergreen-forest animate-spin" />
                <p className="text-sm font-medium text-secondary-text">Загрузка...</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-soft-sand flex items-center justify-center text-secondary-text">
                  <Upload01Icon size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary-text">
                    Нажмите или перетащите изображение сюда
                  </p>
                  <p className="text-xs text-secondary-text">
                    PNG, JPG, WEBP до 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!value && !showUrlInput && (
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="mt-2 text-xs text-secondary-text hover:text-primary-text flex items-center gap-1 transition-colors"
        >
          <Link01Icon size={14} /> Вставить ссылку вручную
        </button>
      )}

      {showUrlInput && !value && (
         <button
         type="button"
         onClick={() => setShowUrlInput(false)}
         className="mt-2 text-xs text-secondary-text hover:text-primary-text flex items-center gap-1 transition-colors"
       >
         Отменить ввод ссылки
       </button>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
