(()=>{
'use strict';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

const fileList=$('#fileList');
const fileCount=$('#fileCount');
const viewer=$('#viewer');
const viewerTitle=$('#viewerTitle');
const viewerBody=$('#viewerBody');
const closeViewer=$('#closeViewer');
const storageName=$('#storageName');
const storageHeader=$('#storageHeader');
const glitchLayer=$('#glitchLayer');
const postActions=$('#postActions');
const homeBtn=$('#homeBtn');

let currentFile='';
let readmeClosed=false;
let corrupting=false;

const codeMap={
  'core_index.sys':`ZIDX::BOOT
[0x0000] INIT_VECTOR      0x11AF
[0x0001] LOAD_SEGMENT     /index/core
[0x0002] SET_MODE         ORPHAN_FIRST
[0x0003] RANK_WEIGHT      -1.000
[0x0004] CACHE_BYPASS     TRUE
[0x0005] AGE_PRIORITY     0x7FFFFFFF
[0x0006] RESOLVE_DEADREF  ENABLED
[0x0007] TRACE_PARENT     NULL
[0x0008] WAIT             QUERY_EVENT
::EOF`,
  'crawler_map.cfg':`crawler.depth = 16
crawler.follow_404 = true
crawler.follow_orphan = true
crawler.prefer_unlinked = true
crawler.ignore_popularity = true
crawler.ignore_freshness = false
crawler.archive_probe = aggressive
crawler.timeout_ms = 9000
crawler.retry = 7
crawler.signature = zsearch/0.91`,
  'archive_probe.mod':`MODULE archive_probe
fn probe(uri):
    head = resolve(uri)
    if head.status == 404:
        return deep_archive(uri)
    if head.link_count == 0:
        return orphan_scan(uri)
    return historical_diff(uri)
END`,
  'orphan_route.tbl':`00|NO_PARENT|ALLOW
01|NO_INDEX|ALLOW
02|DEAD_LINK|ALLOW
03|MOVED|FOLLOW
04|ROBOTS_OLD|RECHECK
05|ARCHIVE_ONLY|ALLOW
06|UNKNOWN_OWNER|ALLOW
07|MIRROR|COMPARE
08|PUBLIC_CACHE|ALLOW
09|UNRESOLVED|QUEUE`,
  'deep_query.bin':`4A 5A 53 01 00 09 FF 00
71 72 79 3A 64 65 65 70 00
01 01 00 00 7F AF 90 13
00 02 02 01 11 09 17 00
FA 31 00 11 00 00 00 8E
7B 00 01 44 45 45 50 00`,
  'lost_page.idx':`IDX 0001941 /cache/dead/0393
IDX 0001942 /mirror/legacy/0107
IDX 0001943 /archive/unlinked/0084
IDX 0001944 /oldbbs/thread/7712
IDX 0001945 /lost/account/0021
IDX 0001946 /unknown/record/0917
IDX 0001947 /orphan/page/0000`,
  'legacy_scan.dll':`EXPORT ResolveLegacyReference
EXPORT ReadObsoleteEncoding
EXPORT RecoverDeletedAnchor
EXPORT CompareMirrorChain
EXPORT TraverseUnlinkedNode
EXPORT RestoreQueryContext
EXPORT DetectHistoricalAlias
STATUS 0x00000000`,
  'reverse_rank.dat':`rank(popularity)      = -0.82
rank(link_count)      = -0.91
rank(age)             = +0.77
rank(orphan_score)    = +1.00
rank(deadref_score)   = +0.88
rank(archive_depth)   = +0.94
rank(current_relevance)= -0.31`,
  'zsearch_runtime.log':`BOOT OK
INDEX CORE OK
ARCHIVE PROBE OK
ORPHAN ROUTE OK
LEGACY SCAN OK
REVERSE RANK OK
WAITING FOR QUERY...
WAITING FOR QUERY...
WAITING FOR QUERY...`
};

function readmeHtml(){
  return `
  <article class="readme">
    <h2>Z SEARCH / README</h2>
    <p>Z SEARCHは、一般的な検索エンジンとは逆方向の思想で設計された実験的検索システムです。</p>

    <h3>概要</h3>
    <p>通常の検索エンジンは、多くの人に参照され、更新され、現在も価値があると判断された情報を上位へ表示します。</p>
    <p>Z SEARCHはその逆を行います。リンクを失ったページ、更新が止まったページ、古いキャッシュ、消えた掲示板、参照元を失った記録など、通常の検索では埋もれていく情報を優先的に探索します。</p>

    <div class="spec">
      <div class="spec-row"><span>検索優先度</span><span>未参照・孤立・旧情報を優先</span></div>
      <div class="spec-row"><span>ランキング</span><span>人気度・被リンク数への依存を抑制</span></div>
      <div class="spec-row"><span>探索対象</span><span>旧キャッシュ / ミラー / 消失リンク / 非現行ページ</span></div>
      <div class="spec-row"><span>目的</span><span>現在の検索では見つけにくい情報の再発見</span></div>
    </div>

    <h3>作者メモ</h3>
    <p class="quote">この検索エンジンに価値があるかどうかは分からない。しかし、いつか必要とされる日が来ることを願う。</p>
    <p class="author">久我あきら</p>
  </article>`;
}

function openFile(name){
  if(corrupting) return;
  currentFile=name;
  viewerTitle.textContent=name;
  if(name==='README'){
    viewerBody.innerHTML=readmeHtml();
  }else{
    const pre=document.createElement('pre');
    pre.className='code';
    pre.textContent=codeMap[name] || 'NO DATA';
    viewerBody.replaceChildren(pre);
  }
  viewer.classList.remove('hidden');
  document.body.style.overflow='hidden';
  closeViewer.focus();
}

function closeFile(){
  if(viewer.classList.contains('hidden')) return;
  const wasReadme=currentFile==='README';
  viewer.classList.add('hidden');
  document.body.style.overflow='';
  viewerBody.innerHTML='';
  currentFile='';
  if(wasReadme && !readmeClosed){
    readmeClosed=true;
    setTimeout(beginCorruption,5000);
  }
}

function forceTop(){
  window.scrollTo({top:0,left:0,behavior:'instant'});
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
  storageHeader.scrollIntoView({block:'start',behavior:'instant'});
}

async function beginCorruption(){
  if(corrupting) return;
  corrupting=true;
  forceTop();

  document.body.classList.add('corrupting');
  glitchLayer.classList.remove('hidden');

  await sleep(850);

  const rows=$$('.file-row',fileList);
  for(const row of rows){
    forceTop();
    row.classList.add('deleting');
    await sleep(420);
    row.remove();
    fileCount.textContent=`${fileList.children.length} files`;
    await sleep(170);
  }

  await sleep(800);
  forceTop();

  const newRow=document.createElement('button');
  newRow.type='button';
  newRow.className='file-row infected';
  newRow.innerHTML=`
    <span class="icon">SYS</span>
    <span class="name">LAST_SEARCH</span>
    <span class="meta">UNKNOWN</span>`;
  fileList.appendChild(newRow);
  fileCount.textContent='1 file';

  await sleep(700);
  forceTop();

  storageName.textContent='LAST SEARCH';
  storageName.classList.add('changed');

  await sleep(1200);
  glitchLayer.classList.add('hidden');
  document.body.classList.remove('corrupting');

  try{localStorage.setItem('ls_case_007_complete','true');}catch(e){}
  postActions.classList.remove('hidden');
  forceTop();
}

fileList.addEventListener('click',(e)=>{
  const row=e.target.closest('.file-row');
  if(!row || corrupting) return;
  const name=row.dataset.file;
  if(name) openFile(name);
});

closeViewer.addEventListener('click',closeFile);
viewer.addEventListener('click',(e)=>{
  if(e.target===viewer) closeFile();
});
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape' && !viewer.classList.contains('hidden')) closeFile();
});

homeBtn.addEventListener('click',()=>{
  location.assign('../../index.html?prefill='+encodeURIComponent('権限'));
});
})();