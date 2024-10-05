document.addEventListener("DOMContentLoaded", function() {
    function showSingleArticle(articleId) {
        const articleCard = document.getElementById(articleId);
        const mainContent = document.getElementById("main-content");
        
        // إخفاء جميع المقالات وإظهار المقالة المختارة فقط
        mainContent.innerHTML = '';

        // نسخ المقالة المختارة وإضافتها إلى الصفحة
        const singleArticle = articleCard.cloneNode(true);
        singleArticle.classList.add('single-article');
        singleArticle.querySelector('.extra-content').style.display = "block"; // عرض المحتوى الكامل
        singleArticle.querySelector('.summary-content').style.display = "none"; // إخفاء الملخص
        
        mainContent.appendChild(singleArticle);

        // إضافة زر رجوع
        const backButton = document.createElement('button');
        backButton.innerHTML = "رجوع";
        backButton.className = "back-btn";
        backButton.onclick = function() {
            location.reload(); // إعادة تحميل الصفحة لعرض جميع المقالات مرة أخرى
        };
        mainContent.appendChild(backButton);
    }

    // ربط المقالات القابلة للنقر بالوظيفة
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            showSingleArticle(this.id);
        });
    });
});
