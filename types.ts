// Fix: Import React to provide JSX type definitions.
import React from 'react';

export enum AppView {
  Translator,
  Lessons,
  Announcements,
}

export interface Announcement {
  id: number;
  professor: string;
  title: string;
  content: string;
  date: string;
}

export interface PDFFile {
  id: number;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: JSX.Element;
  files: PDFFile[];
}