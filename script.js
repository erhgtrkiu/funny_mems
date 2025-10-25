// Данные тематических мемов
const memeData = [
    {
        id: 1,
        title: "💼 Работа",
        image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Рабочие+мемы",
        likes: 245,
        comments: 34,
        views: 1200,
        tags: ["офис", "начальник", "дедлайн", "понедельник"],
        theme: "work"
    },
    {
        id: 2,
        title: "🎓 Учеба",
        image: "https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Учебные+мемы",
        likes: 189,
        comments: 28,
        views: 987,
        tags: ["сессия", "студенты", "экзамены", "домашка"],
        theme: "study"
    },
    {
        id: 3,
        title: "🎉 Праздники",
        image: "https://via.placeholder.com/300x200/ffe66d/000000?text=Праздничные+мемы",
        likes: 312,
        comments: 45,
        views: 1500,
        tags: ["Новый Год", "дни рождения", "отпуск", "вечеринка"],
        theme: "holidays"
    },
    {
        id: 4,
        title: "🐾 Животные",
        image: "https://via.placeholder.com/300x200/292f36/ffffff?text=Мемы+с+животными",
        likes: 421,
        comments: 67,
        views: 2100,
        tags: ["коты", "собаки", "милые", "забавные"],
        theme: "animals"
    },
    {
        id: 5,
        title: "💻 IT и технологии",
        image: "https://via.placeholder.com/300x200/4ecdc4/ffffff?text=IT+мемы",
        likes: 334,
        comments: 52,
        views: 1800,
        tags: ["программирование", "гаджеты", "интернет", "баги"],
        theme: "work"
    },
    {
        id: 6,
        title: "🍕 Еда",
        image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Мемы+о+еде",
        likes: 278,
        comments: 38,
        views: 1350,
        tags: ["рецепты", "диета", "вкусно", "готовка"],
        theme: "holidays"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeMemeGenerator();
    loadThemes();
    setupEventListeners();
});

// Инициализация генератора мемов
function initializeMemeGenerator() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const placeholder = document.getElementById('canvasPlaceholder');
    
    // Первоначальная отрисовка placeholder
    drawPlaceholder();
    
    function drawPlaceholder() {
        canvas.style.display = 'none';
        placeholder.style.display = 'block';
    }
    
    function drawMeme() {
        const currentImage = window.currentImage;
        
        if (!currentImage) {
            drawPlaceholder();
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
        const textSize = parseInt(document.getElementById('textSize').value);
        const textColor = document.getElementById('textColor').value;
        
        ctx.fillStyle = textColor;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.font = `bold ${textSize}px Impact`;
        
        // Верхний текст
        const topText = document.getElementById('topText').value;
        if (topText) {
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, 50);
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 50);
        }
        
        // Нижний текст
        const bottomText = document.getElementById('bottomText').value;
        if (bottomText) {
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30);
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30);
        }
        
        // Показываем canvas и скрываем placeholder
        canvas.style.display = 'block';
        placeholder.style.display = 'none';
    }
    
    // Сохраняем функцию отрисовки в глобальной области видимости
    window.drawMeme = drawMeme;
    window.drawPlaceholder = drawPlaceholder;
}

// Загрузка тематических мемов
function loadThemes(theme = 'all') {
    const container = document.getElementById('themesGrid');
    container.innerHTML = '';
    
    const filteredMemes = theme === 'all' 
        ? memeData 
        : memeData.filter(meme => meme.theme === theme);
    
    filteredMemes.forEach(meme => {
        container.appendChild(createThemeCard(meme));
    });
}

// Создание карточки темы
function createThemeCard(meme) {
    const card = document.createElement('div');
    card.className = 'theme-card';
    card.innerHTML = `
        <div class="theme-image" style="background: linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})"></div>
        <div class="theme-info">
            <div class="theme-title">${meme.title}</div>
            <div class="theme-stats">
                <span>👍 ${meme.likes}</span>
                <span>💬 ${meme.comments}</span>
                <span>👁 ${meme.views}</span>
            </div>
            <div class="theme-tags">
                ${meme.tags.map(tag => `<span class="theme-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', function() {
        alert(`Открывается раздел: ${meme.title}`);
        // В реальном приложении здесь была бы навигация к разделу
    });
    
    return card;
}

// Случайный цвет для карточек
function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#292f36', '#6c5ce7', '#fd79a8'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Загрузка изображения
    const imageUpload = document.getElementById('imageUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileName = document.getElementById('fileName');
    
    uploadBtn.addEventListener('click', () => imageUpload.click());
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    window.currentImage = img;
                    window.drawMeme();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Обработка изменения текста и настроек
    document.getElementById('topText').addEventListener('input', window.drawMeme);
    document.getElementById('bottomText').addEventListener('input', window.drawMeme);
    document.getElementById('textSize').addEventListener('input', window.drawMeme);
    document.getElementById('textColor').addEventListener('input', window.drawMeme);
    
    // Кнопка генерации
    document.getElementById('generateBtn').addEventListener('click', window.drawMeme);
    
    // Кнопка скачивания
    document.getElementById('downloadBtn').addEventListener('click', function() {
        if (window.currentImage) {
            const canvas = document.getElementById('memeCanvas');
            const link = document.createElement('a');
            link.download = 'my-meme.png';
            link.href = canvas.toDataURL();
            link.click();
        } else {
            alert('Сначала загрузите изображение!');
        }
    });
    
    // Кнопка очистки
    document.getElementById('clearBtn').addEventListener('click', function() {
        document.getElementById('topText').value = '';
        document.getElementById('bottomText').value = '';
        document.getElementById('imageUpload').value = '';
        document.getElementById('fileName').textContent = 'Файл не выбран';
        window.currentImage = null;
        window.drawPlaceholder();
    });
    
    // Табы тематических мемов
    document.querySelectorAll('.theme-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.theme-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const theme = this.getAttribute('data-theme');
            loadThemes(theme);
        });
    });
}
