# 🚨 再現ステップ

1. `main` ブランチにコードをコミットする  
2. `main` から `developAOld` ブランチを作成する  
3. `main` のコードを**全削除**し、新しい `README` を追加する  
4. 変更後の `main` から `developANew` ブランチを作成する  
5. `developAOld` と `developANew` をマージしようとすると **マージできない**

---

# ❗ 原因

- `developAOld` は **昔の main** から作られた  
- `developANew` は **履歴を大きく改変した後の main** から作られた  
- `main` の古い履歴が消されており、  
  `developAOld` と `developANew` に **共通の祖先（Common Ancestor）が存在しない**

➡️ そのため Git は通常のマージができず、履歴が完全に分断される。

---

# 🛠️ 解決策

### 👉 対策：`main` ブランチを初期化し、新しい履歴を基準にブランチを作り直す

### **Step 1：`main` を初期化（orphan で新規履歴作成）**

```bash
git checkout main
git checkout --orphan temp-main
git rm -rf .
git commit --allow-empty -m "Initial empty commit"
git branch -M main
git push origin main --force