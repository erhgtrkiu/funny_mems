// Данные мемов
const memeData = {
    popular: [
        {
            id: 1,
            title: "Когда понедельник",
            image: "https://via.placeholder.com/300x250/ff6b6b/ffffff?text=Понедельник",
            likes: 245,
            dislikes: 12,
            comments: 34,
            theme: "work"
        },
        {
            id: 2,
            title: "Программист за работой",
            image: "https://via.placeholder.com/300x250/4ecdc4/ffffff?text=Код",
            likes: 189,
            dislikes: 5,
            comments: 28,
            theme: "work"
        },
        {
            id: 3,
            title: "Студент перед экзаменом",
            image: "https://via.placeholder.com/300x250/ffe66d/000000?text=Сессия",
            likes: 312,
            dislikes: 8,
            comments: 45,
            theme: "study"
        },
        {
            id: 4,
            title: "Новый год уже близко",
            image: "https://via.placeholder.com/300x250/ff6b6b/ffffff?text=Новый+Год",
            likes: 156,
            dislikes: 3,
            comments: 22,
            theme: "holidays"
        }
    ],
    trending: [
        {
            id: 5,
            title: "Котик удивлен",
            image: "https://via.placeholder.com/300x250/292f36/ffffff?text=Кот",
            likes: 421,
            dislikes: 15,
            comments: 67,
            theme: "animals"
        },
        {
            id: 6,
            title: "Когда дедлайн",
            image: "https://via.placeholder.com/300x250/4ecdc4/ffffff?text=Дедлайн",
            likes: 298,
            dislikes: 9,
            comments: 41,
            theme: "work"
        },
        {
            id: 7,
            title: "Пятница настроение",
            image: "https://via.placeholder.com/300x250/ffe66d/000000?text=Пятница",
            likes: 334,
            dislikes: 7,
            comments: 52,
            theme: "work"
        }
    ]
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadPopularMemes();
    loadTrendingMemes();
    loadThemedMemes();
    setupEventListeners();
    setupMemeGenerator();
});

// Загрузка популярных мемов
function loadPopularMemes() {
    const container = document.getElementById('popularMemes');
    container.innerHTML = '';
    
    memeData.popular.forEach(meme => {
        container.appendChild(createMemeCard(meme));
    });
}

// Загрузка трендовых мемов
function loadTrendingMemes() {
    const container = document.getElementById('trendingMemes');
    container.innerHTML = '';
    
    memeData.trending.forEach(meme => {
        container.appendChild(createMemeCard(meme));
    });
}

// Загрузка тематических мемов
function loadThemedMemes(theme = 'all') {
    const container = document.getElementById('themedMemes');
    container.innerHTML = '';
    
    const allMemes = [...memeData.popular, ...memeData.trending];
    const filteredMemes = theme === 'all' 
        ? allMemes 
        : allMemes.filter(meme => meme.theme === theme);
    
    filteredMemes.forEach(meme => {
        container.appendChild(createMemeCard(meme));
    });
}

// Создание карточки мема
function createMemeCard(meme) {
    const card = document.createElement('div');
    card.className = 'meme-card';
    card.innerHTML = `
        <img src="${meme.image}" alt="${meme.title}" class="meme-img">
        <div class="meme-info">
            <div class="meme-title">${meme.title}</div>
            <div class="meme-stats">
                <div class="meme-actions">
                    <button class="like-btn" data-id="${meme.id}">👍 ${meme.likes}</button>
                    <button class="dislike-btn" data-id="${meme.id}">👎 ${meme.dislikes}</button>
                </div>
                <div>💬 ${meme.comments}</div>
            </div>
            <div class="comment-section">
                <div class="comment-form">
                    <input type="text" placeholder="Добавить комментарий..." data-id="${meme.id}">
                    <button class="btn" data-id="${meme.id}">Отправить</button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Кнопка входа
    document.getElementById('loginBtn').addEventListener('click', function() {
        alert('Функция входа будет реализована позже!');
    });
    
    // Кнопка "Начать создавать"
    document.getElementById('startCreatingBtn').addEventListener('click', function() {
        document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Табы тематических мемов
    document.querySelectorAll('.theme-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.theme-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const theme = this.getAttribute('data-theme');
            loadThemedMemes(theme);
        });
    });
    
    // Обработка лайков/дизлайков (делегирование событий)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('like-btn')) {
            const memeId = e.target.getAttribute('data-id');
            handleLike(memeId);
        } else if (e.target.classList.contains('dislike-btn')) {
            const memeId = e.target.getAttribute('data-id');
            handleDislike(memeId);
        }
    });
    
    // Обработка отправки комментариев (делегирование событий)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') && e.target.parentElement.classList.contains('comment-form')) {
            const memeId = e.target.getAttribute('data-id');
            const input = e.target.parentElement.querySelector('input');
            const commentText = input.value.trim();
            
            if (commentText) {
                addComment(memeId, commentText);
                input.value = '';
            }
        }
    });
}

// Обработка лайков
function handleLike(memeId) {
    // В реальном приложении здесь был бы запрос к серверу
    alert(`Лайк добавлен к мему #${memeId}`);
}

// Обработка дизлайков
function handleDislike(memeId) {
    // В реальном приложении здесь был бы запрос к серверу
    alert(`Дизлайк добавлен к мему #${memeId}`);
}

// Добавление комментария
function addComment(memeId, text) {
    // В реальном приложении здесь был бы запрос к серверу
    alert(`Комментарий "${text}" добавлен к мему #${memeId}`);
}

// Настройка генератора мемов
function setupMemeGenerator() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const imageUpload = document.getElementById('imageUpload');
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    let currentImage = null;
    
    // Загрузка изображения
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    currentImage = img;
                    drawMeme();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Обработка изменения текста
    topTextInput.addEventListener('input', drawMeme);
    bottomTextInput.addEventListener('input', drawMeme);
    
    // Кнопка генерации
    generateBtn.addEventListener('click', drawMeme);
    
    // Кнопка скачивания
    downloadBtn.addEventListener('click', function() {
        if (currentImage) {
            const link = document.createElement('a');
            link.download = 'my-meme.png';
            link.href = canvas.toDataURL();
            link.click();
        } else {
            alert('Сначала загрузите изображение!');
        }
    });
    
    // Функция отрисовки мема
    function drawMeme() {
        if (!currentImage) {
            ctx.fillStyle = '#f9f9f9';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#666';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Загрузите изображение для создания мема', canvas.width / 2, canvas.height / 2);
            return;
        }
        
        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисование изображения
        const scale = Math.min(canvas.width / currentImage.width, canvas.height / currentImage.height);
        const width = currentImage.width * scale;
        const height = currentImage.height * scale;
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;
        
        ctx.drawImage(currentImage, x, y, width, height);
        
        // Настройки текста
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.font = 'bold 30px Impact';
        
        // Верхний текст
        const topText = topTextInput.value;
        if (topText) {
            ctx.fillText(topText, canvas.width / 2, 40);
            ctx.strokeText(topText, canvas.width / 2, 40);
        }
        
        // Нижний текст
        const bottomText = bottomTextInput.value;
        if (bottomText) {
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
            ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
        }
    }
    
    // Первоначальная отрисовка
    drawMeme();
}
