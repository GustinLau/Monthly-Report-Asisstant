!macro preInit
    SetRegView 64
    ReadRegStr $0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\73b74319-7654-522e-acdd-d765490077f2" "UninstallString"
    ${If} $0 == ''
        WriteRegStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$PROGRAMFILES64\Monthly Report Assistant"
    ${Endif}
    SetRegView 32
    ReadRegStr $0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\73b74319-7654-522e-acdd-d765490077f2" "UninstallString"
    ${If} $0 == ''
        WriteRegStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$PROGRAMFILES64\Monthly Report Assistant"
    ${Endif}
!macroend