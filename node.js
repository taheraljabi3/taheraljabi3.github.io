fetch('http://localhost:3000/proxy/messagebird-widget')
  .then(response => response.json())  // تحويل الرد إلى JSON
  .then(data => {
    console.log('الرد من الخادم:', data);  // عرض الرد في الكونسول

    // التحقق من وجود خطأ في الرد
    if (data.errors) {
      console.error('حدث خطأ في الطلب:', data.errors);
    } else {
      console.log('تم تحميل الودجت بنجاح');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = JSON.stringify(data);  // فقط إذا كان الرد JavaScript صالح
      document.head.appendChild(script);
    }
  })
  .catch(error => console.error('حدث خطأ:', error));
