
import React, { useState } from 'react';
import type { Subject, PDFFile } from '../types';
import { BookOpenIcon, CodeBracketIcon, BeakerIcon, ArrowRightIcon, PlusIcon, DocumentArrowDownIcon, DocumentTextIcon, ArrowUturnRightIcon } from './Icons';

const initialSubjects: Subject[] = [
  { id: 'info', name: 'Informatique', icon: <CodeBracketIcon />, files: [
    {id: 1, name: 'Introduction aux algorithmes.pdf'},
    {id: 2, name: 'Bases de données avancées.pdf'}
  ]},
  { id: 'math', name: 'Mathématiques', icon: <BeakerIcon />, files: [
    {id: 3, name: 'Analyse complexe - Chapitre 1.pdf'},
  ]},
  { id: 'phys', name: 'Physique', icon: <BeakerIcon />, files: []},
];

const SubjectCard: React.FC<{ subject: Subject; onSelect: (id: string) => void }> = ({ subject, onSelect }) => (
  <button
    onClick={() => onSelect(subject.id)}
    className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:border-blue-500 transition-all duration-300 text-right flex flex-col items-start"
  >
    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
      {subject.icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h3>
    <p className="text-gray-500 mb-4">{subject.files.length} ملفات</p>
    <div className="mt-auto flex items-center text-blue-600 font-semibold">
      <span>عرض الدروس</span>
      <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1"><ArrowRightIcon /></span>
    </div>
  </button>
);


const SubjectDetail: React.FC<{ subject: Subject; onBack: () => void; onFileUpload: (subjectId: string, file: File) => void }> = ({ subject, onBack, onFileUpload }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload(subject.id, event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="animate-fade-in">
       <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6 font-semibold">
          <ArrowUturnRightIcon />
          <span className="mr-2">العودة إلى المواد</span>
       </button>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center ml-4">
                {subject.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-800">{subject.name}</h2>
        </div>
        <div>
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleUploadClick}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusIcon />
            <span className="mr-2">رفع ملف جديد</span>
          </button>
        </div>
      </div>
      
      {subject.files.length > 0 ? (
        <ul className="space-y-3">
          {subject.files.map((file) => (
            <li key={file.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center transition-all hover:bg-gray-100">
              <div className="flex items-center">
                <DocumentTextIcon />
                <span className="mr-3 text-gray-700 font-medium">{file.name}</span>
              </div>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="تنزيل الملف">
                <DocumentArrowDownIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 mx-auto bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon />
            </div>
            <p className="text-gray-600 font-semibold">لا توجد ملفات لهذه المادة بعد.</p>
            <p className="text-gray-500 text-sm mt-1">كن أول من يرفع ملفًا!</p>
        </div>
      )}
    </div>
  );
};


const Lessons: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
  };
  
  const handleBack = () => {
    setSelectedSubjectId(null);
  };

  const handleFileUpload = (subjectId: string, file: File) => {
      setSubjects(prevSubjects => 
          prevSubjects.map(subject => {
              if (subject.id === subjectId) {
                  const newFile: PDFFile = {
                      id: Date.now(),
                      name: file.name
                  };
                  return { ...subject, files: [...subject.files, newFile] };
              }
              return subject;
          })
      );
  };

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  return (
    <div className="animate-fade-in">
      {!selectedSubject ? (
        <>
        <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center">
            <BookOpenIcon />
            <span className="mr-3">مواد الدراسة</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} onSelect={handleSelectSubject} />
          ))}
        </div>
        </>
      ) : (
        <SubjectDetail subject={selectedSubject} onBack={handleBack} onFileUpload={handleFileUpload} />
      )}
    </div>
  );
};

export default Lessons;
