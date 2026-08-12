// ==========================================
// DEZA SHOP - MAIN SCRIPT
// ==========================================

// 1. إعداد الاتصال بـ Supabase
const SUPABASE_URL = 'https://qbduokaisfafdkuzkfuv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Z_A7NQrSg19SVV80FJquVQ_pxQJtRHq';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// 2. دالة جلب وعرض الهواتف
async function loadPhones() {
    const container = document.getElementById('productsContainer');
    const emptyMsg = document.getElementById('emptyProducts');

    try {
        const { data: phones, error } = await supabaseClient
            .from('phones')
            .select('*');

        if (error) throw error;

        container.innerHTML = ''; // تنظيف الحاوية

        if (!phones || phones.length === 0) {
            emptyMsg.style.display = 'block';
        } else {
            emptyMsg.style.display = 'none';
            phones.forEach(phone => {
                const phoneCard = `
                    <div class="product-card">
                        <img src="${phone.image_url}" alt="${phone.name}">
                        <h3>${phone.name}</h3>
                        <p class="price">${phone.price} دج</p>
                        
                        <button class="buy-button"><a href="https://wa.me/213551754317?text=مرحباً، أود الاستفسار عن شراء هذا المنتج" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; background-color: #25D366; color: #ffffff; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width: 20px; height: 20px; margin-left: 8px;">
    شراء الآن
</a></button>
                    </div>
                `;
                container.innerHTML += phoneCard;
            });
        }
    } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
    }
}

// 3. تشغيل الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    loadPhones();
});

// دالة للانتقال لقسم المنتجات
function goToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === "") {
            console.log("حقل البحث فارغ");
            return;
        }

        console.log("جاري البحث عن الكلمة:", query);
        
        // --- ضع هنا كود البحث الخاص بمنتجات ديزاد شوب ---
        // مثال لتصفية عناصر موجودة في الصفحة:
        /*
        const products = document.querySelectorAll(".product-card"); // غيرها حسب اسم كلاس المنتجات عندك
        products.forEach(product => {
            const title = product.textContent.toLowerCase();
            if (title.includes(query)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
        */
    }

    // البحث عند الضغط على زر "بحث"
    if (searchBtn) {
        searchBtn.addEventListener("click", performSearch);
    }

    // البحث مباشرة أثناء الكتابة (اختياري)
    if (searchInput) {
        searchInput.addEventListener("input", performSearch);
        
        // البحث أيضاً عند الضغط على مفتاح Enter من لوحة المفاتيح
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }
});