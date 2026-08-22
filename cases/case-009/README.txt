CASE 009 家族写真組み込み版

使用画像:
- img/family-01.png : 4人
- img/family-02.png : 3人
- img/family-03.png : 2人
- img/family-04.png : 1人
- img/family-05.png : 0人

演出:
人物照合を進めるごとに、同じ部屋から家族が1人ずつ減る。
最終画像では0名。
照合完了後に「関連人物：5」を表示し、5人目の画像情報だけ取得不能のまま終了。

GitHub適用:
既存 cases/case-009/ の index.html / case.css / case.js を差し替え、img/ に5枚のPNGを配置してください。


軽量化修正版：ファイル名と拡張子は従来どおり family-01.png〜family-05.png のまま維持。画像のみ800px・96色へ圧縮し、GitHub Pagesでの参照ズレを防止。
