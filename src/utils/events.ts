export const emitLog = (message: string) => {
  window.dispatchEvent(new CustomEvent('sys-log', { detail: message }));
};

export const emitAchievement = (title: string, points: number) => {
  window.dispatchEvent(new CustomEvent('sys-achieve', { detail: { title, points } }));
};
