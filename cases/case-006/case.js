(() => {
  "use strict";

  const records = [
    {img:"distance-01.png", distance:"312m", source:"TRAFFIC CAMERA", date:"2026 / CURRENT", relation:"MATCHED AREA"},
    {img:"distance-02.png", distance:"184m", source:"STORE SECURITY", date:"2026 / CURRENT", relation:"MATCHED AREA"},
    {img:"distance-03.png", distance:"72m", source:"STREET CAMERA", date:"2026 / CURRENT", relation:"MATCHED AREA"},
    {img:"distance-04.png", distance:"18m", source:"BUILDING CCTV", date:"2026 / CURRENT", relation:"MATCHED BUILDING"},
    {img:"distance-05.png", distance:"0m", source:"ENTRY CAMERA", date:"2026 / CURRENT", relation:"MATCHED LOCATION"},
    {img:"distance-06.png", distance:"0m", source:"ARCHIVE IMAGE", date:"2009/09/17", relation:"SAME LOCATION"},
    {img:"distance-07.png", distance:"-4m", source:"DEVICE CAMERA", date:"2009/09/17", relation:"UNRESOLVED"}
  ];

  const viewer = document.getElementById("viewer");
  const photo = document.getElementById("photo");
  const distance = document.getElementById("distance");
  const source = document.getElementById("source");
  const meta = document.getElementById("meta");
  const dateValue = document.getElementById("dateValue");
  const sourceValue = document.getElementById("sourceValue");
  const relationValue = document.getElementById("relationValue");
  const message = document.getElementById("message");
  const nextImage = document.getElementById("nextImage");
  const searchPlace = document.getElementById("searchPlace");

  let index = 0;

  function render() {
    const r = records[index];
    viewer.hidden = false;
    meta.hidden = false;
    photo.src = "./img/" + r.img;
    distance.textContent = r.distance;
    source.textContent = "SOURCE: " + r.source;
    dateValue.textContent = r.date;
    sourceValue.textContent = r.source;
    relationValue.textContent = r.relation;

    if (index < 5) {
      message.textContent = "同一地点に関連する記録です。";
    } else if (index === 5) {
      message.textContent = "同一地点の過去記録が見つかりました。";
    } else {
      message.textContent = "取得元の異なる記録が同一地点として関連付けられています。";
    }

    nextImage.hidden = index >= records.length - 1;
    searchPlace.hidden = index < records.length - 1;
  }

  nextImage.addEventListener("click", () => {
    if (index < records.length - 1) {
      index += 1;
      render();
    }
  });

  searchPlace.addEventListener("click", () => {
    localStorage.setItem("ls_case_006_complete", "true");
    localStorage.setItem("ls_cross_system_access_seen", "true");
    localStorage.setItem("ls_2009_location_seen", "true");
    localStorage.setItem("ls_next_query", "2009年9月17日");
    localStorage.setItem("ls_last_query", "2009年9月17日");
    window.location.href = "../../index.html?prefill=2009%E5%B9%B49%E6%9C%8817%E6%97%A5";
  });

  window.setTimeout(render, 1100);
})();
