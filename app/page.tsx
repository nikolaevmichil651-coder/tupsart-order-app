"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("\u0420\u0435\u0441\u0442\u0430\u0432\u0440\u0430\u0446\u0438\u044f");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const list = Array.from(e.target.files);
    const totalSize = list.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_SIZE) {
      setError("\u0421\u0443\u043c\u043c\u0430\u0440\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u043e\u0432 \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0435\u0442 15 \u041c\u0411");
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
        setService("\u0420\u0435\u0441\u0442\u0430\u0432\u0440\u0430\u0446\u0438\u044f");
        setFiles([]);
      } else {
        const text = await res.text();
        setError(text || "\u041e\u0448\u0438\u0431\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4 text-white">
      <h1 className="text-2xl mb-4 font-bold text-primary">\u041e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-500 rounded text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-2 bg-green-500 rounded text-sm">
          \u0417\u0430\u043a\u0430\u0437 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">\u0418\u043c\u044f</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">\u0422\u0435\u043b\u0435\u0444\u043e\u043d</label>
          <input
            type="tel"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">\u0422\u0438\u043f \u0443\u0441\u043b\u0443\u0433\u0438</label>
          <select
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="\u0420\u0435\u0441\u0442\u0430\u0432\u0440\u0430\u0446\u0438\u044f">\u0420\u0435\u0441\u0442\u0430\u0432\u0440\u0430\u0446\u0438\u044f</option>
            <option value="\u041f\u0435\u0447\u0430\u0442\u044c">\u041f\u0435\u0447\u0430\u0442\u044c</option>
            <option value="\u0414\u0438\u0437\u0430\u0439\u043d">\u0414\u0438\u0437\u0430\u0439\u043d</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">
            \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u044b (JPG, PNG, PDF, DOCX)
          </label>
          <input
            type="file"
            className="w-full text-gray-300"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            onChange={handleFiles}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-primary hover:bg-orange-600 text-white flex items-center justify-center"
        >
          {loading ? <span className="loader"></span> : "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437"}
        </button>
      </form>
    </div>
  );
}
