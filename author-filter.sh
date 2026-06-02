if [ "$GIT_AUTHOR_NAME" = "Ryuuji Takasu" ]; then
  export GIT_AUTHOR_NAME="Removed User"
  export GIT_AUTHOR_EMAIL="removed@example.com"
fi
if [ "$GIT_COMMITTER_NAME" = "Ryuuji Takasu" ]; then
  export GIT_COMMITTER_NAME="Removed User"
  export GIT_COMMITTER_EMAIL="removed@example.com"
fi
