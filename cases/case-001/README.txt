LAST SEARCH / CASE 001 再構築版
================================

■ 役割
無料版の入口。
通常の画像認証から始まり、最後に「久我あきら」の本人確認へ変質する。
クリア後は7秒間「本人確認が完了しました。」を表示し、LAST SEARCH TOPへ戻る。

■ 新正史での内部解釈
ユーザー本人を久我と誤認した、というより、
LAST SEARCH内部に残る「久我あきらの継続セッション」へ接続された状態。

保存キー:
  ls_case_001_complete = true
  ls_logged_in = true
  ls_session_identity = kuga_akira
  ls_session_mode = continuation

TOP側では ls_logged_in === "true" の場合に
右上へ「ログイン中」を表示する想定。

■ 配置
cases/
└─ case-001/
   ├─ index.html
   ├─ case.css
   ├─ case.js
   └─ img/
       ├─ signal-01.webp ～ signal-04.webp
       ├─ bike-01.webp ～ bike-04.webp
       ├─ house-01.webp ～ house-03.webp
       ├─ family-01.webp ～ family-04.webp
       ├─ needle-01.webp
       ├─ thread-01.webp
       └─ kuga-01.webp ～ kuga-09.webp

■ 画像について
このZIPには画像を含めていません。
既存GitHubの case-001/img/ 素材をそのまま残して、
index.html / case.css / case.js の3ファイルだけ差し替えてください。

■ 注意
画像名が現在のGitHubと異なる場合は、case.js 内のファイル名だけ合わせてください。
