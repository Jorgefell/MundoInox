import React, { useState, useRef } from 'react';
import { Phone, Mail, Clock, MapPin, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsLoading(true);

    try {
      const result = await emailjs.sendForm(
        'service_dodlyjp',
        'template_vn8gvpt',
        formRef.current,
        'ew8BWNyG-HBfFZy6u'
      );

      if (result.status === 200) {
        toast.success(
          '¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.'
        );

        formRef.current.reset();
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error sending email:', error);

      toast.error(
        'Error al enviar el mensaje. Por favor, intente nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Toaster position="top-center" reverseOrder={false} />

      {/* TÍTULO */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Contacto
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* FORMULARIO */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6">
            Envíanos un mensaje
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NOMBRE */}
            <div>
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>

              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                minLength={2}
                placeholder="Ingrese su nombre"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="ejemplo@correo.com"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* MENSAJE */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Mensaje
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                required
                minLength={10}
                placeholder="Escriba su mensaje aquí..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </form>
        </div>

        {/* INFORMACIÓN */}
        <div className="space-y-8">

          {/* CONTACTO */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">
              Información de Contacto
            </h3>

            <div className="space-y-5">

              {/* DIRECCIÓN */}
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />

                <p className="text-gray-600 leading-relaxed">
                  Mlc. Malecon Zolezzi Nro 161,
                  <br />
                  (Al Costado De La Feria Altiplano),
                  <br />
                  Mariano Melgar - Arequipa
                </p>
              </div>

              {/* TELÉFONO */}
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />

                <p className="text-gray-600">
                  Central: 054-617427
                  <br />
                  WhatsApp: +51 987 111 430
                </p>
              </div>

              {/* EMAIL */}
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />

                <p className="text-gray-600">
                  mundoinoxeirl@gmail.com
                </p>
              </div>

              {/* HORARIO */}
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />

                <div className="text-gray-600">
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p>Sábados: 8:00 AM - 4:00 PM</p>
                </div>
              </div>

            </div>
          </div>

          {/* MAPA */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">
              Ubicación
            </h3>

            <div className="overflow-hidden rounded-lg shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=Malecon+Zolezzi+161,+Mariano+Melgar,+Arequipa,+Peru&output=embed&z=17"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Ubicación Mundo Inox"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;