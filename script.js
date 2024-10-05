// عرض رسالة ترحيبية عند الضغط على زر
document.addEventListener("DOMContentLoaded", function() {
    // إنشاء زر جديد
    const button = document.createElement("button");
    button.innerHTML = "اضغط هنا للترحيب";
    button.id = "welcomeButton"; // إضافة معرف للزر
    document.body.appendChild(button);

    // تعريف دالة الترحيب
    function showWelcomeMessage() {
        alert("مرحباً بك في موقعي!");
    }

    // إضافة مستمع الحدث للزر
    button.addEventListener("click", showWelcomeMessage);
});
