VERSION=$(node build/incrementar-versao.js $1)
echo $VERSION
echo "Será gerado o apk TravelApp.$VERSION.apk"
eas build --platform android --profile production --local --output TravelApp.$VERSION.apk 
killall java