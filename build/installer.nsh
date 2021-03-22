!macro customInstall
SetRegView 64
WriteRegStr HKCR "ipcom" "" "URL:ipcom"
WriteRegStr HKCR "ipcom" "URL Protocol" ""
WriteRegStr HKCR "ipcom\shell" "" "open"
WriteRegStr HKCR "ipcom\shell\open" "" ""
WriteRegStr HKCR "ipcom\shell\open\command" "" '"$INSTDIR\ipcom-browser.exe" "%1"'
WriteINIStr "$Desktop\IPCOM Browser.URL" "InternetShortcut" "URL" "ipcom://telegestion.mcnoc.mx/M_Gestion/MasterPage.aspx?TELEFONO={TELEFONO}&CREDITO={id_customer}&IDLLAMADA={id_call}"
SetRegView 32
WriteRegStr HKCR "ipcom" "" "URL:ipcom"
WriteRegStr HKCR "ipcom" "URL Protocol" ""
WriteRegStr HKCR "ipcom\shell" "" "open"
WriteRegStr HKCR "ipcom\shell\open" "" ""
WriteRegStr HKCR "ipcom\shell\open\command" "" '"$INSTDIR\ipcom-browser.exe" "%1"'
WriteINIStr "$Desktop\IPCOM Browser.URL" "InternetShortcut" "URL" "ipcom://telegestion.mcnoc.mx/M_Gestion/MasterPage.aspx?TELEFONO={TELEFONO}&CREDITO={id_customer}&IDLLAMADA={id_call}"
!macroend
!macro customUnInstall
DeleteRegKey HKCR "ipcom"
Delete "$Desktop\IPCOM Browser.URL"
!macroend