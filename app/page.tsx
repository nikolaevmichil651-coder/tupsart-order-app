"use client";
import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Создаем впечатление через печать и дизайн
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-xl">
              «ТупсАрт» — студия полиграфии и дизайна, где каждая печатная работа и каждый пиксель сайта отражают ваш стиль и ценности. Мы помогаем сохранять воспоминания, воплощать идеи и выделяться среди конкурентов.
            </p>
            <Link href="/order" className="inline-block bg-black/60 hover:bg-black/70 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-colors">
              Оформить заказ
            </Link>
          </div>
          <div className="hidden lg:block">
            <img src="/logo.png" alt="ТупсАрт бренд" className="max-w-md mx-auto lg:ml-auto" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Наши услуги</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">Полиграфия</h3>
              <p className="text-gray-300 mb-4">
                Печать фотографий 10×15, документов форматов A4 и A3, ламинация и копирование. Современное оборудование обеспечивает четкость и насыщенность каждого изображения.
              </p>
            </div>
            <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">Реставрация и ретушь</h3>
              <p className="text-gray-300 mb-4">
                Восстанавливаем старые снимки, исправляем повреждения и возвращаем цвет. Проведём аккуратную ретушь, сохраняя атмосферу и характер ваших фотографий.
              </p>
            </div>
            <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">Дизайн</h3>
              <p className="text-gray-300 mb-4">
                Создаем уникальные логотипы, фирменный стиль и адаптивные сайты, которые выделяют вас на рынке и помогают выстраивать крепкие связи с клиентами.
              </p>
            </div>
            <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">Сувениры и документы</h3>
              <p className="text-gray-300 mb-4">
                Разрабатываем и печатаем грамоты, сертификаты, бланки и сувенирную продукцию. Ваши награды и подарки будут выглядеть достойно и профессионально.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Как заказать</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-700 border border-gray-600 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-primary mb-4">1</span>
              <h3 className="font-semibold text-xl mb-2">Напишите нам</h3>
              <p className="text-center text-gray-300">Свяжитесь через WhatsApp или Telegram. Расскажите о вашей задаче — это поможет нам понять, что именно вы хотите получить.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-700 border border-gray-600 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-primary mb-4">2</span>
              <h3 className="font-semibold text-xl mb-2">Отправьте фото или техзадание</h3>
              <p className="text-center text-gray-300">Прикрепите исходные файлы или опишите желаемый результат. Мы предложим варианты и согласуем стоимость и сроки.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-700 border border-gray-600 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-primary mb-4">3</span>
              <h3 className="font-semibold text-xl mb-2">Заберите готовый заказ</h3>
              <p className="text-center text-gray-300">Мы сообщим, когда все будет готово, и вы сможете получить вашу продукцию. Доставим удобным способом или встретимся лично.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Контакты</h2>
          <p className="text-lg">
            Мы рады ответить на ваши вопросы и принять заказ в любое удобное время. Выберите удобный способ связи и напишите нам:
          </p>
          <div className="space-y-2">
            <p>Телефоны: <a href="tel:+79148233021" className="text-primary hover:underline">8&nbsp;(914)&nbsp;823-30-21</a>, <a href="tel:+79247649992" className="text-primary hover:underline">8&nbsp;(924)&nbsp;764-99-92</a></p>
            <p>Электронная почта: <a href="mailto:nikolaevmichil651@gmail.com" className="text-primary hover:underline">nikolaevmichil651@gmail.com</a>, <a href="mailto:proksargy@mail.ru" className="text-primary hover:underline">proksargy@mail.ru</a></p>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://wa.me/79148233021" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md">WhatsApp</a>
            <a href="https://t.me/+79247649992" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md">Telegram</a>
          </div>
        </div>
      </section>
    </div>
  );
}
