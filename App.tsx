
import React, { useState } from 'react';
import Header from './components/Header';
import Translator from './components/Translator';
import Lessons from './components/Lessons';
import Announcements from './components/Announcements';
import { AppView } from './types';
import { BookOpenIcon, MegaphoneIcon, LanguageIcon } from './components/Icons';


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.Translator);

  const renderContent = () => {
    switch (activeView) {
      case AppView.Lessons:
        return <Lessons />;
      case AppView.Announcements:
        return <Announcements />;
      case AppView.Translator:
      default:
        return <Translator />;
    }
  };

  const navItems = [
    { view: AppView.Translator, label: 'المترجم', icon: <LanguageIcon /> },
    { view: AppView.Lessons, label: 'الدروس', icon: <BookOpenIcon /> },
    { view: AppView.Announcements, label: 'الإعلانات', icon: <MegaphoneIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <nav className="mb-8 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
              {navItems.map((item) => (
                <li key={item.view} className="mr-2 last:mr-0 ml-2 last:ml-0">
                  <button
                    onClick={() => setActiveView(item.view)}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group transition-all duration-200 ${
                      activeView === item.view
                        ? 'text-blue-600 border-blue-600'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="w-5 h-5 ml-2">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {renderContent()}
        </div>
      </main>
       <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Licence 3ème Année. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default App;
