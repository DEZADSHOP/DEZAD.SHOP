// إعدادات الاتصال بمشروعك (Supabase)
const SUPABASE_URL = "https://qbduokaisfafdkuzkfuv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Z_A7NQrSg19SVV80FJquVQ_pxQJtRHq";

// تهيئة عميل Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() {
    var loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async function() {
            var email = document.getElementById('loginEmail').value.trim();
            var password = document.getElementById('loginPass').value.trim();
            var errorMsg = document.getElementById('errorMsg');

            // 1. التحقق من أن الحقول ليست فارغة
            if (email === "" || password === "") {
                if (errorMsg) {
                    errorMsg.textContent = "الرجاء إدخال البريد وكلمة المرور!";
                    errorMsg.style.display = "block";
                }
                return;
            }

            // إخفاء رسالة الخطأ إن وجدت
            if (errorMsg) {
                errorMsg.style.display = "none";
            }

            // 2. التحقق من صحة البريد وكلمة المرور عبر Supabase Auth
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                // إذا كانت كلمة المرور أو البريد خطأ، أظهر رسالة الخطأ واوقف التنفيذ
                if (errorMsg) {
                    errorMsg.textContent = "خطأ: البريد الإلكتروني أو كلمة المرور غير صحيحة!";
                    errorMsg.style.display = "block";
                }
                return;
            }

            // 3. إذا كانت البيانات صحيحة تماماً، الانتقال للصفحة الرئيسية
            window.location.href = "index.html";
        });
    }
});