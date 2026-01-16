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
        toast.success('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
        formRef.current.reset();
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error al enviar el mensaje. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Contacto
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6">Envíanos un mensaje</h3>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                minLength={2}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ingrese su nombre"
              />
            </div>
            
            <div>
              <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                minLength={10}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Escriba su mensaje aquí..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <p className="text-gray-600">
                  Malecon Zolezzi Nro. 337, Mariano Melgar - Arequipa
                </p>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <p className="text-gray-600">
                  Central: 054-619250<br />
                  Celular: 987111430
                </p>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <p className="text-gray-600">mundoinoxaqp@gmail.com</p>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div className="text-gray-600">
                  <p>Lunes a Viernes: 6:00 AM - 6:00 PM</p>
                  <p>Sábados: 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">Ubicación</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.446941275386!2d-71.51717352322191!3d-16.40211213821616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424ba821bf5951%3A0xd4852ae9f55f2643!2sMUNDO%20INOX!5e0!3m2!1ses!2spe!4v1738816925658!5m2!1ses!2spe"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;