import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <div>
                  <p>Central: 054-619250</p>
                  <p>WhatsApp: +51 987 111 430</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <p>mundoinoxaqp@gmail.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 mt-1" />
              <p>Malecon Zolezzi Nro. 337,<br />Mariano Melgar - Arequipa</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de Atención</h3>
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-2 mt-1" />
              <div>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábados: 8:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Mundo Inox AQP. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;