!macro customInstall
SetRegView 64
WriteRegStr HKCR "ipcom" "" "URL:ipcom"
WriteRegStr HKCR "ipcom" "URL Protocol" ""
WriteRegStr HKCR "ipcom\shell" "" ""
WriteRegStr HKCR "ipcom\shell\open" "" ""
WriteRegStr HKCR "ipcom\shell\open\command" "" '"$INSTDIR\ipcom-browser.exe" "%1"'
SetRegView 32
WriteRegStr HKCR "ipcom" "" "URL:ipcom"
WriteRegStr HKCR "ipcom" "URL Protocol" ""
WriteRegStr HKCR "ipcom\shell" "" ""
WriteRegStr HKCR "ipcom\shell\open" "" ""
WriteRegStr HKCR "ipcom\shell\open\command" "" '"$INSTDIR\ipcom-browser.exe" "%1"'
!macroend
!macro customUnInstall
DeleteRegKey HKCR "ipcom"
!macroend