"use client";

import { useState } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('restoration');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    // Validate total file size (limit 15 MB)
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 15 * 1024 * 1024) {
      setMessage('Суммарный размер файлов превышает 15 МБ.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('service', service);
      files.forEach((file) => formData.append('files', file));
      const res = await fetch('/api/send-order', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setMessage('Заказ отправлен успешно!');
        // Reset form fields
        setName('');
        setPhone('');
        setService('restoration');
        setFiles([]);
      } else {
        const data = await res.json().catch(() => null);
        setMessage(
          data?.error || 'Произошла ошибка при отправке заказа. Попробуйте снова.'
        );
      }
    } catch (error) {
      console.error(error);
      setMessage('Ошибка: не удалось отправить заказ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">TupsArt</h1>
          <p className="text-lg">Форма заказа</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Имя
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md border-0 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="block w-full rounded-md border-0 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-1">
              Тип услуги
            </label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="block w-full rounded-md border-0 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-primary"
            >
              <option value="restoration">Реставрация</option>
              <option value="printing">Печать</option>
              <option value="design">Дизайн</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Файлы</label>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-white"
            />
          </div>
          {message && (
            <div className="text-center text-sm text-red-400">{message}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? 'Отправка…' : 'Отправить'}
          </button>
        </form>
      </div>
    </main>
  );
}
