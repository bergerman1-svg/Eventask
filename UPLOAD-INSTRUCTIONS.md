# הוראות העלאה לגיטהאב — צעד צעד

תיקייה זו מוכנה לחלוטין לפריסה. אין צורך לשנות כלום.

## אפשרות 1: דרך הממשק של גיטהאב (הכי פשוט, ללא טרמינל)

1. היכנס ל-https://github.com/new
2. שם הריפו: `eventask`
3. בחר Private (פרטי) או Public (ציבורי) לפי העדפתך
4. **אל תסמן** את האפשרויות "Add README", "Add .gitignore", "Add LICENSE" (יש לנו)
5. לחץ **Create repository**
6. בעמוד שנפתח לחץ על **uploading an existing file**
7. גרור את כל התוכן של תיקייה זו (`index.html`, `README.md`, `LICENSE`, `.gitignore`, `logos/`) לתוך הדפדפן
8. כתוב הודעת commit: `Initial commit: Eventask MVP`
9. לחץ **Commit changes**

זהו! הקבצים בריפו.

## אפשרות 2: דרך הטרמינל

פתח טרמינל בתיקייה הזו והרץ:

```bash
cd ~/Desktop/EVENTASK/eventask-release

git init -b main
git config user.email "bergerman1@gmail.com"
git config user.name "Avi Berger"

git add -A
git commit -m "Initial commit: Eventask MVP"

# צור ריפו ב-https://github.com/new בשם eventask
# החלף YOUR_USERNAME בשם המשתמש שלך
git remote add origin https://github.com/YOUR_USERNAME/eventask.git
git push -u origin main
```

אם תתבקש סיסמה — צריך Personal Access Token (לא הסיסמה הרגילה):
- היכנס ל-https://github.com/settings/tokens
- Generate new token (classic)
- הרשאה: סמן `repo`
- העתק את ה-token והשתמש בו במקום סיסמה

## הפעלת GitHub Pages (לאתר חי)

לאחר העלאת הקוד:

1. בעמוד הריפו: **Settings** → **Pages**
2. תחת "Source": בחר **Deploy from a branch**
3. תחת "Branch": בחר **main** ותיקייה **/(root)**
4. לחץ **Save**

תוך 1-3 דקות הקישור יופיע למעלה:
`https://YOUR_USERNAME.github.io/eventask/`

זאת הכתובת שתשתף עם הצוות שלך.

## בדיקה לפני העלאה

לפני שמעלים, ודא שהאפליקציה עובדת:

1. לחץ פעמיים על `index.html` בתיקייה זו
2. הדפדפן יפתח את האתר
3. נסה ליצור אירוע, להוסיף פעילות, לשנות סטטוס
4. אם הכל עובד — מוכן להעלאה

## תמיכה

אם משהו לא עובד אחרי ההעלאה:

- ודא שהשם של הקובץ הראשי הוא בדיוק `index.html` (אותיות קטנות)
- ודא שהתיקייה `logos/` הועלתה עם הקובץ `Eventask-logo.png`
- אם GitHub Pages לא טוען, בדוק שהבחירה ב-Settings → Pages היא Source: main, /(root)
