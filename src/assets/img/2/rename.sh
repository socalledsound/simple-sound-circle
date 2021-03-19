a=0
for file in *.png
do
 # new=$(printf "$file" "$a")
  mv -i -- "$file" "${a}.png"
  let a=a+1
done
