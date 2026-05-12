export type FeedCategory = 'announcement' | 'activity' | 'alert';

export type FeedItem = {
  id: string;
  category: FeedCategory;
  tag: string;
  time: string;
  title: string;
  body: string;
  bg: string;
  tagBg: string;
  tagText: string;
};

export const FEED: FeedItem[] = [
  {
    id: 'f1',
    category: 'alert',
    tag: 'EMERGENCY',
    time: '2h ago',
    title: 'Heavy Rainfall Advisory',
    body: 'PAGASA reports heavy rains in Muntinlupa until 8 PM tonight. Stay safe and avoid flood-prone areas.',
    bg: '#FEF2F2',
    tagBg: '#FECACA',
    tagText: '#B91C1C',
  },
  {
    id: 'f2',
    category: 'announcement',
    tag: 'ANNOUNCEMENT',
    time: '6h ago',
    title: 'Libreng Bigas Distribution — May 25',
    body: 'Verified residents may claim 5kg rice at Brgy. Hall. Bring your Digital ID. Cluster schedule will be posted soon.',
    bg: '#EFF6FF',
    tagBg: '#BFDBFE',
    tagText: '#1D4ED8',
  },
  {
    id: 'f3',
    category: 'activity',
    tag: 'ACTIVITY',
    time: '1d ago',
    title: 'Brgy. Clean-Up Drive — Sat 7AM',
    body: 'Sumama sa kalinisan ng aming barangay. Meeting point: Brgy. Cupang Hall. Free shirt for first 100 volunteers.',
    bg: '#F0FDF4',
    tagBg: '#BBF7D0',
    tagText: '#15803D',
  },
  {
    id: 'f4',
    category: 'announcement',
    tag: 'ANNOUNCEMENT',
    time: '2d ago',
    title: 'New Office Hours for Barangay Clearance',
    body: 'Effective immediately, walk-in clearance hours are 8AM–4PM. App-only priority lane is open 24/7.',
    bg: '#EFF6FF',
    tagBg: '#BFDBFE',
    tagText: '#1D4ED8',
  },
  {
    id: 'f5',
    category: 'activity',
    tag: 'ACTIVITY',
    time: '3d ago',
    title: 'Free Medical Mission — May 30',
    body: 'Libreng check-up at gamot para sa lahat ng residente. Schedule released on Cupang Feed.',
    bg: '#F0FDF4',
    tagBg: '#BBF7D0',
    tagText: '#15803D',
  },
];
