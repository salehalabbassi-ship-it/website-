# NEXA Workspace

<div dir="rtl">

**ملخص سريع بالعربية**

نكسا ووركسبيس هي أداة داخلية لفريق نكسا لإدارة العملاء المحتملين والمشاريع وعروض الأسعار والمتابعات والمحادثات والقوالب.
تُحفظ جميع البيانات في ملف Google Sheets داخل حسابكم في Google، ويعمل الموقع عبر سكربت Google Apps Script.

خطوات التشغيل باختصار:
1. افتح ملف Google Sheets (يمكن استخدام نفس الملف الذي يستقبل رسائل نموذج التواصل في الموقع حالياً).
2. من القائمة: الإضافات ← Apps Script، والصق محتوى الملف `Code.gs` بدلاً من السكربت القديم، وانسخ إعدادات `appsscript.json`.
3. شغّل الدالة `setupNexa` مرة واحدة ووافق على الصلاحيات؛ ستصلك كلمة مرور مؤقتة على بريدك.
4. انشر السكربت كتطبيق ويب (التنفيذ باسمي — الوصول: أي شخص) وانسخ الرابط.
5. الصق الرابط في الملف `admin/js/config.js` وفي ملف الموقع `script.js`، ثم ارفع التعديلات.
6. افتح `موقعك/admin` وسجّل الدخول، ثم غيّر كلمة المرور وأضف أعضاء الفريق من الإعدادات.

بعد ذلك تصل كل رسالة من نموذج التواصل في الموقع تلقائياً كعميل محتمل جديد مع إشعار بالبريد.

</div>

---

NEXA Workspace is the team's private tool for leads, projects, proposals, follow-ups, conversations and templates.
It works on phones and computers, in English and Arabic. Your data is stored in **a Google Sheet in your own Google account**,
connected through a small Google Apps Script (the file `apps-script/Code.gs`).

## Set it up (about 15 minutes, once)

1. **Open the Google Sheet.**
   You can use the same Google Sheet that receives the website's contact form today, or create a new one
   (sheets.new). The new script **replaces** the old contact-form script: from now on every website enquiry
   automatically becomes a **Lead** in the workspace (and you still get an email for each one).
   Old tabs and rows in the sheet are not touched.

2. **Add the script.**
   In the sheet: **Extensions → Apps Script**.
   - Open `Code.gs` in the editor, delete everything in it (this removes the old contact-form code) and paste the full
     contents of [`apps-script/Code.gs`](apps-script/Code.gs). Click **Save**.
   - Click **Project Settings** (gear icon) → tick **Show "appsscript.json" manifest file in editor**.
     Go back to the **Editor**, open `appsscript.json`, replace its contents with
     [`apps-script/appsscript.json`](apps-script/appsscript.json) and **Save**.

3. **Run the setup once.**
   In the editor's toolbar choose the function **`setupNexa`** and click **Run**.
   Google asks for permission the first time: **Review permissions** → choose your account →
   (if you see "Google hasn't verified this app": **Advanced → Go to … (unsafe)** — it is your own script) → **Allow**.
   Setup creates the tabs (Leads, Projects, Proposals, FollowUps, Templates, Conversations, Settings, Users)
   and your admin account. Your **temporary password** appears in the **Execution log** and is also **emailed to you**.
   Running setup again is safe — it never deletes or resets anything.

4. **Publish it as a web app.**
   **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy**, then **copy the Web app URL** (it ends with `/exec`).
   ("Anyone" is required so the website form and the app can reach it; all workspace data still requires a sign-in.)

5. **Connect the website and the workspace to that URL.** Paste the same URL in two places:
   - `admin/js/config.js` → `API_URL: "https://script.google.com/macros/s/…/exec"`
   - `script.js` (the public website) → `var ENDPOINT = "https://script.google.com/macros/s/…/exec";`

   Commit and push the change to GitHub. The site updates in a minute or two.

6. **Sign in.** Open `https://<your-site>/admin/`, sign in with your email and the temporary password.
   Then go to **Settings**: change your password, check the company details (name, phone, VAT/CR, bank), and **add your team**
   (each person gets an email with their own temporary password).

Optional: at the top of `Code.gs` you can set `WORKSPACE_URL` (your `/admin/` address, used for links in emails) and
`NOTIFY_EMAIL` (where website enquiries are sent; by default the company email in Settings).

## Updating the script later

When you get a new version of `Code.gs`: paste it in the editor and Save, then
**Deploy → Manage deployments** → pencil (edit) icon → Version: **New version** → **Deploy**.
The URL stays the same, so nothing else needs to change.
(Using "New deployment" instead would create a new URL that you'd have to paste again.)

## Users and passwords

- **Admin**: everything, including deleting records, Settings and managing users.
- **Staff**: can add and edit leads, projects, proposals, follow-ups, conversations and templates, and send emails — but cannot delete, change Settings or manage users.
- Forgot a password? An admin can set a new one in Settings → Team. If no admin can sign in, open the Google Sheet and use the menu
  **NEXA Workspace → Reset a user's password…** (a new temporary password is shown and emailed).
  The same menu can also add a user.
- Sign-ins last 30 days. Changing or resetting a password signs that person out on other devices.

## Demo mode

If `API_URL` in `admin/js/config.js` is empty, the workspace runs in **demo mode** with sample data, saved only in that
browser (sign in with `admin@nexa.demo` / `demo`). Nothing is shared with the team and emails open your mail app instead
of being sent. It's useful for trying things out; switch to the Google Sheet for real work.

## Backups

- **The Google Sheet is your database.** Each record is one readable row, so you can view, filter or fix data directly
  (keep the first row — the column names — as it is). Use **File → Make a copy** or **File → Download → Excel** for a backup;
  Google also keeps **Version history** (File → Version history).
- In the workspace, **Settings → Export** downloads everything as a JSON file.

## Security notes

- The `/admin/` page is hidden from search engines (`noindex`), but what protects it is the **sign-in**: without a valid
  account the script returns no data.
- Data lives in your Google account; emails are sent from the Google account that deployed the script (with replies going to the team member who sent them).
- Passwords are stored only as salted hashes (in the hidden columns of the Users tab) and are never sent back to the app.
- Staff cannot delete data or change users/settings. Repeated wrong passwords are blocked for 15 minutes.
- Don't share the Google Sheet itself with people who shouldn't see all the data — anyone with edit access to the sheet can see and change everything in it.

## What's inside (9 sections)

| Section | What it does |
|---|---|
| **Dashboard** | Today at a glance: new leads, follow-ups due, open proposals, active projects and the sales pipeline. |
| **Leads** | Every enquiry (website, WhatsApp, referrals, Instagram…) moving through the stages New → Contacted → Meeting → Proposal → Won / Lost. Website enquiries arrive here automatically. |
| **Projects** | Won work: status, dates, value and payments received, progress and task checklists. |
| **Proposals** | Bilingual quotations with items, VAT, discount, scope, exclusions and payment terms — ready to print / save as PDF and send. |
| **Follow-ups** | Calls, WhatsApps, emails, meetings and site visits with due dates, so no client is forgotten. |
| **Templates** | Reusable message templates (WhatsApp/email with placeholders like the client's name), proposal templates, project checklists and document links. |
| **Conversations** | A log of every contact with a client; send WhatsApp messages or emails straight from the app and they're logged automatically. |
| **Analysis** | Conversion rates, pipeline value, lead sources, services and team performance. |
| **Settings** | Company details, VAT, numbering, stages/services/sources lists, team members and passwords, data export. |
