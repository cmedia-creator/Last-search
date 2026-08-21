LAST SEARCH / CASE 002 再構築版
================================

■ 無料版での役割
CASE001で「久我あきら」の継続セッションへ接続された直後、
久我の人物状態を照合させる。

プレイヤーに見せる結論は明確に:
  00:29
  久我あきら
  死亡

この時点では「推定」と説明しない。
後半CASEで「死亡診断書・遺体・火葬記録が存在しない」ことを出し、
CASE002の表示が死亡確定ではなく推定だったと反転させる。

■ 演出
1. 久我あきら / 状態: 生存
2. 「状態を更新」
3. 通信・金融・医療・所在を順番に照合
4. すべて更新なし / 所在確認不能
5. 00:29へ更新
6. 全画面で「00:29 久我あきら 死亡」
7. 7秒維持
8. LAST SEARCH TOPへ戻る

■ 内部保存
ls_case_002_complete = true
ls_kuga_status_display = dead
ls_kuga_status_basis = inferred
ls_kuga_status_time = 00:29

重要:
ls_kuga_status_basis は制作側の内部整合用。
無料版CASE002画面では「推定」と表示しない。

■ 配置
cases/
└─ case-002/
   ├─ index.html
   ├─ case.css
   ├─ case.js
   └─ README.txt

画像素材不要。

■ TOPとの接続
このCASE単体ではTOPルーターを書き換えない。
CASE001〜012完成後、共通router/index側をまとめて再構築する想定。
