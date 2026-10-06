/* Asaf Tal portfolio: static site generator.
   The same buildSite() runs locally (node build.js) and inside the Wix deploy call. */
function buildSite() {
  var MEDIA = 'https://static.wixstatic.com/media/';
  var IMG = {
    beeinayim: '118c37_fde34415a25e4782ac20271bd53f0476~mv2.jpg',
    savta: '118c37_f68ff8fdfabf43dfa046fd441460e721~mv2.png',
    him: '118c37_fe42e85b95014895bdb8518d29ebfa76~mv2.png',
    news: '118c37_ef40d122348146b59623c285fc825df0~mv2.png',
    gei: '118c37_4a4aeeee53244f6894d7be5574c72159~mv2.jpg',
    daltim: '118c37_35e30ea1e4fe499c9344a6463f27d15f~mv2.jpg',
    baam: '118c37_8e8fc22bb9ef4d78a7ca2be8258d0d47~mv2.jpg'
  };
  var VIDEO = 'https://video.wixstatic.com/video/';
  var VID = {
    savta: VIDEO + '118c37_52b5bc1cbcba4cf698ad119b4b2b3c76/480p/mp4/file.mp4',
    news: VIDEO + '118c37_f3f757c20c04468c9a2b4dbd6df034c6/480p/mp4/file.mp4',
    him: VIDEO + '118c37_7962c8743a984cb89ec158d651ad122a/480p/mp4/file.mp4',
    himFull: VIDEO + '118c37_0e70fe4d72134b44becf93da8f808d46/720p/mp4/file.mp4',
    himStill: MEDIA + '118c37_0e70fe4d72134b44becf93da8f808d46f000.jpg',
    head: VIDEO + '118c37_079e7a0640dd427ea74019c7fc20bfef/file',
    headStill: MEDIA + '118c37_079e7a0640dd427ea74019c7fc20bfeff000.jpg'
  };

  function pic(id, w, h) {
    var ext = id.split('.').pop();
    return MEDIA + id + '/v1/fill/w_' + w + ',h_' + h + ',al_c,q_85,enc_auto/image.' + ext;
  }
  function poster(id, w) { return pic(id, w, Math.round(w * 16 / 9)); }
  function ytImg(id, q) { return 'https://i.ytimg.com/vi/' + id + '/' + (q || 'maxresdefault') + '.jpg'; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function warnPhrase(list) {
    return list.length > 1 ? list.slice(0, -1).join(', ') + ' ו' + list[list.length - 1] : list[0];
  }

  var GROUPS = { works: 'מהלימודים', exhibitions: 'תערוכות' };

  var WORKS = [
    {
      slug: 'beeinayim-atzumot', group: 'works', title: 'בעיניים עצומות', img: IMG.beeinayim, yt: 'SEmAk0paDJo',
      length: '8:34', genre: 'עלילתי', warn: ['מיניות', 'פגיעה עצמית מרומזות'], role: 'במאי, תסריטאי, עורך ואפקטים מיוחדים',
      cap: [['8:34', 1], ['עלילתי']],
      about: ['״בעיניים עצומות״ היה ההתנסות הראשונה שלי בכתיבת תסריט, בימוי ועריכת סרט. ניסיתי ליצור גיבור מעורר הזדהות אך פגום, שסיפורו מסופר עם שפה צורנית מאוד מאופיינת ועריכה שלא מאפשרת לצופה להישאר אדיש.'],
      challenges: ['2.5 ימי צילום בלבד (דרישות האוניברסיטה)', 'השתלטות על סט עם הרבה אנשי צוות', 'שינוי תסריט באמצעות עריכה']
    },
    {
      slug: 'sipurei-savta', group: 'works', title: 'סיפורי סבתא', img: IMG.savta, prev: VID.savta, yt: 'MViNhFOE76c',
      length: '12:48', genre: 'דוקו היברידי', role: 'במאי, צלם, עורך',
      cap: [['12:48', 1], ['דוקו היברידי']],
      about: ['״סיפורי סבתא״ הוא סרט דוקו-היברידי אישי שמנסה ללכוד את האישיות של סבתא שלי ולהגשים לה חלום רב שנים נגוז, באמצעות העשייה הקולנועית.'],
      challenges: ['השתלטות על חומר גלם רב מאוד בחדר העריכה', 'פיצוח נראטיב הסרט באמצעות עריכה', 'בימוי של שחקנית לא מקצועית']
    },
    {
      slug: 'him', group: 'works', title: 'Him', noun: 'סרטון', img: IMG.him, prev: VID.him, video: VID.himFull, still: VID.himStill,
      length: '2:46', genre: 'וידאו-ארט', warn: ['עירום', 'אורות מהבהבים'], role: 'במאי, צלם, תאורן, עורך',
      cap: [['2:46', 1], ['וידאו-ארט']],
      about: ['וידאו-ארט קצר ומוזר שמספר את סיפורו של יצור שנתקע בחלל שזר לו ומנסה למצוא את דרכו החוצה.'],
      challenges: ['מציאת לוקיישן לצילומים', 'צילומים בזמן קצר ומוגבל']
    },
    {
      slug: 'hamahadura-hamerkazit', group: 'works', title: 'כותרות המהדורה המרכזית', img: IMG.news, prev: VID.news, yt: '15I7m9ezOfY',
      length: '12:13', genre: 'דוקו בדיוני', role: 'במאי, תסריטאי ומפיק בפועל שותף, עורך',
      cap: [['12:13', 1], ['דוקו בדיוני']],
      about: [
        'הרחבה של עבודה שיצרתי יחד עם סטודנטית מהמחלקה לאמנות בבצלאל, ליאור בן אברהם.',
        'הפרויקט מתחיל בסיכום שנה של 2026 – יצירת דוקו בדיונית המשתמשת בשפה ובאסתטיקה של חדשות ערוץ 12 ומערבבת בין ידיעות חדשותיות אמיתיות לבין ידיעות מפוברקות, על מנת ליצור מסמך היסטורי של מציאות אלטרנטיבית, שלאט לאט מתדרדרת לתוך סיפורו האישי של אחד השחקנים המשתתפים בסרט, שמאבד גם הוא אחיזה בין המציאות לבדיון.'
      ],
      challenges: ['עבודה עם שחקן', 'יצירת קאטים רבים בעריכה, שונים בתכלית אחד מהשני, עד שדייקנו והגענו לגרסה הסופית', 'שחזור אריזה גרפית ושפה של חדשות ערוץ 12'],
      related: { slug: 'bezalel-baam', text: 'גרסה מקוצרת של העבודה (2:20) הוצגה בתערוכת ״בצלאל בעם״.', cta: 'לגרסה המקוצרת' }
    },
    {
      slug: 'gei-ben-hinnom', group: 'exhibitions', title: 'גיא בן הינום', img: IMG.gei, yt: 'vBSJFvrqEQk',
      event: 'תערוכת ״בחזרה אל הטבע – חיים לאחר הרס וחורבן״, במסגרת פסטיבל בכורות 2024', venue: 'אקדמיה בצלאל', date: '25.12.24',
      hover: 'מפיק התערוכה, צלם דימוי הפוסטר ויוצר עבודה בה',
      cap: [['״בחזרה אל הטבע״'], ['25.12.24']],
      aboutTitle: 'על התערוכה',
      about: ['הצבת וידאו דוקומנטרית כיתתית על פיסות טבע ירושלמי גלויות ונסתרות, מן ההווה ומן העבר, מודרניות ועתיקות.'],
      roles: ['מפיק התערוכה ועוזר אישי של המרצה האוצרת.', 'צילום דימוי לפוסטר של התערוכה.', 'השתתפות בתערוכה עם פרויקט אישי על גיא בן הינום, שכלל הגעה פיזית לארכיון כאן 11 בירושלים ומציאת קטעים רלוונטיים ממנו עבור הפרויקט שלי לתערוכה.']
    },
    {
      slug: 'hagira', group: 'exhibitions', title: 'הגירה', img: IMG.daltim,
      event: 'תערוכת ״דלתים״', venue: 'גלריית המפעל, ירושלים', date: '10-12.6.25',
      hover: 'יצירת עבודה לתערוכה',
      cap: [['״דלתים״'], ['10-12.6.25']],
      aboutTitle: 'על התערוכה',
      about: ['התערוכה הציגה יצירות והצבות וידאו תלויות מקום, שהגיבו לשכבות התרבותיות והאורבניות המורכבות של ירושלים, בייחוד תחושות של שייכות וזרות בין מזרח ומערב העיר.'],
      work: ['פרויקט אישי שחוקר את התחושות והאתגרים של הגירה והשתלבות במדינה חדשה, תוך הצגת הפחדים, המאבקים והגילוי העצמי שלעיתים מתרחשים ללא ביטוי חיצוני.'],
      roleText: 'יצירת עבודה לתערוכה יחד עם סטודנטית נוספת מהכיתה, פולינה סקובלוב.'
    },
    {
      slug: 'bezalel-baam', group: 'exhibitions', title: 'כותרות המהדורה המרכזית', img: IMG.baam, yt: 'j_vcOg7rgZ0',
      event: 'תערוכת ״בצלאל בעם״, במסגרת פסטיבל בכורות 2026', venue: 'בית העם, ירושלים', date: '19-20.5.26',
      length: '2:20', role: 'במאי, תסריטאי ומפיק בפועל שותף, עורך',
      cap: [['״בצלאל בעם״'], ['19-20.5.26']],
      about: [
        'גרסה מקוצרת של עבודה שלאחר התערוכה המשכתי במסגרת הלימודים. העבודה נוצרה יחד עם סטודנטית מהמחלקה לאמנות בבצלאל, ליאור בן אברהם.',
        'העבודה מציגה כותרות מהדורת חדשות פיקטיביות הומוריסטיות, תוך שהיא מערבבת בין ידיעות חדשותיות שלרגע הראשון נדמות אמיתיות לחלוטין, לבין ידיעות מופרכות לחלוטין. מטרת העבודה היא להשתמש בפורמט של מהדורת חדשות כדי לבחון את הגבולות הנזילים שבין אמת לאשליה, ואת האופן שבו המדיה מעצבת את הזיכרון הקולקטיבי והאישי שלנו.'
      ],
      challenges: ['עבודה בצוות', 'שחזור אריזה גרפית ושפה של חדשות ערוץ 12'],
      related: { slug: 'hamahadura-hamerkazit', text: 'הגרסה המלאה של העבודה (12:13) נמצאת בעבודות מהלימודים.', cta: 'לגרסה המלאה' }
    }
  ];

  var ADS = [
    { slug: 'ad-rap-cut', yt: 'kz59Rgj0rN4', title: 'ווק טו ווק (ראפ קאט)', kind: 'תסריט לתחרות הפרסומות של הרשת', desc: 'כתיבת תסריט לפרסומת במסגרת תחרות פרסומות לרשת המזון ״ווק טו ווק״ (התחרות בוטלה לפני שהספקנו להגיש).' },
    { slug: 'ad-shavot', yt: 'JvSFg-V37B4', q: 'hqdefault', title: 'בונים עתיד עם שוות', kind: 'פרסומת לעמותת ״שוות״', desc: 'פרסומת לעמותה ללא מטרות רווח ״שוות״. בימוי וכתיבה במסגרת הלימודים בבצפר.' },
    { slug: 'ad-taamim', yt: 'eyJlZaUopFs', sensitive: 1, title: 'טעמים', kind: 'סדרת פרסומות לחנות מין', desc: 'מתוך סדרת פרסומות לחנות מין (עסק קטן). בימוי וכתיבה במסגרת הלימודים בבצפר.' },
    { slug: 'ad-lehagdil', yt: 'lSKNkcfPf6c', sensitive: 1, title: 'להגדיל?', kind: 'סדרת פרסומות לחנות מין', desc: 'מתוך סדרת פרסומות לחנות מין (עסק קטן). בימוי וכתיבה במסגרת הלימודים בבצפר.' },
    { slug: 'ad-ani-rotze', yt: 'dDx8KgjB1nw', sensitive: 1, title: 'אני רוצה...', kind: 'סדרת פרסומות לחנות מין', desc: 'מתוך סדרת פרסומות לחנות מין (עסק קטן). בימוי וכתיבה במסגרת הלימודים בבצפר.' }
  ];

  var CREDITS = [
    { h: 'עוזר הפקה', items: [
      { t: 'פרסומת לראש השנה של רשת ״אושר עד״', yt: 'lrmaysk-_nc' },
      { t: 'פרסומת לחנוכה של רשת ״אושר עד״', yt: '_cYkNKOriy4' },
      { t: 'סרט קצר – ״יום השואה״, בבימויו של יבגני גראטוול' },
      { t: 'פיצ׳ר – ״זברות״, בבימויה של שירן שהרבני' }
    ] },
    { h: 'מפיק', items: [
      { t: 'סרט קצר – ״חללית״, בבימויה של מאיה לביא' }
    ] }
  ];

  var CSS = String.raw`
:root{--black:#000;--ink:#f2eee6;--mute:#a39e95;--faint:#77726b;--yellow:#e8c232;--rec:#e5483b;--line:rgba(242,238,230,.15);--panel:#161616;
--display:'Secular One','Heebo',sans-serif;--body:'Heebo',system-ui,-apple-system,'Segoe UI',Arial,sans-serif;--tc:'Space Mono',ui-monospace,Menlo,Consolas,monospace;
--gutter:clamp(18px,4vw,56px);--max:1320px;--bar:68px;--ease:cubic-bezier(.2,.8,.2,1)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:calc(var(--bar) + 12px)}
body{margin:0;background:var(--black);color:var(--ink);font:400 17px/1.7 var(--body);-webkit-font-smoothing:antialiased}
img,video{display:block;max-width:100%}
a{color:inherit}
h1,h2,h3,p,ul,dl,dd,figure{margin:0}
ul{padding:0;list-style:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
:focus-visible{outline:2px solid var(--yellow);outline-offset:3px}
::selection{background:var(--yellow);color:#000}
.wrap{max-width:var(--max);margin-inline:auto;padding-inline:var(--gutter)}
.skip{position:fixed;top:-120px;inset-inline-start:12px;z-index:100;background:var(--yellow);color:#000;padding:10px 16px;font-weight:700;text-decoration:none}
.skip:focus{top:12px}
.tc{font-family:var(--tc);direction:ltr;unicode-bidi:isolate;font-variant-numeric:tabular-nums;letter-spacing:.02em}

/* top bar */
.bar{position:fixed;inset:0 0 auto;z-index:50;height:var(--bar);display:flex;align-items:center;gap:28px;padding-inline:var(--gutter);background:linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,0));border-bottom:1px solid transparent;transition:background-color .3s,border-color .3s;view-transition-name:bar}
.bar.solid{background:rgba(0,0,0,.9);border-color:var(--line);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.brand{font:400 25px/1 var(--display);color:var(--yellow);text-decoration:none;white-space:nowrap}
.nav{display:flex;align-items:center;gap:26px;margin-inline-start:auto}
.nav a{font-size:15px;color:var(--mute);text-decoration:none;padding:6px 0;border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
.nav a:hover{color:var(--ink);border-color:var(--yellow)}
.nav a.pill{color:#000;background:var(--yellow);border:0;border-radius:99px;padding:9px 18px;font-weight:700}
.nav a.pill:hover{background:var(--ink)}
.menu{display:none;margin-inline-start:auto;border:1px solid var(--line);border-radius:99px;padding:7px 18px;font-size:15px}

/* buttons */
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
.btn{display:inline-flex;align-items:center;gap:12px;min-height:50px;padding:0 26px;border-radius:99px;border:2px solid var(--yellow);font:700 16px/1 var(--body);text-decoration:none;transition:background-color .2s,color .2s,border-color .2s}
.btn--solid{background:var(--yellow);color:#000}
.btn--solid:hover{background:var(--ink);border-color:var(--ink)}
.btn--ghost{color:var(--yellow)}
.btn--ghost:hover{background:var(--yellow);color:#000}
.tri{display:inline-block;width:0;height:0;border-style:solid;border-width:7px 0 7px 12px;border-color:transparent transparent transparent currentColor}

/* hero: a live camera viewfinder */
.hero{position:relative;isolation:isolate;min-height:100vh;min-height:100svh;display:grid;align-items:center;padding:calc(var(--bar) + 64px) var(--gutter) 120px;overflow:hidden}
.hero::before{content:"";position:absolute;inset:0;z-index:-2;background:radial-gradient(48% 58% at 24% 50%,rgba(232,194,50,.15),transparent 72%)}
.vf{position:absolute;inset:calc(var(--bar) + 14px) var(--gutter) 30px;z-index:-1;pointer-events:none}
.vf i{position:absolute;width:34px;height:34px;border:2px solid rgba(242,238,230,.5)}
.vf i:nth-child(1){top:0;left:0;border-right:0;border-bottom:0}
.vf i:nth-child(2){top:0;right:0;border-left:0;border-bottom:0}
.vf i:nth-child(3){bottom:0;left:0;border-right:0;border-top:0}
.vf i:nth-child(4){bottom:0;right:0;border-left:0;border-top:0}
.osd{position:absolute;top:calc(var(--bar) + 34px);display:flex;align-items:center;gap:14px;direction:ltr;font:400 14px/1 var(--tc);color:var(--mute);letter-spacing:.04em}
.osd--l{left:calc(var(--gutter) + 28px)}
.osd--r{right:calc(var(--gutter) + 28px)}
.rec{display:inline-flex;align-items:center;gap:8px;color:var(--ink)}
.rec::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--rec);animation:blink 1s steps(1) infinite}
.osd b{font-weight:400;color:var(--yellow)}
@keyframes blink{50%{opacity:0}}
.hero-grid{width:100%;max-width:var(--max);margin-inline:auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,88px)}
.hero h1{font:400 clamp(76px,12.6vw,188px)/.88 var(--display);letter-spacing:-.015em}
.hero .role{margin-top:20px;font:400 clamp(26px,3.3vw,46px)/1.15 var(--display);color:var(--yellow)}
.hero .line{margin-top:22px;max-width:34ch;text-wrap:pretty;font-size:clamp(17px,1.45vw,20px);line-height:1.6;color:var(--mute)}
.eye{justify-self:center;width:min(100%,470px);aspect-ratio:1}
.eye video{width:100%;height:100%;object-fit:contain;mix-blend-mode:lighten}
.ruler{position:absolute;inset:auto calc(var(--gutter) + 28px) 58px;height:16px;direction:ltr;
background:repeating-linear-gradient(90deg,rgba(242,238,230,.28) 0 1px,transparent 1px 12px) 0 100%/100% 6px no-repeat,repeating-linear-gradient(90deg,rgba(242,238,230,.55) 0 1px,transparent 1px 120px) 0 100%/100% 14px no-repeat}
.ruler i{position:absolute;bottom:-6px;top:-8px;left:0;width:2px;background:var(--yellow)}
.ruler i::before{content:"";position:absolute;top:-2px;left:-6px;border:7px solid transparent;border-top:10px solid var(--yellow);border-bottom:0}

/* rows of posters */
.row{padding-top:clamp(56px,7vw,104px)}
.row-head{display:flex;flex-wrap:wrap;align-items:baseline;column-gap:22px;row-gap:6px}
.row-head h2{font:400 clamp(34px,4.4vw,56px)/1.1 var(--display)}
.row-head p{color:var(--mute);font-size:16px}
.rail{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,262px));gap:22px;padding-block:30px 8px}
.card{position:relative;display:block;color:inherit;text-decoration:none;outline:none;transition:opacity .35s}
.card-media{position:relative;aspect-ratio:9/16;border-radius:6px;overflow:hidden;background:var(--panel);transition:transform .45s var(--ease),box-shadow .45s var(--ease)}
.card-media img,.card-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.card-media img{transition:transform 6s var(--ease)}
.card-media video{opacity:0;transition:opacity .4s}
.card.playing .card-media video{opacity:1}
.card-over{position:absolute;inset:auto 0 0;padding:64px 16px 16px;background:linear-gradient(to top,rgba(0,0,0,.94) 30%,rgba(0,0,0,0));opacity:0;transform:translateY(14px);transition:opacity .3s,transform .4s var(--ease)}
.card-over p{font-size:14px;line-height:1.45}
.card-go{display:inline-flex;align-items:center;gap:8px;margin-top:10px;font:700 14px/1 var(--body);color:var(--yellow)}
.card-go .tri{border-width:5px 0 5px 8px}
.badge{position:absolute;top:12px;inset-inline-start:12px;z-index:1;max-width:calc(100% - 24px);background:rgba(0,0,0,.78);color:var(--yellow);border:1px solid var(--yellow);border-radius:99px;padding:4px 10px;font:500 12px/1.25 var(--body)}
.card-cap{padding:14px 2px 0}
.card-cap h3{font:400 20px/1.25 var(--display)}
.card-cap p{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:5px;font-size:14px;line-height:1.4;color:var(--mute)}
.card-cap .tc{color:var(--ink)}
@media (hover:hover) and (pointer:fine){
  .rail:has(.card:hover) .card:not(:hover){opacity:.42}
  .card:hover{z-index:2}
  .card:hover .card-media,.card:focus-visible .card-media{transform:scale(1.045);box-shadow:0 0 0 2px var(--yellow),0 36px 70px -28px #000}
  .card:hover .card-over,.card:focus-visible .card-over{opacity:1;transform:none}
  .card:not(.has-prev):hover .card-media img{transform:scale(1.07)}
}
@media (hover:none),(pointer:coarse){.card-over{display:none}}

/* ads */
.rail--wide{grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))}
.rail--wide .card-media{aspect-ratio:16/9}
.play-dot{position:absolute;inset:0;margin:auto;width:60px;height:60px;border-radius:50%;background:rgba(0,0,0,.55);border:2px solid var(--ink);display:grid;place-items:center;transition:background-color .25s,border-color .25s,transform .35s var(--ease)}
.play-dot::after{content:"";margin-left:5px;border-style:solid;border-width:10px 0 10px 16px;border-color:transparent transparent transparent var(--ink)}
.card:hover .play-dot,.card:focus-visible .play-dot{background:var(--yellow);border-color:var(--yellow);transform:scale(1.08)}
.card:hover .play-dot::after,.card:focus-visible .play-dot::after{border-left-color:#000}
.rail--wide .card-media img{transition:transform .5s var(--ease),filter .5s}
.veil{position:absolute;inset:0;z-index:1;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px;text-align:center;background:rgba(0,0,0,.3)}
.veil b{font:400 21px/1.2 var(--display)}
.veil span{font-size:14px;line-height:1.4}
.rail.veiled .card--sensitive .veil{display:flex}
.rail.veiled .card--sensitive .card-media img{filter:blur(22px) brightness(.5);transform:scale(1.3)}
.rail.veiled .card--sensitive .play-dot{display:none}
.rail.veiled .card--sensitive:hover .card-media,.rail.veiled .card--sensitive:focus-visible .card-media{box-shadow:0 0 0 2px var(--ink)}

/* production credits */
.credits{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(28px,5vw,80px);margin-top:30px}
.credits h3{font:400 24px/1.2 var(--display);color:var(--yellow);padding-bottom:14px;border-bottom:1px solid var(--line)}
.credits li{padding:15px 0;border-bottom:1px solid var(--line)}
.credits a{text-decoration:underline;text-decoration-color:var(--yellow);text-decoration-thickness:2px;text-underline-offset:6px;transition:color .2s}
.credits a:hover{color:var(--yellow)}
.ext{display:inline-block;width:.8em;height:.8em;margin-inline-start:6px;vertical-align:-.05em;fill:none;stroke:currentColor;stroke-width:2.4}

/* about */
.about{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(36px,6vw,104px);margin-top:30px;align-items:start}
.bio p{max-width:58ch;margin-bottom:1.1em}
.bio p:first-child{font:500 clamp(20px,1.9vw,24px)/1.6 var(--body)}
.cv>section+section,.cv>section+.cv-grid{margin-top:36px}
.cv h3{font:400 22px/1.2 var(--display);color:var(--yellow);margin-bottom:6px}
.cv li{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:20px;padding:13px 0;border-bottom:1px solid var(--line)}
.cv li b{font-weight:500}
.cv li time{color:var(--mute);font-size:14px;white-space:nowrap;font-variant-numeric:tabular-nums;padding-top:3px}
.cv li p{grid-column:1/-1;color:var(--mute);font-size:15px;line-height:1.6;margin-top:2px}
.cv-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.cv-grid h3{margin-bottom:12px}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.cv .tags li{display:block;border:1px solid var(--line);border-radius:99px;padding:4px 14px;font-size:15px}
.cv-grid small{display:block;margin-top:8px;font-size:14px;color:var(--mute)}
.cv .tags li.suite{display:flex;flex-direction:column;gap:2px;border-radius:14px;padding:8px 16px}
.suite b{font-weight:700}
.suite span{font-size:14px;color:var(--mute)}
.reach{display:flex;flex-wrap:wrap;align-items:flex-end;align-items:last baseline;gap:22px clamp(36px,5vw,80px);margin-top:clamp(48px,6vw,84px);padding-top:30px;border-top:1px solid var(--line)}
.reach h3{font:400 24px/1.2 var(--display);color:var(--yellow)}
.reach dl{display:flex;flex-wrap:wrap;align-items:flex-end;align-items:last baseline;gap:20px clamp(28px,4vw,56px)}
.reach dt{font-size:13px;color:var(--mute);margin-bottom:4px}
.reach dd{font-size:17px;line-height:1.4;color:var(--yellow)}
.reach dd a{color:var(--yellow);text-decoration:underline;text-decoration-color:rgba(232,194,50,.45);text-decoration-thickness:1px;text-underline-offset:7px;transition:color .2s}
.reach dd a:hover{color:var(--ink)}

/* contact */
.contact{margin-top:clamp(72px,10vw,150px);padding-block:clamp(64px,8vw,120px) 64px;border-top:1px solid var(--line)}
.contact h2{font:400 clamp(46px,8.4vw,120px)/1 var(--display)}
.contact ul{display:grid;gap:22px;margin-top:40px}
.contact li a,.contact li span{font:400 clamp(26px,3.6vw,44px)/1.25 var(--display);text-decoration:none;transition:color .2s}
.contact li a:hover{color:var(--yellow)}
.contact small{display:block;font-size:14px;color:var(--mute)}
.foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-block:22px 34px;border-top:1px solid var(--line);color:var(--faint);font-size:14px}
.foot a{color:var(--mute);text-decoration:none}
.foot a:hover{color:var(--yellow)}

/* project page */
.title{position:relative;isolation:isolate;min-height:min(88vh,900px);display:flex;align-items:flex-end;padding:calc(var(--bar) + 48px) 0 clamp(36px,5vw,64px)}
.title-bg{position:absolute;inset:0;z-index:-1;overflow:hidden;background:#000}
.title-bg img{width:100%;height:100%;object-fit:cover;opacity:.62}
.title-bg--blur img{filter:blur(34px) saturate(1.15);transform:scale(1.25);opacity:.5}
.title-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,#000 3%,rgba(0,0,0,.55) 42%,rgba(0,0,0,.2) 75%,rgba(0,0,0,.55)),linear-gradient(to left,rgba(0,0,0,.82),rgba(0,0,0,0) 72%)}
.title-grid{width:100%;display:grid;grid-template-columns:minmax(0,1fr) clamp(190px,22vw,290px);gap:clamp(28px,5vw,80px);align-items:end}
.crumb{display:inline-block;margin-bottom:16px;color:var(--mute);font-size:15px;text-decoration:none;border-bottom:1px solid var(--line);padding-bottom:2px;transition:color .2s,border-color .2s}
.crumb:hover{color:var(--yellow);border-color:var(--yellow)}
.title h1{font:400 clamp(46px,7.2vw,110px)/1.02 var(--display);text-wrap:balance}
.event{margin-top:14px;font-size:clamp(17px,1.6vw,21px)}
.facts{display:flex;flex-wrap:wrap;gap:14px 34px;margin-top:24px}
.facts dt{font-size:13px;color:var(--mute)}
.facts dd{font-size:17px;line-height:1.45}
.warn{display:inline-flex;align-items:center;gap:8px;margin-top:20px;border:1px solid var(--yellow);border-radius:99px;padding:5px 14px;color:var(--yellow);font-size:14px;font-weight:500}
.warn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2}
.title-poster{width:100%;height:auto;aspect-ratio:9/16;object-fit:cover;border-radius:8px;box-shadow:0 0 0 1px var(--line),0 40px 90px -30px #000}
.watch{padding-top:clamp(36px,5vw,64px)}
.screen{position:relative;aspect-ratio:16/9;background:#050505;border-radius:8px;overflow:hidden;box-shadow:0 0 0 1px var(--line)}
.screen>img,.screen iframe,.screen video{position:absolute;inset:0;width:100%;height:100%;border:0}
.screen>img{object-fit:cover}
.screen video{object-fit:contain;background:#000}
.screen-play{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(circle,rgba(0,0,0,0),rgba(0,0,0,.45))}
.screen-play span{width:92px;height:92px;border-radius:50%;background:var(--yellow);display:grid;place-items:center;box-shadow:0 14px 44px rgba(0,0,0,.55);transition:transform .35s var(--ease),background-color .2s}
.screen-play span::after{content:"";margin-left:7px;border-style:solid;border-width:16px 0 16px 27px;border-color:transparent transparent transparent #000}
.screen-play:hover span{transform:scale(1.08);background:var(--ink)}
.gate{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:18px;padding:24px;text-align:center;background:rgba(0,0,0,.72);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.gate p{font:400 clamp(20px,2.4vw,28px)/1.35 var(--display)}
.screen-bar{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 20px;margin-top:12px;font-size:14px;color:var(--mute)}
.screen-bar a{color:var(--mute);text-decoration:none}
.screen-bar a:hover{color:var(--yellow)}
.notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:36px clamp(32px,5vw,80px);padding-top:clamp(48px,6vw,84px)}
.notes h2{font:400 26px/1.2 var(--display);color:var(--yellow);margin-bottom:12px}
.notes p{max-width:62ch;margin-bottom:.9em}
.list li{position:relative;padding-inline-start:24px;margin-bottom:9px}
.list li::before{content:"";position:absolute;inset-inline-start:0;top:.6em;width:10px;height:10px;background:var(--yellow);clip-path:polygon(0 50%,100% 0,100% 100%)}
.versions{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 24px;margin-top:clamp(40px,5vw,64px);padding:20px 24px;border:1px solid var(--line);border-radius:8px}
.versions p{color:var(--mute)}
.rail--scroll{display:flex;gap:20px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-inline:var(--gutter);margin-inline:calc(var(--gutter) * -1);padding:30px var(--gutter) 12px;scrollbar-width:none}
.rail--scroll::-webkit-scrollbar{display:none}
.rail--scroll .card{flex:0 0 clamp(150px,16vw,210px);scroll-snap-align:start}
.rail--scroll .card-cap h3{font-size:18px}
@media (min-width:901px){.rail--scroll{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));overflow:visible;margin-inline:0;padding-inline:0}.rail--scroll .card{flex:none}}

/* player dialog */
.player{width:min(1120px,94vw);max-height:94vh;padding:0;border:0;border-radius:10px;background:#000;color:var(--ink);overflow:auto;box-shadow:0 0 0 1px var(--line),0 40px 120px rgba(0,0,0,.8)}
.player::backdrop{background:rgba(0,0,0,.86);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.player-screen{position:relative;aspect-ratio:16/9;background:#000}
.player-screen iframe{display:block;width:100%;height:100%;border:0}
.player-meta{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:18px 22px 22px}
.player-meta h3{font:400 26px/1.2 var(--display)}
.player-meta p{margin-top:4px;color:var(--mute)}
.x,.rb{flex:none;width:44px;height:44px;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center;transition:border-color .2s,color .2s}
.x:hover,.rb:hover:not(:disabled){border-color:var(--yellow);color:var(--yellow)}
.x svg,.rb svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2}
.player-meta{flex-wrap:wrap}
.player-meta>div:first-child{flex:1;min-width:0}
.player-nav{display:flex;align-items:center;gap:6px;margin-inline-start:auto}
.player-nav[hidden]{display:none}
.player-nav span{min-width:4.6em;text-align:center;font-size:14px;color:var(--mute)}
.rb:disabled{opacity:.3;cursor:default}

/* small screens */
@media (max-width:900px){
  .menu{display:block}
  .nav{display:none;position:fixed;inset:var(--bar) 0 0;flex-direction:column;align-items:stretch;gap:0;margin:0;padding:12px var(--gutter) 32px;background:#000;overflow:auto;overscroll-behavior:contain}
  .nav-open .nav{display:flex}
  body.nav-open{overflow:hidden}
  .nav-open .bar{background:#000;border-color:var(--line);-webkit-backdrop-filter:none;backdrop-filter:none}
  .nav a{font:400 30px/1.2 var(--display);color:var(--ink);padding:16px 0;border-bottom:1px solid var(--line)}
  .nav a.pill{margin-top:24px;text-align:center;font:700 18px/1 var(--body);padding:18px}
  .hero{padding-top:calc(var(--bar) + 76px)}
  .hero-grid{grid-template-columns:1fr;gap:20px}
  .eye{order:-1;width:min(66vw,320px)}
  .osd{font-size:12px;top:calc(var(--bar) + 30px)}
  .osd--l{left:calc(var(--gutter) + 18px)}
  .osd--r{right:calc(var(--gutter) + 18px)}
  .rail{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:var(--gutter);margin-inline:calc(var(--gutter) * -1);padding-inline:var(--gutter);scrollbar-width:none}
  .rail::-webkit-scrollbar{display:none}
  .rail .card{flex:0 0 min(56vw,240px);scroll-snap-align:start}
  .rail--wide .card{flex-basis:min(78vw,340px)}
  .credits,.about{grid-template-columns:1fr}
  .title{min-height:0;padding-top:calc(var(--bar) + 28px)}
  .title-grid{grid-template-columns:1fr;gap:26px}
  .title-poster{order:-1;width:min(40vw,180px)}
}
@media (max-width:560px){
  body{font-size:16px}
  .cv-grid{grid-template-columns:1fr 1fr}
  .reach h3{flex-basis:100%}
  .osd--r{display:none}
  .player-meta h3{font-size:22px}
  .player-nav{order:3;flex-basis:100%;justify-content:center;margin:0}
}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
}
@media (prefers-reduced-motion:no-preference){@view-transition{navigation:auto}}
::view-transition-group(*){animation-duration:.5s;animation-timing-function:cubic-bezier(.2,.8,.2,1)}
`;

  var JS = String.raw`
(function () {
  'use strict';
  var d = document, w = window, body = d.body;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var pendingAd = null;

  /* links from the earlier version of the site: #/p/slug and #/s/section */
  if (body.getAttribute('data-page') === 'home') {
    var legacy = { vod: 'works', expo: 'exhibitions', ads: 'ads', prod: 'production', about: 'about', contact: 'contact' };
    var hm = location.hash.match(/^#\/(p|s)\/([\w-]+)/);
    if (hm && hm[1] === 'p') {
      if (hm[2].indexOf('ad-') === 0) { pendingAd = hm[2]; }
      else { location.replace('work/' + hm[2] + '.html'); return; }
    } else if (hm) {
      var sec = legacy[hm[2]] || hm[2];
      history.replaceState(null, '', '#' + sec);
      var el = d.getElementById(sec);
      if (el) el.scrollIntoView();
    }
  }

  /* top bar */
  var bar = d.querySelector('.bar');
  function onScroll() { bar.classList.toggle('solid', w.scrollY > 20); }
  onScroll();
  w.addEventListener('scroll', onScroll, { passive: true });

  var menu = d.querySelector('.menu');
  if (menu) {
    menu.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.getElementById('nav').addEventListener('click', function (e) {
      if (e.target.closest('a')) { body.classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* viewfinder timecode and timeline playhead */
  var tc = d.getElementById('tc'), ph = d.getElementById('ph');
  if (tc && !reduce) {
    var t0 = performance.now(), last = -1, LOOP = 48;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function (now) {
      var s = (now - t0) / 1000, f = Math.floor(s * 25);
      if (f !== last) {
        last = f;
        tc.textContent = '00:' + pad(Math.floor(s / 60) % 60) + ':' + pad(Math.floor(s) % 60) + ':' + pad(f % 25);
        if (ph) ph.style.left = ((s % LOOP) / LOOP * 100).toFixed(2) + '%';
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* rotating head in the viewfinder */
  var head = d.querySelector('.eye video');
  if (head && reduce) { head.removeAttribute('autoplay'); head.pause(); }

  /* hover previews on posters */
  if (fine && !reduce) {
    d.querySelectorAll('.card[data-prev]').forEach(function (card) {
      var v = card.querySelector('video');
      if (!v) return;
      v.addEventListener('playing', function () { card.classList.add('playing'); });
      var start = function () {
        if (!v.getAttribute('src')) v.src = card.getAttribute('data-prev');
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      };
      var stop = function () {
        card.classList.remove('playing');
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
      };
      card.addEventListener('mouseenter', start);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focus', start);
      card.addEventListener('blur', stop);
    });
  }

  /* YouTube screens load only when played */
  function ytFrame(id, title) {
    var f = d.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    f.title = title || 'YouTube';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.setAttribute('allowfullscreen', '');
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    return f;
  }
  function playScreen(s) {
    if (s.classList.contains('on')) return;
    s.classList.add('on');
    var f = ytFrame(s.getAttribute('data-yt'), s.getAttribute('data-title'));
    s.innerHTML = '';
    s.appendChild(f);
    f.focus();
  }
  d.querySelectorAll('.screen[data-yt] .screen-play').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); playScreen(a.parentNode); });
  });

  /* videos behind a content notice */
  d.querySelectorAll('.screen[data-gate]').forEach(function (s) {
    var v = s.querySelector('video');
    var sp = s.querySelector('.screen-play');
    if (v) v.removeAttribute('controls');
    if (sp) { sp.setAttribute('tabindex', '-1'); sp.setAttribute('aria-hidden', 'true'); }
    var g = d.createElement('div');
    g.className = 'gate';
    var p = d.createElement('p');
    p.textContent = s.getAttribute('data-gate');
    var b = d.createElement('button');
    b.type = 'button';
    b.className = 'btn btn--solid';
    b.innerHTML = '<span class="tri"></span>';
    b.appendChild(d.createTextNode(s.getAttribute('data-play')));
    g.appendChild(p);
    g.appendChild(b);
    s.appendChild(g);
    b.addEventListener('click', function () {
      if (s.hasAttribute('data-yt')) { playScreen(s); return; }
      g.remove();
      v.setAttribute('controls', '');
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {});
    });
  });

  /* "watch" button in the title area */
  d.querySelectorAll('[data-watch]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var sec = d.getElementById('watch');
      if (!sec) return;
      e.preventDefault();
      sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      var s = sec.querySelector('.screen');
      if (!s) return;
      var gb = s.querySelector('.gate button');
      if (gb) { gb.focus({ preventScroll: true }); return; }
      if (s.hasAttribute('data-yt')) { playScreen(s); return; }
      var v = s.querySelector('video');
      if (v) v.play();
    });
  });

  /* sensitive thumbnails stay hidden until the visitor asks to see them */
  d.querySelectorAll('[data-sensitive]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var r = a.closest('.veiled');
      if (!r) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      r.classList.remove('veiled');
    });
  });

  /* ads open in a player */
  var dlg = d.getElementById('player');
  function openAd(slug) {
    var a = d.querySelector('[data-ad="' + slug + '"]');
    if (a) a.click();
  }
  if (dlg && typeof dlg.showModal === 'function') {
    var scr = dlg.querySelector('.player-screen');
    var ttl = dlg.querySelector('h3');
    var dsc = dlg.querySelector('.player-meta p');
    var nav = dlg.querySelector('.player-nav');
    var count = nav.querySelector('span');
    var steps = nav.querySelectorAll('button');
    var list = [], idx = 0;
    /* show one video of a group (ads, or the Osher Ad credits) and set up its neighbours */
    var show = function (a) {
      list = [].slice.call(d.querySelectorAll('a[data-ad][data-group="' + a.getAttribute('data-group') + '"]'));
      idx = list.indexOf(a);
      ttl.textContent = a.getAttribute('data-title');
      dsc.textContent = a.getAttribute('data-desc');
      scr.innerHTML = '';
      var veil = a.hasAttribute('data-sensitive') ? a.closest('.veiled') : null;
      if (veil) {
        var g = d.createElement('div');
        g.className = 'gate';
        g.innerHTML = '<p>פרסומת לחנות מין עם רמיזות מיניות.</p><button type="button" class="btn btn--solid"><span class="tri"></span>להפעלת הסרטון</button>';
        g.querySelector('button').addEventListener('click', function () { veil.classList.remove('veiled'); show(a); });
        scr.appendChild(g);
      } else {
        scr.appendChild(ytFrame(a.getAttribute('data-yt'), a.getAttribute('data-title')));
      }
      nav.hidden = list.length < 2;
      count.textContent = (idx + 1) + ' מתוך ' + list.length;
      steps[0].disabled = idx === 0;
      steps[1].disabled = idx === list.length - 1;
    };
    var go = function (s) { var n = list[idx + s]; if (n) show(n); };
    d.querySelectorAll('a[data-ad]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(a);
        if (!dlg.open) dlg.showModal();
      });
    });
    steps[0].addEventListener('click', function () { go(-1); });
    steps[1].addEventListener('click', function () { go(1); });
    d.addEventListener('keydown', function (e) {
      if (!dlg.open) return;
      if (e.key === 'ArrowRight') go(-1);
      else if (e.key === 'ArrowLeft') go(1);
    });
    dlg.addEventListener('close', function () { scr.innerHTML = ''; });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelector('.x').addEventListener('click', function () { dlg.close(); });
  }
  if (pendingAd) openAd(pendingAd);
})();
`;

  var ICON_EXT = '<svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
  var ICON_WARN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
  var ICON_PLAY = '<svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>';
  var FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23000'/%3E%3Cpath d='M24 17l25 15-25 15z' fill='%23e8c232'/%3E%3C/svg%3E";

  function head(o) {
    return '<!doctype html>\n<html lang="he" dir="rtl">\n<head>\n<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
      '<title>' + esc(o.title) + '</title>\n' +
      '<meta name="description" content="' + esc(o.desc) + '">\n' +
      '<meta property="og:type" content="website">\n<meta property="og:locale" content="he_IL">\n' +
      '<meta property="og:site_name" content="אסף טל – עורך ויוצר וידאו">\n' +
      '<meta property="og:title" content="' + esc(o.title) + '">\n' +
      '<meta property="og:description" content="' + esc(o.desc) + '">\n' +
      '<meta property="og:image" content="' + esc(o.image) + '">\n' +
      (o.imageW ? '<meta property="og:image:width" content="' + o.imageW + '">\n<meta property="og:image:height" content="' + o.imageH + '">\n' : '') +
      '<meta name="twitter:card" content="summary_large_image">\n' +
      '<meta name="theme-color" content="#000000">\n' +
      '<link rel="icon" href="' + FAVICON + '">\n' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link rel="preconnect" href="https://static.wixstatic.com">\n' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=Secular+One&family=Space+Mono&display=swap">\n' +
      '<link rel="stylesheet" href="' + o.root + 'assets/site.css">\n' +
      '<script src="' + o.root + 'assets/site.js" defer></script>\n' +
      '</head>\n';
  }

  function topBar(root) {
    var base = root ? root + 'index.html' : '';
    var items = [['about', 'אודות'], ['works', 'מהלימודים'], ['exhibitions', 'תערוכות'], ['ads', 'פרסומות'], ['production', 'הפקה']];
    return '<a class="skip" href="#main">דלגו לתוכן</a>\n' +
      '<header class="bar">\n<a class="brand" href="' + (root ? base : '#top') + '">אסף טל</a>\n' +
      '<button class="menu" type="button" aria-expanded="false" aria-controls="nav">תפריט</button>\n' +
      '<nav class="nav" id="nav" aria-label="ניווט ראשי">' +
      items.map(function (it) { return '<a href="' + base + '#' + it[0] + '">' + it[1] + '</a>'; }).join('') +
      '<a class="pill" href="' + base + '#contact">צרו קשר</a></nav>\n</header>\n';
  }

  function capLine(w) {
    return w.cap.map(function (c) {
      return c[1] ? '<span class="tc">' + esc(c[0]) + '</span>' : '<span>' + esc(c[0]) + '</span>';
    }).join('');
  }

  function card(w, root, named) {
    var vt = named ? ' style="view-transition-name:p-' + w.slug + '"' : '';
    return '<a class="card' + (w.prev ? ' has-prev' : '') + '" href="' + root + 'work/' + w.slug + '.html"' + (w.prev ? ' data-prev="' + esc(w.prev) + '"' : '') + '>' +
      '<div class="card-media">' +
      '<img src="' + poster(w.img, 540) + '" alt="' + esc('פוסטר: ' + w.title) + '" width="540" height="960" loading="lazy" decoding="async"' + vt + '>' +
      (w.prev ? '<video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>' : '') +
      (w.warn ? '<span class="badge">' + esc('אזהרה: ' + warnPhrase(w.warn)) + '</span>' : '') +
      '<div class="card-over"><p>' + esc(w.hover || w.role) + '</p><span class="card-go"><span class="tri"></span>לעמוד העבודה</span></div>' +
      '</div>' +
      '<div class="card-cap"><h3>' + esc(w.title) + '</h3><p>' + capLine(w) + '</p></div>' +
      '</a>';
  }

  function adCard(a) {
    return '<a class="card' + (a.sensitive ? ' card--sensitive' : '') + '" href="https://youtu.be/' + a.yt + '" target="_blank" rel="noopener" data-ad="' + a.slug + '" data-group="ads" data-yt="' + a.yt + '" data-title="' + esc(a.title) + '" data-desc="' + esc(a.desc) + '"' + (a.sensitive ? ' data-sensitive' : '') + '>' +
      '<div class="card-media"><img src="' + ytImg(a.yt, a.q) + '" alt="" width="1280" height="720" loading="lazy" decoding="async"><span class="play-dot" aria-hidden="true"></span>' +
      (a.sensitive ? '<span class="veil" aria-hidden="true"><b>פרסומת לחנות מין</b><span>רמיזות מיניות. לחצו כדי להציג</span></span>' : '') + '</div>' +
      '<div class="card-cap"><h3>' + esc(a.title) + '</h3><p><span>' + esc(a.kind) + '</span></p></div>' +
      '</a>';
  }

  function contact() {
    return '<section class="contact" id="contact" aria-labelledby="contact-h"><div class="wrap">' +
      '<h2 id="contact-h">מצפה לעבוד עמכם!</h2>' +
      '<ul>' +
      '<li><small>מגורים</small><span>ירושלים / רמת גן</span></li>' +
      '<li><small>מייל</small><a href="mailto:asrotal@gmail.com" dir="ltr">asrotal@gmail.com</a></li>' +
      '<li><small>וואטסאפ</small><a href="https://wa.me/972502225071" target="_blank" rel="noopener" dir="ltr">050-2225071</a></li>' +
      '<li><small>אינסטגרם</small><a href="https://www.instagram.com/asaf___t" target="_blank" rel="noopener" dir="ltr">@asaf___t</a></li>' +
      '</ul>' +
      '</div></section>\n';
  }

  /* the short contact strip under the about section, as in the Canva version */
  function reach() {
    return '<section class="reach" aria-labelledby="reach-h"><h3 id="reach-h">צרו קשר</h3><dl>' +
      '<div><dt>מגורים</dt><dd>ירושלים / רמת גן</dd></div>' +
      '<div><dt>מייל</dt><dd><a href="mailto:asrotal@gmail.com" dir="ltr">asrotal@gmail.com</a></dd></div>' +
      '<div><dt>וואטסאפ</dt><dd><a href="https://wa.me/972502225071" target="_blank" rel="noopener" dir="ltr">050-2225071</a></dd></div>' +
      '<div><dt>אינסטגרם</dt><dd><a href="https://www.instagram.com/asaf___t" target="_blank" rel="noopener" dir="ltr">@asaf___t</a></dd></div>' +
      '</dl></section>';
  }

  function foot() {
    return '<footer class="wrap"><div class="foot"><span>אסף טל, עורך ויוצר וידאו</span><a href="#top">חזרה למעלה</a></div></footer>\n';
  }

  function list(items) {
    return '<ul class="list">' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }
  function paras(items) {
    return items.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
  }

  function home() {
    var works = WORKS.filter(function (w) { return w.group === 'works'; });
    var expo = WORKS.filter(function (w) { return w.group === 'exhibitions'; });
    return head({
      title: 'אסף טל – עורך ויוצר וידאו',
      desc: 'פורטפוליו של אסף טל, עורך ויוצר וידאו: עבודות מהלימודים בבצלאל, תערוכות, פרסומות והפקה.',
      image: VID.headStill, imageW: 960, imageH: 960,
      root: ''
    }) +
    '<body data-page="home" id="top">\n' + topBar('') +
    '<main id="main">\n' +
    '<section class="hero" aria-label="פתיחה">' +
      '<div class="vf" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
      '<div class="osd osd--l" aria-hidden="true"><span class="rec">REC</span><b id="tc">00:00:00:00</b></div>' +
      '<div class="osd osd--r" aria-hidden="true">4K · 25 FPS</div>' +
      '<div class="hero-grid">' +
        '<div><h1>אסף טל</h1><p class="role">עורך ויוצר וידאו</p>' +
        '<p class="line">גיבורים חריגים משולי החברה, רגעים בומבסטיים והצפה חזותית על המרקע.</p>' +
        '<div class="actions"><a class="btn btn--solid" href="#works"><span class="tri"></span>לצפייה בעבודות</a><a class="btn btn--ghost" href="#contact">צרו קשר</a></div></div>' +
        '<div class="eye"><video autoplay muted loop playsinline preload="auto" poster="' + VID.headStill + '" aria-hidden="true"><source src="' + VID.head + '" type="video/mp4"></video></div>' +
      '</div>' +
      '<div class="ruler" aria-hidden="true"><i id="ph"></i></div>' +
    '</section>\n' +
    '<section class="row" id="about" aria-labelledby="about-h"><div class="wrap">' +
      '<div class="row-head"><h2 id="about-h">אודות</h2></div>' +
      '<div class="about">' +
        '<div class="bio">' + paras([
          'היי! אני אסף – סטודנט, עורך, יוצר ואמן וידאו עם חיבור חזק לגיבורים חריגים משולי החברה, רגעים בומבסטיים והצפה חזותית על המרקע. כל הדברים שגורמים לצופה להרגיש חי.',
          'אני לא זוכר את עצמי בלי בתי קולנוע. כשהייתי בן 5 הלכתי בפעם הראשונה, ולמעשה עד עכשיו לא הפסקתי. כשראיתי בפעם הראשונה בגיל 14 את Interstellar של כריסטופר נולאן על מסך האיימקס, הבנתי מה הוא כוחו של הקולנוע, ומאז גם הבנתי שזה מה שאני רוצה לעסוק בו כל חיי.',
          'העבודות שלי נוטות לעיסוק בגיבורים לא מושלמים אך מעניינים, לעריכה קצבית ולרגעים אנושיים ופגיעים. אני אוהב לקחת חומר גלם פשוט ולהפוך אותו לוידאו מעניין, מושך וכזה שפשוט אי אפשר להתעלם ממנו – בין אם זה עלילתי, דוקומנטרי או וידאו אמנותי ומוזר שאי אפשר להזיז ממנו את העיניים.'
        ]) + '</div>' +
        '<div class="cv">' +
          '<section><h3>לימודים</h3><ul>' +
            '<li><b>תואר ראשון באקדמיה לאמנות בצלאל</b><time>דצמבר 2023 – היום</time><p>המחלקה לאמנויות המסך, התמחות וידאו: אמנות, עריכת וידאו, בימוי עלילתי ודוקו, עריכת תמונה, צילום, כתיבה דרמטית.</p></li>' +
          '</ul></section>' +
          '<section><h3>קורסים מקצועיים</h3><ul>' +
            '<li><b>קורס יוצר וידאו ב״הבצפר״</b><time>נוב׳ 2022 – אוג׳ 2023</time><p>בית הספר של חברות הפרסום והדיגיטל: וידאו, כתיבת מסרים פרסומיים, כתיבת תסריטים, קריאייטיב, פרימייר, בימוי, הפקה, סרטוני תדמית, צילום.</p></li>' +
            '<li><b>קורס תסריטאות בהנחיית גדי טאוב</b><time>2021 – 2022</time><p>האוניברסיטה העברית</p></li>' +
            '<li><b>קורס בימוי בהנחיית גור בנטביץ׳</b><time>2020</time><p>מכללת OnCourse</p></li>' +
          '</ul></section>' +
          '<div class="cv-grid">' +
            '<section><h3>תוכנות</h3><ul class="tags"><li class="suite"><b>אדובי</b><span>פרימייר, פוטושופ, אפטר אפקטס</span></li></ul></section>' +
            '<section><h3>כישורים</h3><ul class="tags"><li>עריכת וידאו</li><li>צילום</li><li>בימוי</li><li>פיתוח תוכן</li></ul></section>' +
            '<section><h3>שפות</h3><ul class="tags"><li>עברית</li><li>אנגלית</li></ul><small>אנגלית ברמת שפת אם, אחרי 5 שנים בארה״ב</small></section>' +
          '</div>' +
        '</div>' +
      '</div>' +
      reach() +
    '</div></section>\n' +
    '<section class="row" id="works" aria-labelledby="works-h"><div class="wrap">' +
      '<div class="row-head"><h2 id="works-h">מהלימודים</h2><p>עבודות נבחרות מהלימודים בבצלאל</p></div>' +
      '<div class="rail">' + works.map(function (w) { return card(w, '', true); }).join('') + '</div>' +
    '</div></section>\n' +
    '<section class="row" id="exhibitions" aria-labelledby="expo-h"><div class="wrap">' +
      '<div class="row-head"><h2 id="expo-h">תערוכות</h2><p>עבודות שהוצגו בתערוכות בירושלים</p></div>' +
      '<div class="rail">' + expo.map(function (w) { return card(w, '', true); }).join('') + '</div>' +
    '</div></section>\n' +
    '<section class="row" id="ads" aria-labelledby="ads-h"><div class="wrap">' +
      '<div class="row-head"><h2 id="ads-h">פרסומות</h2><p>בימוי וכתיבת פרסומות</p></div>' +
      '<div class="rail rail--wide veiled">' + ADS.map(adCard).join('') + '</div>' +
    '</div></section>\n' +
    '<section class="row" id="production" aria-labelledby="prod-h"><div class="wrap">' +
      '<div class="row-head"><h2 id="prod-h">הפקה</h2></div>' +
      '<div class="credits">' + CREDITS.map(function (c) {
        return '<div><h3>' + esc(c.h) + '</h3><ul>' + c.items.map(function (it) {
          return '<li>' + (it.yt ? '<a href="https://youtu.be/' + it.yt + '" target="_blank" rel="noopener" data-ad="credit-' + it.yt + '" data-group="credits" data-yt="' + it.yt + '" data-title="' + esc(it.t) + '" data-desc="' + esc(c.h) + '">' + esc(it.t) + ICON_PLAY + '</a>' : esc(it.t)) + '</li>';
        }).join('') + '</ul></div>';
      }).join('') + '</div>' +
    '</div></section>\n' +
    contact() +
    '</main>\n' + foot() +
    '<dialog class="player" id="player" aria-labelledby="player-h"><div class="player-screen"></div>' +
    '<div class="player-meta"><div><h3 id="player-h"></h3><p></p></div>' +
    '<div class="player-nav" hidden><button class="rb" type="button" aria-label="לסרטון הקודם"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button><span></span>' +
    '<button class="rb" type="button" aria-label="לסרטון הבא"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button></div>' +
    '<button class="x" type="button" aria-label="סגירת הנגן" autofocus>' + ICON_X + '</button></div></dialog>\n' +
    '</body>\n</html>\n';
  }

  function workPage(w) {
    var root = '../';
    var others = WORKS.filter(function (x) { return x !== w; });
    var hasScreen = !!(w.yt || w.video);
    var backdrop = w.yt ? ytImg(w.yt) : poster(w.img, 540);
    var blur = !w.yt;
    var facts = [['אורך', w.length, 1], ['סוגה', w.genre], ['תפקיד', w.role], ['מקום', w.venue], ['תאריך', w.date]].filter(function (f) { return f[1]; });
    var pageTitle = w.title + (w.slug === 'bezalel-baam' ? ' (״בצלאל בעם״)' : '') + ' – אסף טל';
    var desc = (w.about[0] || '').replace(/\s+/g, ' ');
    if (desc.length > 155) desc = desc.slice(0, 152).replace(/\s\S*$/, '') + '…';

    var noun = w.noun || 'סרט';
    var gate = w.warn ? ' data-gate="' + esc('ה' + noun + ' מכיל ' + warnPhrase(w.warn) + '.') + '" data-play="' + esc('להפעלת ה' + noun) + '"' : '';
    var screen = '';
    if (w.yt) {
      screen = '<div class="screen" data-yt="' + w.yt + '" data-title="' + esc(w.title) + '"' + gate + '>' +
        '<img src="' + ytImg(w.yt) + '" alt="" loading="lazy" decoding="async">' +
        '<a class="screen-play" href="https://youtu.be/' + w.yt + '" target="_blank" rel="noopener" aria-label="' + esc('הפעלת ה' + noun + ' ' + w.title) + '"><span></span></a>' +
        '</div>' +
        '<div class="screen-bar"><span>' + esc(w.title) + (w.length ? ' <span class="tc">' + w.length + '</span>' : '') + '</span>' +
        '<a href="https://youtu.be/' + w.yt + '" target="_blank" rel="noopener">לצפייה ביוטיוב' + ICON_EXT + '</a></div>';
    } else if (w.video) {
      screen = '<div class="screen"' + gate + '>' +
        '<video controls playsinline preload="metadata"' + (w.still ? ' poster="' + esc(w.still) + '"' : '') + '><source src="' + esc(w.video) + '" type="video/mp4"></video>' +
        '</div>' +
        '<div class="screen-bar"><span>' + esc(w.title) + ' <span class="tc">' + w.length + '</span></span></div>';
    }

    var notes = '<div><h2>' + esc(w.aboutTitle || 'על הפרויקט') + '</h2>' + paras(w.about) + '</div>';
    if (w.work) notes += '<div><h2>על העבודה</h2>' + paras(w.work) + '</div>';
    if (w.roleText) notes += '<div><h2>תפקיד</h2><p>' + esc(w.roleText) + '</p></div>';
    if (w.roles) notes += '<div><h2>תפקיד</h2>' + list(w.roles) + '</div>';
    if (w.challenges) notes += '<div><h2>אתגרים</h2>' + list(w.challenges) + '</div>';

    var related = '';
    if (w.related) {
      related = '<aside class="versions"><p>' + esc(w.related.text) + '</p><a class="btn btn--ghost" href="' + w.related.slug + '.html">' + esc(w.related.cta) + '</a></aside>';
    }

    return head({ title: pageTitle, desc: desc, image: w.yt ? ytImg(w.yt) : (w.still || poster(w.img, 540)), root: root }) +
      '<body data-page="work" id="top">\n' + topBar(root) +
      '<main id="main">\n' +
      '<section class="title" aria-labelledby="work-h">' +
        '<div class="title-bg' + (blur ? ' title-bg--blur' : '') + '"><img src="' + esc(backdrop) + '" alt="" fetchpriority="high"></div>' +
        '<div class="wrap title-grid">' +
          '<div>' +
            '<a class="crumb" href="' + root + 'index.html#' + w.group + '">' + GROUPS[w.group] + '</a>' +
            '<h1 id="work-h">' + esc(w.title) + '</h1>' +
            (w.event ? '<p class="event">' + esc(w.event) + '</p>' : '') +
            (facts.length ? '<dl class="facts">' + facts.map(function (f) {
              return '<div><dt>' + f[0] + '</dt><dd' + (f[2] ? ' class="tc"' : '') + '>' + esc(f[1]) + '</dd></div>';
            }).join('') + '</dl>' : '') +
            (w.warn ? '<p class="warn">' + ICON_WARN + esc('אזהרה: ' + warnPhrase(w.warn)) + '</p>' : '') +
            (hasScreen ? '<div class="actions"><a class="btn btn--solid" href="#watch" data-watch><span class="tri"></span>צפייה</a></div>' : '') +
          '</div>' +
          '<img class="title-poster" src="' + poster(w.img, 540) + '" alt="' + esc('פוסטר: ' + w.title) + '" width="540" height="960" style="view-transition-name:p-' + w.slug + '">' +
        '</div>' +
      '</section>\n' +
      (hasScreen ? '<section class="watch" id="watch" aria-label="צפייה"><div class="wrap">' + screen + '</div></section>\n' : '') +
      '<div class="wrap"><div class="notes">' + notes + '</div>' + related + '</div>\n' +
      '<section class="row" aria-labelledby="more-h"><div class="wrap">' +
        '<div class="row-head"><h2 id="more-h">עוד עבודות</h2></div>' +
        '<div class="rail rail--scroll">' + others.map(function (x) { return card(x, root, false); }).join('') + '</div>' +
      '</div></section>\n' +
      contact() +
      '</main>\n' + foot() +
      '</body>\n</html>\n';
  }

  var files = {
    'index.html': home(),
    'assets/site.css': CSS.trim() + '\n',
    'assets/site.js': JS.trim() + '\n'
  };
  WORKS.forEach(function (w) { files['work/' + w.slug + '.html'] = workPage(w); });
  return files;
}

if (typeof module !== 'undefined' && typeof require === 'function' && require.main === module) {
  var fs = require('fs'), path = require('path');
  var out = process.argv[2] || path.join(__dirname, 'docs');
  var files = buildSite();
  Object.keys(files).forEach(function (p) {
    var full = path.join(out, p);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, files[p]);
  });
  console.log(Object.keys(files).map(function (p) { return p + ' ' + Buffer.byteLength(files[p]); }).join('\n'));
}
