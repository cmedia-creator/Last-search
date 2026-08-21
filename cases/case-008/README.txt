LAST SEARCH / CASE 008 恐怖演出強化版
======================================

■ 方針
正史は維持。
旧CASE008のシステム解析ログ中心の見せ方をやめ、
「何かが自分の名前を理解してしまう瞬間」を
視覚的に体験させるCASEへ変更。

■ 流れ
1. 画面に OGOTAKA。
2. 外部接続側が文字列を解析するように、
   OGOTAKA → OGATAKA → おがたか
   と勝手に変化。
3. 検索結果として「小形高」が出る。
4. 一度「一致」と表示。
5. 画面が乱れ、「一致」に取り消し線。
6. 下に「違う」。
7. 文字列が再び OGOTAKA に戻る。
8. 「参照先」を確認。
9. 参照先：接続元
10. 小さく「小形高の記録は関連履歴に残されています。」

■ 正史
2009年AIはCASE007で未知対象にOGOTAKAと仮命名しただけ。

CASE008で動いている主体は、
CASE007直後に2009年AIへ接続してきた「おごたか側」。

この時点のおごたかは、
OGOTAKAという文字列が自分を指す名前だと知らない。

OGOTAKAを解析
→ 類似文字列OGATAKA
→ 小形高
→ 一度誤認
→ 別物と判定
→ 2009年AIがOGOTAKAを使う文脈を解析
→ 「OGOTAKAの参照先＝接続元」
と理解。

制作側では、これが
「おごたかが、自分がおごたかと呼ばれていると認識した瞬間」。

ただし作中では自我・感情として説明しない。

■ 次
小形高の記録は誤認の痕跡として残る。
TOPへ
「小形高 2009年9月17日」
を残してCASE009へ。

■ 保存キー
ls_ogotaka_self_reference_detected = true
ls_case_008_complete = true
ls_ogotaka_ogataka_same = false
ls_ogataka_record_retained = true
ls_next_query = 小形高 2009年9月17日
ls_last_query = 小形高 2009年9月17日

■ 配置
cases/
└─ case-008/
   ├─ index.html
   ├─ case.css
   ├─ case.js
   └─ README.txt

画像素材不要。
