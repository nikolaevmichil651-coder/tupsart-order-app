"use client";
import React, { useState, FormEvent } from "react";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Реставрация");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const list = Array.from(e.target.files);
    const totalSize = list.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_SIZE) {
      setError("Суммарный размер файлов превышает 15 МБ");
      return;
    }
    setFiles(list);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("service", service);
      files.forEach((file) => {
      formData.append("files", file);
      });
      const res = await fetch("/api/send-order", {
      method: "POST",
      body: formData,
      });
      if (res.ok) {
      setSuccess(true);
      setName("");
      setPhone("");
      setService("Реставрация");
      setFiles([]);
      } else {
      const text = await res.text();
      setError(text || "Ошибка отправки");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Оформление заказа</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">Заказ успешно отправлен!</div>}
        <div>
          <label className="block mb-1">Имя</label>
          <input
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Телефон</label>
          <input
            type="tel"
            className="w-full bg-gray-800 border border-gray-700 rounded p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Тип услуги</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded p-2"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="Реставрация">Реставрация</option>
            <option value="Печать">Печать</option>
            <option value="Дизайн">Дизайн</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Загрузите файлы (JPG, PNG, PDF, DOCX)</label>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.docx"
            className="w-full text-white"
            onChange={handleFiles}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#f97316] hover:bg-[#e76c10] text-white font-semibold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? <span className="loader mx-auto"></span> : 'Отправить заказ'}
        </button>
      </form>
    </main>
  );
}
