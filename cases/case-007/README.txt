LAST SEARCH / CASE 007 FIX
============================

修正内容:
1. [hidden]{display:none !important;} を追加。
2. .freeze の display:grid が hidden を上書きして表示され続ける事故を防止。
3. JS初期化時にも nameBox / freeze / connection / continueButton を明示的に hidden に設定。
4. DOM欠損時の安全停止を追加。
5. 「こちらを確認しています」の重複追加を防止。
6. 続けるボタンの二重押下を防止。
7. 正史・演出内容は変更しない。

配置:
Last-search/
└─ cases/
   └─ case-007/
      ├─ index.html
      ├─ case.css
      ├─ case.js
      └─ README.txt
