"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload01Icon, Cancel01Icon, Loading01Icon, Link01Icon } from 'hugeicons-react';

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  className?: string;
}

export function MultiImageUpload({ values, onChange, label, className }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleUpload = async (files: File[]) => {
    setError(null);
    setIsUploading(true);

    const newUrls: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Некоторые файлы не являются изображениями и были пропущены.');
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Некоторые файлы превышают 10MB и были пропущены.');
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Failed to upload image');

        const data = await res.json();
        newUrls.push(data.url);
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке некоторых изображений.');
      }
    }

    if (newUrls.length > 0) {
      onChange([...values, ...newUrls]);
    }
    setIsUploading(false);
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
    if (files.length > 0) handleUpload(files);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) handleUpload(files);
  };

  const removeImage = (indexToRemove: number) => {
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  const handleUrlSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (urlInput.trim()) {
        onChange([...values, urlInput.trim()]);
        setUrlInput('');
      }
    }
  };

  return (
    <div className={`w-full ${className || ''}`}>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2 ml-1">
          {label}
        </label>
      )}

      {/* Grid of existing images */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4">
          {values.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-50">
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1.5 bg-white text-red-500 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                  title="Удалить"
                >
                  <Cancel01Icon size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {showUrlInput ? (
        <div className="relative mb-2">
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
              if (urlInput.trim()) onChange([...values, urlInput.trim()]);
              setUrlInput('');
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
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            isDragging
              ? 'border-evergreen-forest bg-evergreen-forest/5'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            {isUploading ? (
              <>
                <Loading01Icon size={24} className="text-evergreen-forest animate-spin" />
                <p className="text-xs font-medium text-secondary-text">Загрузка...</p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-secondary-text">
                  <Upload01Icon size={20} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-primary-text">
                    Добавить изображения
                  </p>
                  <p className="text-[11px] text-secondary-text">
                    Нажмите или перетащите (до 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!showUrlInput && (
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="mt-2 text-xs text-secondary-text hover:text-primary-text flex items-center gap-1 transition-colors"
        >
          <Link01Icon size={14} /> Вставить ссылку вручную
        </button>
      )}

      {showUrlInput && (
         <button
         type="button"
         onClick={() => setShowUrlInput(false)}
         className="mt-2 text-xs text-secondary-text hover:text-primary-text flex items-center gap-1 transition-colors"
       >
         Скрыть ввод ссылки
       </button>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
