pnpm install
pnpm build:pkg


# pnpm dev

rm -rf site/dist
pnpm build

rsync -av site/dist ubuntu@$TencentCloud:~/Project/oh-my-cv

rm -rf site/dist