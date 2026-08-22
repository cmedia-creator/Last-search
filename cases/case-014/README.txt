CASE014 / 無料版エンディング

このCASEを無料版の正式エンドとする。
CASE015は廃止。

演出:
1. 久我あきらの最終記録を静かに表示
2. 最後の「手遅れになる前に。」まで読む
3. 最終行が画面内に75%以上入ると、
   「久我あきらが残した記録」ボタンを表示
4. その時点で以下を保存
   - ls_case_014_complete=true
   - ls_free_complete=true
5. ボタンを押すと有料ページへ遷移

現在の有料ページURL:
../../premium-guide.html

実際のnote等へ直接飛ばす場合は index.html 内の
href="../../premium-guide.html"
を公開URLへ差し替える。

【重要：CASE015廃止に伴うTOP側変更】
現在のTOPルーターに case-015 が存在する場合は削除すること。

変更対象の例:
- CASE015を通常/特殊/END候補から削除
- 「佐伯」→ case-015 の固定ルートがある場合は削除または別CASEへ変更
- END解放先を case-015 ではなく case-014 に変更
- END条件で ls_case_015_complete を参照している場合は ls_case_014_complete に変更
- CASE014完了後は ls_free_complete=true を無料版完了判定に使用可能

GitHub:
cases/case-014/ をこのフォルダで丸ごと差し替える。
cases/case-015/ は削除する。
