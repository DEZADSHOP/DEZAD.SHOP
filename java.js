// بيانات الاتصال بقاعدة بيانات Supabase الخاصة بك
const SUPABASE_URL = "https://qbduokaisfafdkuzkfuv.supabase.co";
const SUPABASE_KEY = "sb_publishable_Z_A7NQrSg19SVV80FJquVQ_pxQJtRHq";
const WHATSAPP_NUMBER = "+21355754317"; // استبدل X برقم هاتفك الحقيقي (مثال: 213612345678)

async function fetchPhones() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/phones?select=*`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error('فشل في جلب البيانات من قاعدة البيانات');
        }

        const phones = await response.json();
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '';

        if (phones.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px;">لا توجد هواتف متوفرة حالياً في المتجر</p>';
            return;
        }

        phones.forEach(phone => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // رابط الواتساب المباشر مع رسالة جاهزة باسم الهاتف والسعر
            const whatsappMsg = encodeURIComponent(`مرحباً DEZA SHOP، أريد الاستفسار وشراء هاتف ${phone.name} بسعر ${phone.price} دج`);
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

            card.innerHTML = `
                <img src="${phone.image_url}" alt="${phone.name}">
                <h3>${phone.name}</h3>
                <div class="price">${phone.price} دج</div>
                <a href="${whatsappLink}" class="buy-btn" target="_blank">
                    اشتري الآن <i class="fab fa-whatsapp"></i>
                </a>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("خطأ:", error);
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #e74c3c; padding: 40px;">حدث خطأ أثناء تحميل الهواتف. تأكد من صحة اسم الجدول في Supabase (يجب أن يكون باسم phones)</p>';
    }
}

// تنفيذ الجلب عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", fetchPhones);
