// Приймає назву ключа localStorageKey і овертає колекцію фільмів
export const loadDataFromLS = localStorageKey => {
    try {
        let string = localStorage.getItem(localStorageKey);
        if (string === null) {
        string = '[]';
        // створюється пустий масив, якщо немає ключа
        }
        const data = JSON.parse(string);
        if (Array.isArray(data)) {
        return data;
        // Повертаємо масив з колекцією фільмів
        } else {
        throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Get LocslStorage error: ', err);
    }
};

// Приймає назву ключа localStorageKey, і записує фільм до колекції
export const setDataToLS = (localStorageKey, object) => {
    try {
        if (Array.isArray(object)) {
        // перевіряє чи є об'єкт масивом
        const string = JSON.stringify(object);
        localStorage.setItem(localStorageKey, string);
        // Записує оновлений масив в Local Storage
        } else {
        throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Set LocalStorage error: ', err);
    }
};