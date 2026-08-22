CASE005 再構築版（Babuu news + 不正アクセス演出）

内容:
- index.html / case.css / case.js
- img/family-photo.webp （提供された家族写真）

画像素材:
- img/family-photo.webp：一家の家族写真
- img/sa-family-back.webp：高速道路SAで家族4人の後ろ姿が映った防犯カメラ記録

両画像とも同梱済みです。

演出フロー:
1. Babuu news の記事を最後まで読む
2. 5秒後にブラックアウト
3. おごたかの不正アクセス演出
4. 家族写真表示
5. 警視庁DBアクセス → 判定失敗
6. YES/NO どちらでも検知され、SA画像表示
7. 5秒後にTOPへ戻る（prefill: 距離）

FIX 2026-08-22c: YES/NOが画面外に押し出される問題を修正。画像解析後に家族写真を閉じ、選択肢を必ず中央へスクロール表示。
