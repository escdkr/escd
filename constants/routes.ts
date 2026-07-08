
export const ROUTES = {
  HOME: '/',
  DETAIL: '/product/the-glitch',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  SYNDICATE: '/syndicate',
  ORACLE: '/oracle', // Added Oracle Route
  SETTINGS: '/settings',
  ADMIN: '/admin',
  LEGAL: '/legal',
  FAQ: '/faq', // Added FAQ Route
  REVIEWS: '/reviews', // Added Reviews Route
  FREE_ARMORY: '/armory/free', // Added Free Armory Route
  VIP_ARMORY: '/armory/vip', // Added VIP Armory Route
  PREVIEW: '/preview/hidden-chapter',
  CURRICULUM: '/curriculum',
  AUTHOR: '/author',
  // LMS
  COURSE: '/courses/:courseId',
  LESSON: '/courses/:courseId/lessons/:lessonId',
  CERTIFICATE: '/certificate/:courseId',
  NOT_FOUND: '*'
} as const;

export type RouteType = typeof ROUTES[keyof typeof ROUTES];

export const courseUrl = (courseId: string) => `/courses/${courseId}`;
export const lessonUrl = (courseId: string, lessonId: string) => `/courses/${courseId}/lessons/${lessonId}`;
export const certificateUrl = (courseId: string) => `/certificate/${courseId}`;
