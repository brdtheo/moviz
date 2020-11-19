# abort on errors
set -e

# prod build
npm run build
cd dist

git init
git add -A
git commit -m 'deploy'

# force push to gh-pages
git push -f git@github.com:brdtheo/moviz.git master:gh-pages

cd -