import { NavigationItem } from './navigation.types';

export const mockNavigationAdmin: NavigationItem[] = [
  {
    id: 'dashboards',
    title: 'ระบบบันทึกเอกสาร',
    sub_title: 'บันทึกเอกสารตามระบบมาตราฐาน',
    type: 'aside',
  },
  {
    id: 'dashboards',
    title: 'งานด้านคลังสินค้า',
    sub_title: 'Unique dashboard designs',
    type: 'basic',
    icon: 'office-building',
    link: '/dashboard',
  },
  {
    id: 'dashboards',
    title: 'งานด้านผลิดสินค้า',
    sub_title: 'Unique dashboard designs',
    type: 'basic',
    icon: 'shopping-bag',
    link: '/create',
  },
  {
    id: 'dashboards',
    title: 'งานด้านคุณภาพ',
    sub_title: 'Unique dashboard designs',
    type: 'basic',
    icon: 'chart-bar',
    link: '/performance',
  },
];

export const mockNavigationDCC: NavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards DCC',
    sub_title: 'Unique dashboard designs',
    type: 'basic',
    icon: 'heroicons_outline:home',
  },
];

export const mockNavigationManagement: NavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards Management',
    sub_title: 'Unique dashboard designs',
    type: 'basic',
    icon: 'heroicons_outline:home',
  },
];
