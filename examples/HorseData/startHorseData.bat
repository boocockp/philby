call stop.bat

call npm install http-proxy

start "HorseData" "node" philby

start "HorseData" "c:\program files (x86)\google\chrome\application\chrome.exe" --user-data-dir=/temp/cr1 --proxy-server="http=localhost:6000" http://www.racingpost.com/test/horseData.html
