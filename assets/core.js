/* ===== Curiosa core: i18n, menu, profile, scores ===== */
(function(){
  var ROOT = window.CURIOSA_ROOT || "";
  // safe storage (falls back to memory if blocked, e.g. in a sandbox)
  var mem = {};
  var store = {
    get:function(k){try{return localStorage.getItem(k);}catch(e){return mem[k]||null;}},
    set:function(k,v){try{localStorage.setItem(k,v);}catch(e){mem[k]=v;}},
    del:function(k){try{localStorage.removeItem(k);}catch(e){delete mem[k];}}
  };

  var GAMES = [
    {id:"trivia",     file:"games/trivia.html",     name:"g_trivia",   unit:"unit_pts"},
    {id:"arithmetic", file:"games/arithmetic.html", name:"g_arith",    unit:"unit_solved"},
    {id:"atlas",      file:"games/atlas.html",      name:"g_atlas",    unit:"unit_chain"},
    {id:"timeline",   file:"games/timeline.html",   name:"g_timeline", unit:"unit_pts"},
    {id:"vocab",      file:"games/vocabulary.html", name:"g_vocab",    unit:"unit_pts"}
  ];

  var lang = store.get("curiosa_lang") || "en";
  if(["en","fr","ar"].indexOf(lang)<0) lang="en";

  function t(key){ var e=window.S[key]; return e?(e[lang]||e.en):key; }

  function applyLang(){
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang==="ar") ? "rtl" : "ltr";
  }

  function getName(){ return store.get("curiosa_name") || ""; }
  function setName(n){ if(n){store.set("curiosa_name",n);} }
  function signOut(){ store.del("curiosa_name"); }

  function getScores(){
    try{ return JSON.parse(store.get("curiosa_scores")||"{}"); }catch(e){ return {}; }
  }
  function saveScore(id, value){
    var s=getScores();
    if(!s[id]) s[id]={best:0,plays:0};
    s[id].plays++;
    var isBest = value > s[id].best;
    if(isBest) s[id].best=value;
    store.set("curiosa_scores", JSON.stringify(s));
    return isBest;
  }
  function resetScores(){ store.del("curiosa_scores"); }

  /* ---- header ---- */
  function renderHeader(){
    var host=document.getElementById("site-header");
    if(!host) return;
    var name=getName();
    var gameLinks=GAMES.map(function(g){
      var label=t(g.name)+(g.id==="vocab"?" ("+t("g_vocab_note")+")":"");
      return '<a href="'+ROOT+g.file+'">'+label+'</a>';
    }).join("");
    host.className="site-header";
    host.innerHTML=
      '<a class="brand" href="'+ROOT+'index.html">CURIOSA</a>'+
      '<nav class="nav">'+
        '<a href="'+ROOT+'index.html">'+t("nav_home")+'</a>'+
        '<div class="drop" id="gamesDrop"><button>'+t("nav_games")+'</button><div class="menu">'+gameLinks+'</div></div>'+
        '<a href="'+ROOT+'scores.html">'+t("nav_scores")+'</a>'+
      '</nav>'+
      '<div class="header-right">'+
        '<div class="lang">'+
          '<button data-l="en"'+(lang==="en"?' class="active"':'')+'>EN</button>'+
          '<button data-l="fr"'+(lang==="fr"?' class="active"':'')+'>FR</button>'+
          '<button data-l="ar"'+(lang==="ar"?' class="active"':'')+'>ع</button>'+
        '</div>'+
        '<div class="profile-wrap">'+
          '<button class="profile-btn" id="profBtn"><span>👤</span><span class="who">'+(name?name:t("signin"))+'</span></button>'+
          '<div class="pop" id="profPop">'+
            (name
              ? '<button data-act="change">'+t("changename")+'</button><button data-act="out">'+t("signout")+'</button>'
              : '<button data-act="change">'+t("signin")+'</button>')+
          '</div>'+
        '</div>'+
      '</div>';

    // language buttons
    host.querySelectorAll(".lang button").forEach(function(b){
      b.onclick=function(){ lang=b.getAttribute("data-l"); store.set("curiosa_lang",lang); location.reload(); };
    });
    // games dropdown toggle
    var drop=document.getElementById("gamesDrop");
    drop.querySelector("button").onclick=function(e){ e.stopPropagation(); drop.classList.toggle("open"); };
    // profile popover
    var pop=document.getElementById("profPop");
    document.getElementById("profBtn").onclick=function(e){ e.stopPropagation(); pop.classList.toggle("open"); };
    pop.querySelectorAll("button").forEach(function(b){
      b.onclick=function(){
        var act=b.getAttribute("data-act");
        pop.classList.remove("open");
        if(act==="out"){ signOut(); renderHeader(); }
        else openModal();
      };
    });
    document.addEventListener("click",function(){ drop.classList.remove("open"); pop.classList.remove("open"); });
  }

  /* ---- name modal ---- */
  function ensureModal(){
    if(document.getElementById("nameModal")) return;
    var m=document.createElement("div");
    m.className="modal-bg"; m.id="nameModal";
    m.innerHTML='<div class="modal"><h3 id="mTitle"></h3><p id="mDesc"></p>'+
      '<input id="mInput" maxlength="24" autocomplete="off">'+
      '<div class="row"><button class="btn" id="mSave"></button><button class="btn ghost" id="mCancel"></button></div></div>';
    document.body.appendChild(m);
    m.addEventListener("click",function(e){ if(e.target===m) m.classList.remove("open"); });
  }
  function openModal(){
    ensureModal();
    var m=document.getElementById("nameModal");
    document.getElementById("mTitle").textContent=t("modal_title");
    document.getElementById("mDesc").textContent=t("modal_desc");
    var inp=document.getElementById("mInput");
    inp.placeholder=t("modal_ph"); inp.value=getName();
    document.getElementById("mSave").textContent=t("save");
    document.getElementById("mCancel").textContent=t("cancel");
    m.classList.add("open"); inp.focus();
    document.getElementById("mSave").onclick=function(){ var v=inp.value.trim(); if(v){setName(v);} m.classList.remove("open"); renderHeader(); };
    document.getElementById("mCancel").onclick=function(){ m.classList.remove("open"); };
    inp.onkeydown=function(e){ if(e.key==="Enter") document.getElementById("mSave").click(); };
  }

  // expose
  window.Curiosa={ t:t, lang:function(){return lang;}, ROOT:ROOT, GAMES:GAMES,
    getName:getName, getScores:getScores, saveScore:saveScore, resetScores:resetScores,
    renderHeader:renderHeader, openModal:openModal };

  applyLang();
  document.addEventListener("DOMContentLoaded", renderHeader);
})();
