export type NotificationType = 'reminder' | 'alert' | 'info';

export interface NotificationItem {
  id: string;
  recipientKey: string; // usually caregiver email
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string; // ISO date
  read: boolean;
}

const STORAGE_KEY = 'pnc_notifications';

function readAll(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NotificationItem[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: NotificationItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const NotificationService = {
  getForRecipient(recipientKey: string): NotificationItem[] {
    return readAll()
      .filter(n => n.recipientKey === recipientKey)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  add(recipientKey: string, title: string, message: string, type: NotificationType = 'reminder'): NotificationItem {
    const all = readAll();
    const item: NotificationItem = {
      id: 'notif-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
      recipientKey,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };
    writeAll([item, ...all]);
    return item;
  },

  markRead(id: string): void {
    const all = readAll();
    const next = all.map(n => (n.id === id ? { ...n, read: true } : n));
    writeAll(next);
  },

  markAllRead(recipientKey: string): void {
    const all = readAll();
    const next = all.map(n => (n.recipientKey === recipientKey ? { ...n, read: true } : n));
    writeAll(next);
  },

  clearForRecipient(recipientKey: string): void {
    const all = readAll();
    const next = all.filter(n => n.recipientKey !== recipientKey);
    writeAll(next);
  },
};


