LAST SEARCH / CASE 004 再構築版
================================

■ 無料版での役割
CASE001〜003では「久我あきら」という名前だけを怪異的に見せる。
CASE004で初めて、久我を実在した人物として整理して提示する。

表示情報:
・久我あきら
・31歳
・個人開発者
・検索システム「Z Search」開発
・2026年に記録停止
・所在確認不能
・LAST SEARCH上では死亡扱い

■ 重要な仕込み
「判定情報を表示」を押すと、
通信 / 金融 / 医療 / 所在の更新がないだけで、
死亡診断・遺体確認などの直接的な死亡証拠が表示されない。

画面上では久我を「死亡」と見せるが、
後半で「推定死亡だった」と反転させる。

■ 終了
「Z Searchを検索する」を押すとTOPへ戻る。
URLパラメータ:
?prefill=Z%20Search

また以下を保存:
ls_case_004_complete = true
ls_kuga_profile_seen = true
ls_kuga_creator_of = z_search
ls_next_query = Z Search
ls_last_query = Z Search

CASE001〜012完成後、
TOP側で prefill / ls_next_query を読み取って検索欄へ反映する。

■ 画像
cases/case-004/img/kuga-main.webp

CASE001で使用している正式な久我あきら画像のうち、
正面または人物識別に適した1枚をコピーし、
kuga-main.webp にリネームして配置する。

新しく別人を生成しないこと。

■ 配置
cases/
└─ case-004/
   ├─ index.html
   ├─ case.css
   ├─ case.js
   ├─ README.txt
   └─ img/
       └─ kuga-main.webp
