
import React from 'react';
import { GraduationCapIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
        <GraduationCapIcon />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mr-3">
          <span className="text-blue-600">Licence</span> 3ème Année
        </h1>
      </div>
    </header>
  );
};

export default Header;
