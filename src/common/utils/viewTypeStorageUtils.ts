export function loadViewType() {
  try {
    const serializedViewType = localStorage.getItem('viewType');
    if (serializedViewType === null) {
      return undefined;
    }
    return JSON.parse(serializedViewType);
  } catch (error) {
    console.error('Error loading viewType from localStorage:', error);
    return undefined;
  }
}

export function saveViewType(type: 'card' | 'list' | undefined) {
  try {
    const serializedType = JSON.stringify(type);
    localStorage.setItem('viewType', serializedType);
  } catch (error) {
    console.error('Error saving viewType to localStorage:', error);
  }
}
