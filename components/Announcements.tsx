
import React from 'react';
import type { Announcement } from '../types';
import { MegaphoneIcon, CalendarDaysIcon, UserIcon } from './Icons';

const announcementsData: Announcement[] = [
  {
    id: 1,
    professor: 'الأستاذ كريم محمود',
    title: 'تأجيل امتحان الرياضيات المتقطعة',
    content: 'نظراً للظروف الحالية، تم تأجيل امتحان الرياضيات المتقطعة الذي كان مقرراً يوم الثلاثاء إلى يوم الخميس من نفس الأسبوع. بالتوفيق للجميع.',
    date: '2024-05-18',
  },
  {
    id: 2,
    professor: 'الأستاذة هدى سالم',
    title: 'محاضرة إضافية في قواعد البيانات',
    content: 'سيتم عقد محاضرة مراجعة إضافية لمادة قواعد البيانات يوم السبت القادم في تمام الساعة 10 صباحاً في المدرج رقم 3.',
    date: '2024-05-17',
  },
  {
    id: 3,
    professor: 'رئاسة القسم',
    title: 'مواعيد تسليم مشاريع التخرج',
    content: 'يرجى من جميع الطلاب المعنيين الالتزام بمواعيد تسليم النسخة الأولية من مشاريع التخرج قبل نهاية الشهر الحالي.',
    date: '2024-05-15',
  },
];

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{announcement.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4 space-x-reverse">
            <div className="flex items-center">
                <UserIcon />
                <span className="mr-1.5">{announcement.professor}</span>
            </div>
            <div className="flex items-center">
                <CalendarDaysIcon />
                <span className="mr-1.5">{announcement.date}</span>
            </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
            {announcement.content}
        </p>
    </div>
);

const Announcements: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center">
        <MegaphoneIcon />
        <span className="mr-3">إعلانات الأساتذة</span>
      </h2>
      <div className="space-y-6">
        {announcementsData.map((ann) => (
          <AnnouncementCard key={ann.id} announcement={ann} />
        ))}
      </div>
    </div>
  );
};

export default Announcements;
