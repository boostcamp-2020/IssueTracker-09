cd issueTracker/IssueTracker-09/backend
git fetch upstream BE/dev
git rebase upstream/BE/dev
npm install
pm2 restart 16