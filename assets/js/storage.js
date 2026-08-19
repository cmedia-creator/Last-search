window.LSStorage={
  get(key,fallback=null){
    try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw)}catch{return fallback}
  },
  set(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}},
  markCase(id){
    const seen=this.get('ls_seen_cases',[]);
    if(!seen.includes(id)) seen.push(id);
    this.set('ls_seen_cases',seen);
    this.set(`ls_case_${id}_complete`,true);
  }
};
