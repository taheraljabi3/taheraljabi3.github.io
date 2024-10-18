newFunction();
function newFunction() {
    var MessageBirdChatWidgetSettings = {
        widgetId: 'fb5d0fb5-7211-481a-8ec3-969d54231815',
        initializeOnLoad: true,
    };

    !function () {
        "use strict";
        if (Boolean(document.getElementById("live-chat-widget-script")))
            console.error("MessageBirdChatWidget: Snippet loaded twice on page");
        else {
            window.MessageBirdChatWidget = {};
            window.MessageBirdChatWidget.queue = [];

            // تجهيز دوال MessageBird widget
            var methods = ["init", "setConfig", "toggleChat", "identify", "hide", "on", "shutdown"];
            for (let d = 0; d < methods.length; d++) {
                const method = methods[d];
                window.MessageBirdChatWidget[method] = function () {
                    const args = Array.from(arguments);
                    window.MessageBirdChatWidget.queue.push([[method, args]]);
                };
            }

            // تحميل سكربت MessageBird
            var widgetId = (window.MessageBirdChatWidgetSettings || {}).widgetId || "";
            var loadWidget = function () {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = `https://livechat.messagebird.com/bootstrap.js?widgetId=${widgetId}`;
                script.async = true;
                script.id = "live-chat-widget-script";
                var firstScript = document.getElementsByTagName("script")[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            };
            if (document.readyState === "complete") loadWidget();
            else window.addEventListener("load", loadWidget, false);

            // جعل الودجت قابلاً للسحب
            window.MessageBirdChatWidget.on('ready', () => {
                const widget = document.getElementById('live-chat-widget-script').parentElement;
                makeWidgetDraggable(widget);
            });

            function makeWidgetDraggable(element) {
                let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

                element.onmousedown = (e) => {
                    e.preventDefault();
                    mouseX = e.clientX;
                    mouseY = e.clientY;

                    document.onmouseup = stopDragging;
                    document.onmousemove = startDragging;
                };

                function startDragging(e) {
                    posX = mouseX - e.clientX;
                    posY = mouseY - e.clientY;
                    mouseX = e.clientX;
                    mouseY = e.clientY;

                    element.style.top = (element.offsetTop - posY) + "px";
                    element.style.left = (element.offsetLeft - posX) + "px";
                }

                function stopDragging() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }

            // إعداد الصوت باستخدام Howler.js
            const notificationSound = new Howl({
                src: ['https://www.soundjay.com/button/beep-07.mp3'], // رابط الصوت
                volume: 0.5
            });

            // تشغيل الصوت عند استقبال رسالة جديدة
            window.MessageBirdChatWidget.on('message', () => {
                notificationSound.play();
            });
        }
    } ();
}

